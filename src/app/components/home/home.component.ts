import { Component, OnInit, ViewChild, TemplateRef, ElementRef, AfterViewInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { wait, hover3dApplier } from 'src/app/libraries/utils';
import { HomeAndCards, HomeCard, UserLevels, SectionAndCards } from 'src/interfaces/sections-interfaces';
import { DataService } from 'src/services/data-service/data.service';
import { LanguageService } from 'src/services/language/language.service';
import { LoginService } from 'src/services/login-service/login.service';
import { SpringServerService } from 'src/services/spring-server/spring-server.service';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
// import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

// DRAG AND DROP TO SORT
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

declare global {
  interface Window {
    Swiper: any;
  }
}

// import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // styleUrls: ['./home.component.scss']
  // animations: [
  //   trigger('cardAnimation', [
  //     transition(':enter', [
  //       query(':self', [
  //         style({ opacity: 0, transform: 'translateY(-100%)' }),
  //         animate(500, style({ opacity: 1, transform: 'translateY(0)' }))
  //       ])
  //     ])
  //   ])
  // ]
})
export class HomeComponent implements OnInit, AfterViewInit {
  //loader
  isLoading = false;
  @ViewChild('imgDesktopHome') imgDesktopHome!: ElementRef | null;
  @ViewChild('imgMobileHome') imgMobileHome!: ElementRef | null;

  //firebase store
  //drag and drop
  public mobileDragOver = false;
  public desktopDragOver = false;

  // @ViewChild('h1') h1: any;
  logged: UserLevels = "";
  private loggedSubscription = new Subscription();
  private dataSubscription = new Subscription();
  private errorSubscription = new Subscription();
  //contains all
  //HomeAndCards | any
  sectionAndCards: any = {
    section: {
      id: "home", imgMobile: "", imgDesktop: "", en: "", es: "",
    },
    cards: [{
      id: 0,
      ph: { en: "", es: "" }
    }]
  };
  //contains all the cards content
  language = 'en';
  private languageSubc = new Subscription();
  swiper: any;
  errorMessage = '';
  cardsIndex = 0;
  // this allows to reuse the empty cards' value.
  newCard: HomeCard = JSON.parse(JSON.stringify(emptyCard));

  constructor(private loginService: LoginService, private dataService: DataService, private modalService: NgbModal, private languageSrc: LanguageService, private spring: SpringServerService, private storage: Storage) {
    //updates the user login status when changes occur
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((role) => {
      this.logged = role;
      console.log('logged subscription')

    });

    this.dataSubscription = this.dataService.getHomeAndCardsObserver().subscribe((sectionAndCards) => {
      this.sectionAndCards = sectionAndCards;
      if (this.isLoading === false) {
        if (this.swiper != null && this.swiper != undefined) {
          this.swiper.destroy();
        }
        this.initSwiper();
      }
    })
    this.errorSubscription = this.dataService.getErrorObserver().subscribe((message) => { this.errorMessage = message })
    this.languageSubc = this.languageSrc.getLanguageObserver().subscribe((val) => {
      this.language = val;
    })
  }

  ngOnInit(): void {
    //checks in the LocalStorage
    this.loginService.isLogged();
    this.languageSrc.checkLanguage();
    // content load
    this.isLoading = true;
    const hasContent = this.dataService.localGetSectionAndCards('home');
    if (hasContent === false) {
      this.dataService.getSectionAndCards('home');
    }
    checkOrientation();
  }

