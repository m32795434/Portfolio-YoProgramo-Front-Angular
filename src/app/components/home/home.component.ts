import { Component, OnInit } from '@angular/core';
import { JsonServerRequestsService } from 'src/services/json-server-requests/json-server-requests-service';
// import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  section: any;
  errorMessage = '';
  importanteA = 'importanteA';
  constructor(private JsonServer: JsonServerRequestsService) { }
  ngOnInit(): void {
    this.JsonServer.getAllSection('home').subscribe((content) => {
      this.section = content;
      console.log('seccion cargada exitosamente:...', this.section);
    }), (error: Error) => {
      console.error('Error al cargar la seccion', error);
      this.errorMessage = error.message;
    };
  }
  // getHtmlContent(content: string) {
  //   return this.sanitizer.bypassSecurityTrustHtml(content);
  // }
}
