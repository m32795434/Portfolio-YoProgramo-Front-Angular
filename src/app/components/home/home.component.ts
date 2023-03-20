import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { wait } from 'src/app/libraries/utils';
import { Home, HomeSlide } from 'src/interfaces/sections-interfaces';
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
  logged: Boolean | undefined = false;
  private loggedSubscription = new Subscription();
  private dataSubscription = new Subscription();
  private errorSubscription = new Subscription();
  //contains all
  section: any = { id: "home", imgMobile: "", imgDesktop: "", en: "", es: "", slides: [] };
  //contains all the slides content
  slides: HomeSlide[] = [{ id: "id", en: "Loading!!..🫠", es: "Cargando!!🫠" }]
  lenguage = 'en';
  swiper: any;
  errorMessage = '';

  constructor(private loginService: LoginService, private dataService: DataService) {
    //updates the user login status when changes occur
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((val) => {
      this.logged = val;
      console.log('logged at home?', this.logged);
    });

    this.dataSubscription = this.dataService.getHomeDataObserver().subscribe((section) => {
      this.section = section;
      this.slides = this.section['slides'];
    })
    this.errorSubscription = this.dataService.getErrorObserver().subscribe((message) => { this.errorMessage = message })
  }

  ngOnInit(): void {
    const content = this.dataService.getData('home');
    if (content) {
      this.section = content;
      this.slides = this.section['slides'];
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
