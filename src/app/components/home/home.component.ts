import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { wait } from 'src/app/libraries/utils';
import { HomeCard } from 'src/interfaces/sections-interfaces';
import { DataService } from 'src/services/data-service/data.service';
import { LanguageService } from 'src/services/language/language.service';
import { LoginService } from 'src/services/login-service/login.service';
declare global {
  interface Window {
    Swiper: any;
  }
}

// import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // @ViewChild('h1') h1: any;
  logged: Boolean | undefined = false;
  private loggedSubscription = new Subscription();
  private dataSubscription = new Subscription();
  private errorSubscription = new Subscription();
  //contains all
  sectionAndCards: any = { id: "home", imgMobile: "", imgDesktop: "", en: "", es: "", cards: [{ id: "id", en: "Loading!!..🫠", es: "Cargando!!🫠" }] };
  //contains all the cards content
  language = 'en';
  languageSubc = new Subscription();
  swiper: any;
  errorMessage = '';
  cardsIndex?: number;
  newCard: HomeCard = {
    id: "id",
    en: "", es: ""
  }

  constructor(private loginService: LoginService, private dataService: DataService, private modalService: NgbModal, private languageSrc: LanguageService) {
    //updates the user login status when changes occur
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((val) => {
      this.logged = val;
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
    const content = this.dataService.localGetSectionAndCards('home');
    if (content) {
      this.sectionAndCards = content;
    } else {
      this.dataService.getSectionAndCards('home');
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

  saveCardEl(e: any) {
    const targetId = e.target.dataset.id;
    const innerHTML = document.querySelector(`#${targetId}`)?.innerHTML;
    const index = this.sectionAndCards.cards.findIndex((el: HomeCard) => {
      return (el.id === targetId)
    })
    this.sectionAndCards.cards[index][this.language] = innerHTML;
    this.dataService.updateSectionAndCards('home', this.sectionAndCards);
  }
  saveH1(e: any) {
    const targetId = e.target.dataset.id;
    const innerHTML = document.querySelector(`#${targetId}`)?.innerHTML;
    this.sectionAndCards[this.language] = innerHTML;
    this.dataService.updateSectionAndCards('home', this.sectionAndCards);
  }
  saveImgSrc() {
    this.dataService.updateSectionAndCards('home', this.sectionAndCards);
  }

  deleteCard() {
    console.log('deleting index:', this.cardsIndex);
    this.sectionAndCards.cards.splice(this.cardsIndex, 1);
    console.log('this.sectionAndCards.cards', this.sectionAndCards.cards)
    this.dataService.updateSectionAndCards('home', this.sectionAndCards);
  }

  createCard() {
    this.newCard.id = `S${this.sectionAndCards.cards.length}`;
    this.sectionAndCards.cards.push(this.newCard);
    this.dataService.updateSectionAndCards('home', this.sectionAndCards);
  }
  //MODAL

  open(content: TemplateRef<any>, ref: string, i?: number) {
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
