import { Component, OnInit, TemplateRef, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SkillsAndCards, SkillsCard, AuthObj, UserLevels } from 'src/interfaces/sections-interfaces';
import { LoginService } from '../../../services/login-service/login.service';
import { DataService } from '../../../services/data-service/data.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { wait } from 'src/app/libraries/utils';
import { LanguageService } from 'src/services/language/language.service';

import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';

// DRAG AND DROP TO SORT
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

declare global {
  interface Window {
    Swiper: any;
  }
}

@Component({
  selector: 'app-hard-and-soft-skills',
  templateUrl: './hard-and-soft-skills.component.html',
  // styleUrls: ['./hard-and-soft-skills.component.scss']
})
export class HardAndSoftSkillsComponent implements OnInit, AfterViewInit {
  //loader
  isLoading = false;
  @ViewChild('imgDesktopSkills') imgDesktopSkills!: ElementRef;
  //firebase store
  //drag and drop
  public mobileDragOver = false;
  public desktopDragOver = false;
  public cardDragOver = false;

  // @ViewChild('h1') h1: any;
  logged: UserLevels = "";
  private loggedSubscription = new Subscription();
  private dataSubscription = new Subscription();
  private errorSubscription = new Subscription();
  //contains all
  sectionAndCards: any = {
    section: {
      id: "skills", imgMobile: "", imgDesktop: "", en: "", es: "",
    },
    cards: [{
      id: 0,
      img: {
        src: "../../../assets/images/regional-bs.png", alt: {
          en: "regional-bs", es: "regional-bs"
        }
      },
      value: 50,
      bkColor: "red",
      outStrokeColor: "blue"

    }]
  };
  //contains all the cards content
  language = 'en';
  languageSubsc = new Subscription();
  swiper: any;
  errorMessage = '';
  cardsIndex = 0;

  //new card
  newCard: SkillsCard = JSON.parse(JSON.stringify(emptyCard));


  constructor(private storage: Storage, private languageSrc: LanguageService, private loginService: LoginService, private dataService: DataService, private modalService: NgbModal) {
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((role) => {
      this.logged = role;
    });

    this.dataSubscription = this.dataService.getSkillsAndCardsObserver().subscribe((sectionAndCards) => {
      this.sectionAndCards = sectionAndCards;
    })
    this.errorSubscription = this.dataService.getErrorObserver().subscribe((message) => { this.errorMessage = message })
    this.languageSubsc = this.languageSrc.getLanguageObserver().subscribe((val) => this.language = val)

  }
  ngOnInit(): void {
    this.isLoading = true;
    // window.onresize = this.checkForResize;
    const hasContent = this.dataService.localGetSectionAndCards('skills');
    if (hasContent === false) {
      this.dataService.getSectionAndCards('skills');
    }
    //checks if the user is logged when init
    this.loginService.isLogged();
    // this.logged = logged;
    this.initSwiper();
  }


  async initSwiper() {
    await wait(1000);//Left this code at the end of the callstack!
    this.swiper = new window.Swiper('.skillsSwiper', {
      direction: 'horizontal',
      loop: false,

      pagination: {
        el: '.swiper-pagination',
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
  }
  // UPDATE REQUEST
  saveH1(e: any) {
    const targetId = e.target.dataset.id;
    const innerHTML = document.querySelector(`#${targetId}`)?.innerHTML;
    this.sectionAndCards.section[this.language] = innerHTML;
    this.dataService.updateSectionInfo('skills', this.sectionAndCards.section);
  }
  //UPDATE request
  saveImgSrc() {
    this.dataService.updateSectionInfo('skills', this.sectionAndCards.section);
  }
  // POST request
  createCard() {
    const length = this.sectionAndCards.cards.length;
    this.newCard.id = length + 1;
    this.dataService.aBMCard('skills', this.newCard, "create", length);
    this.newCard = JSON.parse(JSON.stringify(emptyCard));
  }
  //UPDATE request
  updateCard() {
    this.dataService.aBMCard('skills', this.sectionAndCards.cards[this.cardsIndex], "udpdate", this.cardsIndex);
    this.cardsIndex = 0;
  }
  //DELETE request
  deleteCard() {
    this.dataService.aBMCard('skills', this.sectionAndCards.cards[this.cardsIndex], "delete", this.cardsIndex);
    this.cardsIndex = 0;
  }

  //MODALS
  // ref: reference the modal in the HTML
  // index: to know which card I've clicked
  open(content: TemplateRef<any>, ref: string, index?: any) {
    console.log(content)
    this.cardsIndex = index;
    this.modalService.open(content, {
      ariaLabelledBy: `${ref}`,
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: true,
      windowClass: 'cdk-drag'
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
    this.swiper.destroy();
  }

  //--------------------------------------------------FIREBASE STORE + DRAG AND DROP------------------------------------------------------

  public onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    let name = event?.currentTarget?.attributes?.name?.value;
    if (name === 'imgMobile') {
      this.mobileDragOver = true;
    } else if (name === 'imgDesktop') {
      this.desktopDragOver = true;
    } else if (name === 'imgCard') {
      this.cardDragOver = true;
    }
  }

  public onDrop(event: any) {
    event.preventDefault();
    this.isLoading = true;
    let name = event?.currentTarget?.attributes?.name?.value;
    if (name === 'imgMobile') {
      this.mobileDragOver = false;
    } else if (name === 'imgDesktop') {
      this.desktopDragOver = false;
    } else if (name === 'imgCard') {
      this.cardDragOver = false;
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
            if (name === 'imgMobile' || name === 'imgDesktop') {
              this.sectionAndCards.section[name] = url;
            } else if (name === 'imgCard') {
              if (this.cardsIndex === 0 || this.cardsIndex === undefined) {
                this.newCard.img.src = url;
              } else {
                this.sectionAndCards.cards[this.cardsIndex].img.src = url;
              }
            }
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
    let name = event?.currentTarget?.attributes?.name?.value;
    if (name === 'imgMobile') {
      this.mobileDragOver = false;
    } else if (name === 'imgDesktop') {
      this.desktopDragOver = false;
    } else if (name === 'imgCard') {
      this.cardDragOver = false;
    }
  }

  //--------------------------------------------------DRAG AND DROP TO SORT--------------------------------------------------

  dropCards(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sectionAndCards.cards, event.previousIndex, event.currentIndex);
    this.sectionAndCards.cards.forEach((card: SkillsCard, id: number) => {
      card.id = id + 1;
    });
    this.dataService.sortCards('skills', this.sectionAndCards.cards);
  }

  //---------------------------------------------ngAfterViewInit----------------------------------------
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.imgDesktopSkills.nativeElement.addEventListener('load', () => {
      console.log('carga completa!')
      this.isLoading = false;
    });
  }

}
const emptyCard = {
  id: 0,
  img: {
    src: "", alt: {
      en: "", es: ""
    }
  },
  value: 0,
  bkColor: "red",
  outStrokeColor: "blue"
};