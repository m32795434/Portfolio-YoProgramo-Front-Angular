import { Component, OnInit } from '@angular/core';
import { SlidesInterface } from 'src/interfaces/slidesInterface';
import { JsonServerRequestsService } from 'src/services/json-server-requests/json-server-requests-service';
// import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.esm.browser.min.js'

// import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //contains all
  section: any;
  //contains all the slides content
  slides?: SlidesInterface[] = [{ id: "id", content: "Loading!!..🫠" }]
  lenguage = 'en';

  errorMessage = '';

  constructor(private JsonServer: JsonServerRequestsService) { }
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
  // getHtmlContent(content: string) {
  //   return this.sanitizer.bypassSecurityTrustHtml(content);
  // }
}
