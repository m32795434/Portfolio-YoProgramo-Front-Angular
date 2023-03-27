import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExperienceCard } from 'src/interfaces/sections-interfaces';
import { LoginService } from '../../../services/login-service/login.service';
import { DataService } from '../../../services/data-service/data.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
//DATEPICKER
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


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
  section: any = { id: "experience", imgMobile: "", imgDesktop: "", en: "", es: "", cards: [] };
  //contains all the cards content
  cards: ExperienceCard[] = [{
    id: "id",
    img: { src: "", alt: "" },
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
    h2: { en: "Loading!!..🫠", es: "Cargando!!🫠" },
    h4: { text: "Cargando!!🫠" },
    ph: { en: "Loading!!..🫠", es: "Cargando!!🫠" }
  }]
  lenguage = 'en';
  swiper: any;
  errorMessage = '';
  cardsIndex = 0;
  // greaterThan975 = false;
  model?: NgbDateStruct;

  //new card
  newCard: QPDCard = {
    id: "id",
    img: { src: "", alt: "" },
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
    h4: { text: "" },
    ph: { en: "", es: "" }
  }

  constructor(private loginService: LoginService, private dataService: DataService, private modalService: NgbModal) {
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((val) => {
      this.logged = val;
    });

    this.dataSubscription = this.dataService.getQPDDataObserver().subscribe((section) => {
      this.section = section;
      this.cards = this.section['cards'];
    })
    this.errorSubscription = this.dataService.getErrorObserver().subscribe((message) => { this.errorMessage = message })
  }
  ngOnInit(): void {
    // window.onresize = this.checkForResize;
    const content = this.dataService.getData('qPD');
    if (content) {
      this.section = content;
      this.cards = this.section['cards'];
    } else {
      this.dataService.getSectionFromJsonServer('qPD');
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
    console.log('id:', id, 'index:', i)
    // const targetId = e.target.dataset.id;
    const innerHTML = document.querySelector(`#${id}`)?.innerHTML;
    console.log('innerHTML', innerHTML)
    // const index = this.section.cards.findIndex((el: HomeCard) => {
    //   return (el.id === targetId)
    // })
    this.section.cards[i].ph[this.lenguage] = innerHTML;
    console.log('this.section.cards[i].ph[this.lenguage]', this.section.cards[i].ph[this.lenguage])

    this.dataService.updateSection('qPD', this.section);
  }
  saveH1(e: any) {
    const targetId = e.target.dataset.id;
    const innerHTML = document.querySelector(`#${targetId}`)?.innerHTML;
    this.section[this.lenguage] = innerHTML;
    this.dataService.updateSection('qPD', this.section);
  }
  updateCard() {
    console.log('updating with:', this.section);
    this.dataService.updateSection('qPD', this.section);
  }
  deleteCard() {
    console.log('deleting index:', this.cardsIndex);
    this.section.cards.splice(this.cardsIndex, 1);
    console.log('this.section.cards', this.section.cards)
    this.dataService.updateSection('qPD', this.section);
  }
  createCard() {
    this.newCard.id = `S${this.cards.length}`;
    this.section.cards.push(this.newCard);
    this.dataService.updateSection('qPD', this.section);
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