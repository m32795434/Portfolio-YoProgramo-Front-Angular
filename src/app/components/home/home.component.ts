import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { wait } from 'src/app/libraries/utils';
import { Home, HomeCard } from 'src/interfaces/sections-interfaces';
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
  section: any = { id: "home", imgMobile: "", imgDesktop: "", en: "", es: "", cards: [] };
  //contains all the cards content
  cards: HomeCard[] = [{ id: "id", en: "Loading!!..🫠", es: "Cargando!!🫠" }]
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

    this.dataSubscription = this.dataService.getHomeDataObserver().subscribe((section) => {
      this.section = section;
      this.cards = this.section['cards'];
    })
    this.errorSubscription = this.dataService.getErrorObserver().subscribe((message) => { this.errorMessage = message })
    this.languageSubc = this.languageSrc.getLanguageObserver().subscribe((val) => {
      this.language = val;
      console.log(this.language)
    })
  }

  ngOnInit(): void {
    const content = this.dataService.getData('home');
    if (content) {
      this.section = content;
      this.cards = this.section['cards'];
    } else {
      this.dataService.getSectionFromJsonServer('home');
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
    const index = this.section.cards.findIndex((el: HomeCard) => {
      return (el.id === targetId)
    })
    this.section.cards[index][this.language] = innerHTML;
    this.dataService.updateSection('home', this.section);
  }
  saveH1(e: any) {
    const targetId = e.target.dataset.id;
    const innerHTML = document.querySelector(`#${targetId}`)?.innerHTML;
    this.section[this.language] = innerHTML;
    this.dataService.updateSection('home', this.section);
  }
  saveImgSrc() {
    this.dataService.updateSection('home', this.section);
  }

  deleteCard() {
    console.log('deleting index:', this.cardsIndex);
    this.section.cards.splice(this.cardsIndex, 1);
    console.log('this.section.cards', this.section.cards)
    this.dataService.updateSection('home', this.section);
  }

  createCard() {
    this.newCard.id = `S${this.cards.length}`;
    this.section.cards.push(this.newCard);
    this.dataService.updateSection('home', this.section);
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
