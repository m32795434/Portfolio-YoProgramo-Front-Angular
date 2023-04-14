import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
//DATEPICKER


import { LoginService } from '../../../services/login-service/login.service';
import { DataService } from '../../../services/data-service/data.service';
import { ExperienceAndCards, ExperienceCard } from 'src/interfaces/sections-interfaces';
import { LanguageService } from 'src/services/language/language.service';
import { wait } from 'src/app/libraries/utils';
declare global {
  interface Window {
    Swiper: any;
  }
}
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  // @ViewChild('h1') h1: any;
  logged: Boolean | undefined = false;
  private loggedSubscription = new Subscription();
  private dataSubscription = new Subscription();
  private errorSubscription = new Subscription();
  //contains all
  sectionAndCards: any = {
    section: {
      id: "experience", imgMobile: "", imgDesktop: "", en: "", es: "",
    },
    cards: [{
      id: "id",
      img: {
        src: "", alt: {
          en: "", es: ""
        }
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
      ph: { en: "Loading!!..🫠", es: "Cargando!!🫠" }
    }]
  };
  //contains all the cards content
  language = 'en';
  languageSubc = new Subscription();
  swiper: any;
  errorMessage = '';
  cardsIndex = 0;
  model?: NgbDateStruct;

  //new card
  newCard: ExperienceCard = JSON.parse(JSON.stringify(emptyCard));

  constructor(private loginService: LoginService, private dataService: DataService, private modalService: NgbModal, private languageSrc: LanguageService) {
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((val) => {
      this.logged = val;
    });

    this.dataSubscription = this.dataService.getExperienceAndCardsObserver().subscribe((sectionAndCards) => {
      this.sectionAndCards = sectionAndCards;
    })
    this.errorSubscription = this.dataService.getErrorObserver().subscribe((message) => { this.errorMessage = message })
    this.languageSubc = this.languageSrc.getLanguageObserver().subscribe((val) => {
      this.language = val;
    })
  }

  ngOnInit(): void {
    // window.onresize = this.checkForResize;
    //checks if the main dataService has data from a previous load.
    const content = this.dataService.localGetSectionAndCards('experience');
    if (content) {
      this.sectionAndCards = content;
    } else {
      this.dataService.getSectionAndCards('experience');
    }
    //checks if the user is logged when init
    this.logged = this.loginService.isLogged();
    this.initSwiper();
  }


  async initSwiper() {
    await wait(1000);//Left this code at the end of the callstack!
    this.swiper = new window.Swiper('.swiper', {
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

  //UPDATE request
  saveH1(e: any) {
    const targetId = e.target.dataset.id;
    const innerHTML = document.querySelector(`#${targetId}`)?.innerHTML;
    this.sectionAndCards.section[this.language] = innerHTML;
    this.dataService.updateSectionInfo('experience', this.sectionAndCards.section);
  }
  //UPDATE request
  saveImgSrc() {
    this.dataService.updateSectionInfo('experience', this.sectionAndCards.section);
  }
  // POST request
  createCard() {
    const length = this.sectionAndCards.cards.length;
    this.newCard.id = `S${length + 1}`;
    this.dataService.aBMCard('experience', this.newCard, "create", length);
    this.newCard = JSON.parse(JSON.stringify(emptyCard));
  }
  //UPDATE request
  // this update the content of an element that needs to be modified with contenteditable in place
  saveCardEl(id: any, i: any) {
    const innerHTML = document.querySelector(`#${id}`)?.innerHTML;
    this.sectionAndCards.cards[i].ph[this.language] = innerHTML;
    this.dataService.aBMCard('experience', this.sectionAndCards.cards[i], "udpdate", i);
  }
  //UPDATE request
  updateCard() {
    this.dataService.aBMCard('experience', this.sectionAndCards.cards[this.cardsIndex], "udpdate", this.cardsIndex);
  }
  //DELETE request
  deleteCard() {
    this.dataService.aBMCard('experience', this.sectionAndCards.cards[this.cardsIndex], "delete", this.cardsIndex);
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
}
const emptyCard = {
  id: "id",
  img: {
    src: "", alt: {
      en: "", es: ""
    }
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
  ph: { en: "", es: "" }
};