import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { wait } from 'src/app/libraries/utils';
import { SlidesInterface } from 'src/interfaces/slidesInterface';
import { DataService } from 'src/services/data-service/data.service';
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
  private logged = false;
  private loggedSubscription = new Subscription();
  private dataSubscription = new Subscription();
  //contains all
  section: any;
  //contains all the slides content
  slides?: SlidesInterface[] = [{ id: "id", content: "Loading!!..🫠" }]
  lenguage = 'en';
  swiper: any;
  errorMessage = '';

  constructor(private loginService: LoginService, private dataService: DataService) {
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((val) => {
      this.logged = val;
    });
    this.dataSubscription = this.dataService.getDataObserver().subscribe((sections) => {
      this.section = sections['home'];
      this.slides = this.section[this.lenguage]?.slides;
    })
  }
  ngOnInit(): void {
    this.initSwiper();

    const content = this.dataService.getData('home');
    if (content) {
      this.section = content;
      this.slides = this.section[this.lenguage]?.slides;
    } else {
      this.dataService.getDataFromJsonServer();
    }
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
