import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../services/login-service/login.service';
import { DataService } from '../../../services/data-service/data.service';
import { LanguageService } from 'src/services/language/language.service';
import { ProjectsAndCards, ProjectsCard, UserLevels } from 'src/interfaces/sections-interfaces';
import { wait } from 'src/app/libraries/utils';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

// DRAG AND DROP TO SORT
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

declare global {
  interface Window {
    Swiper: any;
  }
}
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  // styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  //loader
  isLoading = false;

  logged: UserLevels = "";
  private loggedSubscription = new Subscription();
  private dataSubscription = new Subscription();
  private errorSubscription = new Subscription();
  private isLoadingSubscription = new Subscription();
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
  sanitizedCards: ProjectsCard[] = [JSON.parse(JSON.stringify(emptyCard))];

  constructor(private loginService: LoginService, private dataService: DataService, private languageSrc: LanguageService, private modalService: NgbModal, private sanitizer: DomSanitizer) {
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((role) => {
      this.logged = role;
      console.log('logged subscription')

    });

    this.dataSubscription = this.dataService.getProjectsAndCardsObserver().subscribe((sectionAndCards) => {
      this.sectionAndCards = sectionAndCards;
      const width = window?.visualViewport?.width
      if (width && width < 975) {
        if (this.swiper != null && this.swiper != undefined) {
          this.swiper.destroy();
        }
        this.initSwiper();
      }
      this.sanitizedCards = this.sectionAndCards.cards.map((card: any) => {
        return {
          id: card.id,
          startDate: card.startDate,
          endDate: card.endDate,
          h2: card.h2,
          ph: card.ph,
          codeUrl: card.codeUrl,
          deployUrl: card.deployUrl,
          vMp4Src: this.disableSn(card.vMp4Src),
          vWebSrc: this.disableSn(card.vWebSrc),
        }
      });
    })
    this.errorSubscription = this.dataService.getErrorObserver().subscribe((message) => { this.errorMessage = message })
    this.languageSubc = this.languageSrc.getLanguageObserver().subscribe((val) => {
      this.language = val;
    })
    this.isLoadingSubscription = this.dataService.getIsLoadingProjectsObserver().subscribe((bol) => this.isLoading = bol)
  }

  ngOnInit(): void {
    //checks in the LocalStorage
    this.loginService.isLogged();
    this.languageSrc.checkLanguage();
    // content load
    this.isLoading = true;
    const hasContent = this.dataService.localGetSectionAndCards('projects');
    if (hasContent === false) {
      this.dataService.getSectionAndCards('projects');
    }
    this.checkOrientation();
  }
  async initSwiper() {
    await wait(0);
    this.swiper = new window.Swiper('.projectsSwiper', {
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
    console.log('swiper created!');
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
    this.newCard.id = length + 1;
    this.dataService.aBMCard('projects', this.newCard, "create", length);
    this.newCard = JSON.parse(JSON.stringify(emptyCard));
  }

  //UPDATE request
  updateCard() {
    this.dataService.aBMCard('projects', this.sectionAndCards.cards[this.cardsIndex], "udpdate", this.cardsIndex);
    this.cardsIndex = 0;
  }
  //DELETE request
  deleteCard() {
    this.dataService.aBMCard('projects', this.sectionAndCards.cards[this.cardsIndex], "delete", this.cardsIndex);
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
  disableSn(str: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(str)
  }
  ngOnDestroy(): void {
    this.loggedSubscription.unsubscribe();
    this.dataSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.languageSubc.unsubscribe();
    this.isLoadingSubscription.unsubscribe();
    if (this.swiper != null && this.swiper != undefined) {
      this.swiper.destroy();
    }
    window.removeEventListener('orientationchange', this.orietationChangeHAndler);
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

  //--------------------------------------------------DRAG AND DROP TO SORT--------------------------------------------------

  dropCards(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sectionAndCards.cards, event.previousIndex, event.currentIndex);
    console.log('cards to sort and change id: ', this.sectionAndCards.cards);
    this.sectionAndCards.cards.forEach((card: ProjectsCard, id: number) => {
      card.id = id + 1;
    });
    this.dataService.sortCards('projects', this.sectionAndCards.cards);
  }

  orietationChangeHAndler = async () => {
    await wait(0);
    //do this everywhere!
    const width = window?.visualViewport?.width
    if (width && width < 975) {
      if (window.matchMedia("(orientation: portrait)").matches) {
        if (this.swiper === null || this.swiper === undefined) {
          this.initSwiper();
        }
      }
    }
  }
  private checkOrientation() {
    window.addEventListener('orientationchange', this.orietationChangeHAndler);
  }
}

const emptyCard = {
  id: 0,
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
//UPDATE request
  // this update the content of an element that needs to be modified with contenteditable in place // not in use
  // saveCardEl(id: any, i: any) {
  //   const innerHTML = document.querySelector(`#${id}`)?.innerHTML;
  //   this.sectionAndCards.cards[i].ph[this.language] = innerHTML;
  //   this.dataService.aBMCard('projects', this.sectionAndCards.cards[i], "udpdate", i);
  // }