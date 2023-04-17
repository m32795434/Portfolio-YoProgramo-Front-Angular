import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../services/login-service/login.service';
import { DataService } from '../../../services/data-service/data.service';
import { LanguageService } from 'src/services/language/language.service';
import { ProjectsAndCards, ProjectsCard } from 'src/interfaces/sections-interfaces';
import { wait } from 'src/app/libraries/utils';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

declare global {
  interface Window {
    Swiper: any;
  }
}
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  logged: Boolean | undefined = false;
  private loggedSubscription = new Subscription();
  private dataSubscription = new Subscription();
  private errorSubscription = new Subscription();
  //contains all
  //ProjectsAndCards
  sectionAndCards: any = {
    section: {
      id: "projects", en: "", es: "", imgMobile: null,
      imgDesktop: null,
    },
    cards: []
  };
  newCard: ProjectsCard = JSON.parse(JSON.stringify(emptyCard));
  language = 'en';
  languageSubc = new Subscription();
  errorMessage = '';
  swiper: any;
  cardsIndex = 0;


  constructor(private loginService: LoginService, private dataService: DataService, private languageSrc: LanguageService, private modalService: NgbModal, private sanitizer: DomSanitizer) {
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((val) => {
      this.logged = val;
    });

    this.dataSubscription = this.dataService.getProjectsAndCardsObserver().subscribe((sectionAndCards) => {
      this.sectionAndCards = sectionAndCards;
      this.sectionAndCards.cards.forEach((card: any) => {
        card.vMp4Src = this.disableSn(card.vMp4Src);
        card.vWebSrc = this.disableSn(card.vWebSrc);
      });
    })
    this.errorSubscription = this.dataService.getErrorObserver().subscribe((message) => { this.errorMessage = message })
    this.languageSubc = this.languageSrc.getLanguageObserver().subscribe((val) => {
      this.language = val;
    })
  }
  ngOnInit(): void {
    const content = this.dataService.localGetSectionAndCards('projects');
    if (content) {
      this.sectionAndCards = content;
    } else {
      this.dataService.getSectionAndCards('projects');
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
  // UDPATE request
  saveH1(e: any) {
    const targetId = e.target.dataset.id;
    const innerHTML = document.querySelector(`#${targetId}`)?.innerHTML;
    this.sectionAndCards.section[this.language] = innerHTML;
    this.dataService.updateSectionInfo('projects', this.sectionAndCards.section);
  }
  // POST request
  createCard() {
    const length = this.sectionAndCards.cards.length;
    this.newCard.id = `S${length + 1}`;
    this.dataService.aBMCard('projects', this.newCard, "create", length);
    this.newCard = JSON.parse(JSON.stringify(emptyCard));
  }
  //UPDATE request
  // this update the content of an element that needs to be modified with contenteditable in place
  saveCardEl(id: any, i: any) {
    const innerHTML = document.querySelector(`#${id}`)?.innerHTML;
    this.sectionAndCards.cards[i].ph[this.language] = innerHTML;
    this.dataService.aBMCard('projects', this.sectionAndCards.cards[i], "udpdate", i);
  }
  //UPDATE request
  updateCard() {
    this.dataService.aBMCard('projects', this.sectionAndCards.cards[this.cardsIndex], "udpdate", this.cardsIndex);
  }
  //DELETE request
  deleteCard() {
    this.dataService.aBMCard('projects', this.sectionAndCards.cards[this.cardsIndex], "delete", this.cardsIndex);
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
  disableSn(str: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(str)
  }
  ngOnDestroy(): void {
    this.swiper.destroy();
  }
  // toggleVideo(e: Event) {
  //   const video: any = e.target;
  //   if (video) {
  //     if (video.paused) {
  //       video.play();
  //     } else {
  //       video.pause();
  //     }
  //   }
  // }
}

const emptyCard = {
  id: "",
  vMp4Src: "",
  vWebSrc: "",
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
  ph: { en: "", es: "" },
  codeUrl: "",
  deployUrl: "",
};