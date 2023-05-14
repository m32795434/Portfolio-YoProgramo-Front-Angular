import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { QPDAndCards, QPDCard, UserLevels } from 'src/interfaces/sections-interfaces';
import { LoginService } from '../../../services/login-service/login.service';
import { DataService } from '../../../services/data-service/data.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
//DATEPICKER
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { wait } from 'src/app/libraries/utils';
import { LanguageService } from 'src/services/language/language.service';

import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';


declare global {
  interface Window {
    Swiper: any;
  }
}
@Component({
  selector: 'app-qpd',
  templateUrl: './qpd.component.html',
  // styleUrls: ['./qpd.component.scss'],
})
export class QPDComponent implements OnInit {
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
      id: "qPD", imgMobile: "", imgDesktop: "", en: "", es: "",
    },
    cards: [{
      id: 0,
      img: {
        src: "", alt: { en: "", es: "" }
      },
      startDate: {
        year: 2022,
        month: 6,
        day: 1
      },
      endDate: {
        year: 2023,
        month: 5,
        day: 31
      },
      h2: { en: "", es: "" },
      ph: { en: "Loading!!..🫠", es: "Cargando!!🫠" }
    }]
  };
  //contains all the cards content
  language = 'en';
  languageSubc = new Subscription();
  swiper: any;
  errorMessage = '';
  cardsIndex = 0;
  // greaterThan975 = false;
  model?: NgbDateStruct;

  //new card
  newCard: QPDCard = JSON.parse(JSON.stringify(emptyCard));


  constructor(private storage: Storage, private languageSrc: LanguageService, private loginService: LoginService, private dataService: DataService, private modalService: NgbModal) {
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((role) => {
      this.logged = role;
    });

    this.dataSubscription = this.dataService.getQPDAndCardsObserver().subscribe((sectionAndCards) => {
      this.sectionAndCards = sectionAndCards;
    })
    this.errorSubscription = this.dataService.getErrorObserver().subscribe((message) => { this.errorMessage = message })
    this.languageSubc = this.languageSrc.getLanguageObserver().subscribe((val) => {
      this.language = val;
    })
  }
  ngOnInit(): void {
    // window.onresize = this.checkForResize;
    const hasContent = this.dataService.localGetSectionAndCards('qPD');
    if (hasContent === false) {
      this.dataService.getSectionAndCards('qPD');
    }
    //checks if the user is logged when init
    this.loginService.isLogged();
    // this.logged = logged;
    this.initSwiper();
  }


  async initSwiper() {
    await wait(1000);//Left this code at the end of the callstack!
    this.swiper = new window.Swiper('.qpdSwiper', {
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
  // UDPATE request
  saveH1(e: any) {
    const targetId = e.target.dataset.id;
    const innerHTML = document.querySelector(`#${targetId}`)?.innerHTML;
    this.sectionAndCards.section[this.language] = innerHTML;
    this.dataService.updateSectionInfo('qPD', this.sectionAndCards.section);
  }
  //UPDATE request
  saveImgSrc() {
    this.dataService.updateSectionInfo('home', this.sectionAndCards.section);
  }
  // POST request
  createCard() {
    const length = this.sectionAndCards.cards.length;
    this.newCard.id = length + 1;
    this.dataService.aBMCard('qPD', this.newCard, "create", length);
    this.newCard = JSON.parse(JSON.stringify(emptyCard));
  }
  //UPDATE request
  updateCard() {
    this.dataService.aBMCard('qPD', this.sectionAndCards.cards[this.cardsIndex], "udpdate", this.cardsIndex);
    this.cardsIndex = 0;
  }
  //DELETE request
  deleteCard() {
    this.dataService.aBMCard('qPD', this.sectionAndCards.cards[this.cardsIndex], "delete", this.cardsIndex);
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
              this.sectionAndCards.cards[this.cardsIndex].img.src = url;
            }
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

}
const emptyCard = {
  id: 0,
  img: { src: "", alt: { en: "", es: "" } },
  startDate: {
    year: 2021,
    month: 1,
    day: 1
  },
  endDate: {
    year: 2023,
    month: 5,
    day: 31
  },
  h2: { en: "", es: "" },
  ph: { en: "", es: "" }
};
// //UPDATE request -- not in use anymore
//   // this update the content of an element that needs to be modified with contenteditable in place
//   saveCardEl(id: any, i: any) {
//     const innerHTML = document.querySelector(`#${id}`)?.innerHTML;
//     this.sectionAndCards.cards[i].ph[this.language] = innerHTML;
//     this.dataService.aBMCard('qPD', this.sectionAndCards.cards[i], "udpdate", i);
//   }