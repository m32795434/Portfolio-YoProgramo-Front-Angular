import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { SkillsCard } from 'src/interfaces/sections-interfaces';
import { LoginService } from '../../../services/login-service/login.service';
import { DataService } from '../../../services/data-service/data.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { wait } from 'src/app/libraries/utils';
import { LanguageService } from 'src/services/language/language.service';
declare global {
  interface Window {
    Swiper: any;
  }
}

@Component({
  selector: 'app-hard-and-soft-skills',
  templateUrl: './hard-and-soft-skills.component.html',
  styleUrls: ['./hard-and-soft-skills.component.scss']
})
export class HardAndSoftSkillsComponent implements OnInit {


  // @ViewChild('h1') h1: any;
  logged: Boolean | undefined = false;
  private loggedSubscription = new Subscription();
  private dataSubscription = new Subscription();
  private errorSubscription = new Subscription();
  //contains all
  sectionAndCards: any = {
    id: "skills", imgMobile: "", imgDesktop: "", en: "", es: "", cards: [{
      id: "S1",
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
  newCard: SkillsCard = {
    id: "",
    img: {
      src: "", alt: {
        en: "", es: ""
      }
    },
    value: 0,
    bkColor: "red",
    outStrokeColor: "blue"
  }


  constructor(private languageSrc: LanguageService, private loginService: LoginService, private dataService: DataService, private modalService: NgbModal) {
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((val) => {
      this.logged = val;
    });

    this.dataSubscription = this.dataService.getSkillsAndCardsObserver().subscribe((sectionAndCards) => {
      this.sectionAndCards = sectionAndCards;
    })
    this.errorSubscription = this.dataService.getErrorObserver().subscribe((message) => { this.errorMessage = message })
    this.languageSubsc = this.languageSrc.getLanguageObserver().subscribe((val) => this.language = val)

  }
  ngOnInit(): void {
    // window.onresize = this.checkForResize;
    const content = this.dataService.getData('skills');
    if (content) {
      this.sectionAndCards = content;
    } else {
      this.dataService.getSectionAndCards('skills');
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
  saveCardEl(id: any, i: any) {
    const innerHTML = document.querySelector(`#${id}`)?.innerHTML;
    this.sectionAndCards.cards[i].ph[this.language] = innerHTML;
    console.log('this.sectionAndCards.cards[i].ph[this.language]', this.sectionAndCards.cards[i].ph[this.language])
    this.dataService.updateSectionAndCards('skills', this.sectionAndCards);
  }
  saveH1(e: any) {
    const targetId = e.target.dataset.id;
    const innerHTML = document.querySelector(`#${targetId}`)?.innerHTML;
    this.sectionAndCards[this.language] = innerHTML;
    this.dataService.updateSectionAndCards('skills', this.sectionAndCards);
  }
  updateCard() {
    console.log('updating with:', this.sectionAndCards);
    this.dataService.updateSectionAndCards('skills', this.sectionAndCards);
  }
  deleteCard() {
    console.log('deleting index:', this.cardsIndex);
    this.sectionAndCards.cards.splice(this.cardsIndex, 1);
    console.log('this.sectionAndCards.cards', this.sectionAndCards.cards)
    this.dataService.updateSectionAndCards('skills', this.sectionAndCards);
  }
  createCard() {
    this.newCard.id = `S${this.sectionAndCards.cards.length}`;
    this.sectionAndCards.cards.push(this.newCard);
    this.dataService.updateSectionAndCards('skills', this.sectionAndCards);
  }
  //MODALS

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
}
