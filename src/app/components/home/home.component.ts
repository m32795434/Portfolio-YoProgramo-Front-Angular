import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SlidesInterface } from 'src/interfaces/slidesInterface';
import { JsonServerRequestsService } from 'src/services/json-server-requests/json-server-requests-service';
import { LoginService } from 'src/services/login.service';

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

  errorMessage = '';

  constructor(private JsonServer: JsonServerRequestsService, private loginService: LoginService) {
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((val) => {
      this.logged = val;
    })
  }
  ngOnInit(): void {
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
  //AVOID SANITIZER
  // getHtmlContent(content: string) {
  //   return this.sanitizer.bypassSecurityTrustHtml(content);
  // }
}
/************************************
TODO:
save-buttons + set id of every element, to the respective button
**************************************/
