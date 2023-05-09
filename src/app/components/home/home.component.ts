import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { wait } from 'src/app/libraries/utils';
import { HomeAndCards, HomeCard, UserLevels } from 'src/interfaces/sections-interfaces';
import { DataService } from 'src/services/data-service/data.service';
import { LanguageService } from 'src/services/language/language.service';
import { LoginService } from 'src/services/login-service/login.service';
import { SpringServerService } from 'src/services/spring-server/spring-server.service';
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
})
export class HomeComponent implements OnInit {
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
      ph: { en: "Loading!!..🫠", es: "Cargando!!🫠" }
    }]
  };
  //contains all the cards content
  language = 'en';
  languageSubc = new Subscription();
  swiper: any;
  errorMessage = '';
  cardsIndex = 0;
  // this allows to reuse the empty cards' value.
  newCard: HomeCard = JSON.parse(JSON.stringify(emptyCard));

  constructor(private loginService: LoginService, private dataService: DataService, private modalService: NgbModal, private languageSrc: LanguageService, private spring: SpringServerService) {
    //updates the user login status when changes occur
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((role) => {
      this.logged = role;
      console.log('in home role: ', this.logged)
    });

    this.dataSubscription = this.dataService.getHomeAndCardsObserver().subscribe((sectionAndCards) => {
      this.sectionAndCards = sectionAndCards;
    })
    this.errorSubscription = this.dataService.getErrorObserver().subscribe((message) => { this.errorMessage = message })
    this.languageSubc = this.languageSrc.getLanguageObserver().subscribe((val) => {
      this.language = val;
    })
  }

  ngOnInit(): void {
    const hasContent = this.dataService.localGetSectionAndCards('home');
    if (hasContent === false) {
      this.dataService.getSectionAndCards('home');
    }
    //checks in the LocalStorage if the user is logged
    this.loginService.isLogged();
    // this.logged = logged;
    this.initSwiper();
    // this.spring.getQPDAndCardsObs().subscribe((res) => { console.log('Complete seccion from Spring?', res) })
  }

  async initSwiper() {
    await wait(1000);//Left this code at the end of the callstack!
    this.swiper = new window.Swiper('.HomeSwiper', {
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
  createCard() {
    const cardsLength = this.sectionAndCards.cards.length
    this.newCard.id = cardsLength + 1;
    this.dataService.aBMCard('home', this.newCard, "create", cardsLength);
    this.newCard = JSON.parse(JSON.stringify(emptyCard));
  }
  //UPDATE request
  updateCard() {
    this.dataService.aBMCard('home', this.sectionAndCards.cards[this.cardsIndex], "udpdate", this.cardsIndex);
  }
  //DELETE request
  deleteCard() {
    this.dataService.aBMCard('home', this.sectionAndCards.cards[this.cardsIndex], "delete", this.cardsIndex);
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
    this.swiper.destroy();
  }
}
/************************************

**************************************/
const emptyCard = {
  id: 0,
  ph: { en: "", es: "" }
};
// //UPDATE request
//   // this update the content of an element that needs to be modified with contenteditable in place // not in use
//   saveCardEl(e: any, i: number) {
//     const targetId = e.target.dataset.id;
//     const innerHTML = document.querySelector(`#${targetId}`)?.innerHTML;
//     this.sectionAndCards.cards[i].ph[this.language] = innerHTML;
//     this.dataService.aBMCard('home', this.sectionAndCards.cards[i], "udpdate", i);
//   }