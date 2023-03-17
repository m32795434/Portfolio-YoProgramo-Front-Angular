import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { wait } from 'src/app/libraries/utils';
import { SlidesInterface } from 'src/interfaces/slidesInterface';
import { JsonServerRequestsService } from 'src/services/json-server-requests/json-server-requests-service';
import { LoginService } from 'src/services/login.service';
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
  private logged = false;
  private loggedSubscription = new Subscription();
  //contains all
  section: any;
  //contains all the slides content
  slides?: SlidesInterface[] = [{ id: "id", content: "Loading!!..🫠" }]
  lenguage = 'en';
  swiper: any;
  errorMessage = '';

  constructor(private JsonServer: JsonServerRequestsService, private loginService: LoginService) {
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((val) => {
      this.logged = val;
    })
  }
  ngOnInit(): void {
    this.initSwiper();
    this.JsonServer.getAllSection('home').subscribe({
      next: (content) => {
        this.section = content;
        console.log('seccion cargada exitosamente:...', this.section);
        this.slides = this.section[this.lenguage]?.slides;
        console.log(this.slides);
      },
      error: (error: Error) => {
        console.error('Error al cargar la seccion', error);
        this.errorMessage = error.message;
      },
      complete: () => {
        console.log('Subscription completed');
      }
    });
  }

  async initSwiper() {
    await wait(0);//Left this code at the end of the callstack!
    console.log('window.Swiper on init', window.Swiper);
    this.swiper = new window.Swiper('.swiper', {
      // Optional parameters
      direction: 'horizontal',
      loop: false,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
    console.log('swiper created', this.swiper)
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
TODO:
save-buttons + set id of every element, to the respective button
**************************************/