  async initSwiper() {
    await wait(0);//Left this code at the end of the callstack!
    this.swiper = new window.Swiper('.HomeSwiper', {
      direction: 'horizontal',
      loop: false,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
    console.log('swipper created!')
  }

  // ----------------------------------SECTION REQUESTS----------------------
  //UPDATE request
  saveH1(e: any) {
    const targetId = e.target.dataset.id;
    const innerHTML = document.querySelector(`#${targetId}`)?.innerHTML;
    this.sectionAndCards.section[this.language] = innerHTML;
    this.dataService.updateSectionInfo('home', this.sectionAndCards.section);
  }
  //UPDATE request
  saveImgSrc() {
    this.dataService.updateSectionInfo('home', this.sectionAndCards.section);
  }

  // ----------------------------------CARDS REQUESTS----------------------
  async createCard() {
    const cardsLength = this.sectionAndCards.cards.length
    this.newCard.id = cardsLength + 1;
    this.dataService.aBMCard('home', this.newCard, "create", cardsLength);
    this.newCard = JSON.parse(JSON.stringify(emptyCard));
    await wait(500);
    mobileSlideTopIn();
  }
  //UPDATE request
  updateCard() {
    this.dataService.aBMCard('home', this.sectionAndCards.cards[this.cardsIndex], "udpdate", this.cardsIndex);
    this.cardsIndex = 0;
  }
  //DELETE request
  deleteCard() {
    this.dataService.aBMCard('home', this.sectionAndCards.cards[this.cardsIndex], "delete", this.cardsIndex);
    this.cardsIndex = 0;
  }


  //MODAL
  // ref: reference the modal in the HTML
  // index: to know which card I've clicked
  open(content: TemplateRef<any>, ref: string, i?: any) {
    this.cardsIndex = i;
    this.modalService.open(content, {
      ariaLabelledBy: `${ref}`,
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: true,
      // windowClass: 'my-custom-class'
    }).result.then(
      (result: any) => {
        console.log(`Closed with: ${result}`);
      },
      (reason: any) => {
        console.log(`Dismissed ${this.getDismissReason(reason)}`);
      },
    );
    Array.from(document.querySelectorAll('.modal-body input')).forEach((el) => {
      el.addEventListener('mousedown', (e: Event) => {
        e.stopPropagation();
      });
      el.addEventListener('touchstart', (e: Event) => {
        e.stopPropagation();
      });
    })
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  //AVOID SANITIZER
  // getHtmlContent(content: string) {
  //   return this.sanitizer.bypassSecurityTrustHtml(content);
  // }
  ngOnDestroy(): void {
    this.loggedSubscription.unsubscribe();
    this.dataSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.languageSubc.unsubscribe();
    this.imgDesktopHome = null;
    this.imgMobileHome = null;
    if (this.swiper != null && this.swiper != undefined) {
      this.swiper.destroy();
    }
    window.removeEventListener('orientationchange', orietationChangeHAndler);
  }

  //--------------------------------------------------FIREBASE STORE + DRAG AND DROP------------------------------------------------------

  public onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event?.currentTarget?.attributes?.name?.value === 'imgMobile') {
      this.mobileDragOver = true;
    } else {
      this.desktopDragOver = true;
    }
  }

  public onDrop(event: any) {
    event.preventDefault();
    this.isLoading = true;
    let size = "";
    if (event?.currentTarget?.attributes?.name?.value === 'imgMobile') {
      this.mobileDragOver = false;
      size = "imgMobile";
    } else {
      this.desktopDragOver = false;
      size = "imgDesktop";
    }
    let file: any;
    if (event.dataTransfer?.files[0]) {
      if (event.dataTransfer?.files[0].type.startsWith('image')) {
        file = event.dataTransfer.files[0];
        console.log('file:', file)
        const imgRef = ref(this.storage, `images/${file.name}`);
        uploadBytes(imgRef, file)
          .then(async response => {
            console.log(response)
            const url = await getDownloadURL(imgRef);
            console.log('setting url: ', url)
            this.sectionAndCards.section[size] = url;
            this.isLoading = false;
          })
          .catch(error => console.log(error));
      } else {
        alert('not an image!')
      }
    }
  }
  public onDragLeave(event: any) {
    event.preventDefault();
    if (event?.currentTarget?.attributes?.name?.value === 'imgMobile') {
      this.mobileDragOver = false;
    } else {
      this.desktopDragOver = false;
    }
  }

  //--------------------------------------------------DRAG AND DROP TO SORT--------------------------------------------------

  dropCards(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sectionAndCards.cards, event.previousIndex, event.currentIndex);
    this.sectionAndCards.cards.forEach((card: HomeCard, id: number) => {
      card.id = id + 1;
    });
    this.dataService.sortCards('home', this.sectionAndCards.cards);
  }

  //---------------------------------------------ngAfterViewInit----------------------------------------
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    const width = window.visualViewport?.width;
    if (width && width >= 975 && this.imgDesktopHome) {
      this.imgDesktopHome.nativeElement.addEventListener('load', async () => {
        // await wait(500);
        console.log('carga completa!');
        this.isLoading = false;
        this.initSwiper();
        deskSlideTopIn();
        await wait(0);
        hover3dApplier();
      });
      this.imgDesktopHome.nativeElement.addEventListener('error', async (event: any) => {
        if (event.target.__zone_symbol__errorfalse[0].runCount >= 4) {
          console.log('Error en la carga del elemento img desktop:', event)
          this.isLoading = false;
          deskSlideTopIn();
        }
      });
    } else if (this.imgMobileHome) {
      this.imgMobileHome.nativeElement.addEventListener('load', async () => {
        // await wait(500);
        console.log('carga completa!');
        this.isLoading = false;
        this.initSwiper();
        mobileSlideTopIn();
      });
      this.imgMobileHome.nativeElement.addEventListener('error', async (event: any) => {
        if (event.target.__zone_symbol__errorfalse[0].runCount >= 4) {
          console.log('Error en la carga del elemento img mobile:', event)
          this.isLoading = false;
          deskSlideTopIn();
        }
      });
    }
  }
}
//
/************************************

**************************************/
const emptyCard = {
  id: 0,
  ph: { en: "", es: "" }
};

async function mobileSlideTopIn() {
  const els = Array.from(document.querySelectorAll('.mobile-slide-top-out'));
  const length = els.length;
  for (let i = 0; i < length; i++) {
    els[i].classList.add('slide-in');
    await wait(300);
  }
}
async function deskSlideTopIn() {
  const els = Array.from(document.querySelectorAll('.desk-slide-top-out'));
  const length = els.length;
  for (let i = 0; i < length; i++) {
    els[i].classList.add('slide-in');
    await wait(300);
  }
}
function orietationChangeHAndler() {
  if (window.matchMedia("(orientation: portrait)").matches) {
    mobileSlideTopIn();
    deskSlideTopIn();
    console.log('Dispositivo en posición vertical');
  } else if (window.matchMedia("(orientation: landscape)").matches) {
    mobileSlideTopIn();
    deskSlideTopIn();
    console.log('Dispositivo en posición horizontal');
  }
}
function checkOrientation() {
  window.addEventListener('orientationchange', orietationChangeHAndler);
}

// //UPDATE request
//   // this update the content of an element that needs to be modified with contenteditable in place // not in use
//   saveCardEl(e: any, i: number) {
//     const targetId = e.target.dataset.id;
//     const innerHTML = document.querySelector(`#${targetId}`)?.innerHTML;
//     this.sectionAndCards.cards[i].ph[this.language] = innerHTML;
//     this.dataService.aBMCard('home', this.sectionAndCards.cards[i], "udpdate", i);
//   }