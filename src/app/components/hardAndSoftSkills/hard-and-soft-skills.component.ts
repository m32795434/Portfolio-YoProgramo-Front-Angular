import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { SkillsCard } from 'src/interfaces/sections-interfaces';
import { LoginService } from '../../../services/login-service/login.service';
import { DataService } from '../../../services/data-service/data.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { wait } from 'src/app/libraries/utils';
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
  section: any = { id: "skills", imgMobile: "", imgDesktop: "", en: "", es: "", cards: [] };
  //contains all the cards content
  cards: SkillsCard[] = [{
    id: "S1",
    img: { src: "../../../assets/images/regional-bs.png", alt: "regional-bs" },
    value: 50,
    bkColor: "red",
    size: 50,
    outStroke: "blue"

  }]
  lenguage = 'en';
  swiper: any;
  errorMessage = '';
  cardsIndex = 0;

  //new card
  newCard: SkillsCard = {
    id: "",
    img: { src: "", alt: "" },
    value: 0,
    bkColor: "red",
    size: 50,
    outStroke: "blue"
  }


  constructor(private loginService: LoginService, private dataService: DataService, private modalService: NgbModal) {
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((val) => {
      this.logged = val;
    });

    this.dataSubscription = this.dataService.getSkillsDataObserver().subscribe((section) => {
      this.section = section;
      this.cards = this.section['cards'];
    })
    this.errorSubscription = this.dataService.getErrorObserver().subscribe((message) => { this.errorMessage = message })
  }
  ngOnInit(): void {
    // window.onresize = this.checkForResize;
    const content = this.dataService.getData('skills');
    if (content) {
      this.section = content;
      this.cards = this.section['cards'];
    } else {
      this.dataService.getSectionFromJsonServer('skills');
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
    this.section.cards[i].ph[this.lenguage] = innerHTML;
    console.log('this.section.cards[i].ph[this.lenguage]', this.section.cards[i].ph[this.lenguage])
    this.dataService.updateSection('skills', this.section);
  }
  saveH1(e: any) {
    const targetId = e.target.dataset.id;
    const innerHTML = document.querySelector(`#${targetId}`)?.innerHTML;
    this.section[this.lenguage] = innerHTML;
    this.dataService.updateSection('skills', this.section);
  }
  updateCard() {
    console.log('updating with:', this.section);
    this.dataService.updateSection('skills', this.section);
  }
  deleteCard() {
    console.log('deleting index:', this.cardsIndex);
    this.section.cards.splice(this.cardsIndex, 1);
    console.log('this.section.cards', this.section.cards)
    this.dataService.updateSection('skills', this.section);
  }
  createCard() {
    this.newCard.id = `S${this.cards.length}`;
    this.section.cards.push(this.newCard);
    this.dataService.updateSection('skills', this.section);
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
