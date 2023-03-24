import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeSlide, QPDSlide } from 'src/interfaces/sections-interfaces';
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
  selector: 'app-qpd',
  templateUrl: './qpd.component.html',
  styleUrls: ['./qpd.component.scss'],
})
export class QPDComponent implements OnInit {
  // @ViewChild('h1') h1: any;
  logged: Boolean | undefined = false;
  private loggedSubscription = new Subscription();
  private dataSubscription = new Subscription();
  private errorSubscription = new Subscription();
  //contains all
  section: any = { id: "qPD", imgMobile: "", imgDesktop: "", en: "", es: "", slides: [] };
  //contains all the slides content
  slides: QPDSlide[] = [{
    id: "id", img: { src: "", alt: "" },
    dateS: {
      year: 2022,
      month: 6,
      day: 1
    },
    dateE: {
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
  slidesIndex = 0;
  // greaterThan975 = false;
  model?: NgbDateStruct;


  constructor(private loginService: LoginService, private dataService: DataService, private modalService: NgbModal) {
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((val) => {
      this.logged = val;
    });

    this.dataSubscription = this.dataService.getQPDDataObserver().subscribe((section) => {
      this.section = section;
      this.slides = this.section['slides'];
      console.log('slides!', this.slides)
    })
    this.errorSubscription = this.dataService.getErrorObserver().subscribe((message) => { this.errorMessage = message })
  }
  ngOnInit(): void {
    // window.onresize = this.checkForResize;
    const content = this.dataService.getData('qPD');
    if (content) {
      this.section = content;
      this.slides = this.section['slides'];
    } else {
      this.dataService.getSectionFromJsonServer('qPD');
    }
    //checks if the user is logged when init
    this.logged = this.loginService.isLogged();
    this.initSwiper();
    // this.checkForResize();
  }

  // checkForResize = (): void => {
  //   const widthViewPort: any = window?.visualViewport?.width;
  //   if (widthViewPort != null) {
  //     if (widthViewPort > 975.2) {
  //       this.greaterThan975 = true;
  //       this.swiper.destroy();
  //     } else if (widthViewPort < 975.2) {
  //       this.greaterThan975 = false;
  //       if (this.swiper?.destroyed === true || this.swiper === undefined) {
  //         console.log(this.swiper)
  //       }
  //     }
  //   }

  // }

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
  saveSlideEl(e: any) {
    const targetId = e.target.dataset.id;
    const innerHTML = document.querySelector(`#${targetId}`)?.innerHTML;
    const index = this.section.slides.findIndex((el: HomeSlide) => {
      return (el.id === targetId)
    })
    this.section.slides[index][this.lenguage] = innerHTML;
    this.dataService.updateSection('qPD', this.section);
  }
  saveH1(e: any) {
    const targetId = e.target.dataset.id;
    const innerHTML = document.querySelector(`#${targetId}`)?.innerHTML;
    this.section[this.lenguage] = innerHTML;
    this.dataService.updateSection('qPD', this.section);
  }
  saveImgSrc() {
    this.dataService.updateSection('qPD', this.section);
  }
  //IMG SRC MODAL

  open(content: TemplateRef<any>, index?: any) {
    this.slidesIndex = index;
    this.modalService.open(content, {
      ariaLabelledBy: 'imgSrcModal',
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
