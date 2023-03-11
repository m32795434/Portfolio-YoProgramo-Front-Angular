import { Component, OnInit } from '@angular/core';
import { JsonServerRequestsService } from 'src/services/json-server-requests/json-server-requests-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  section: any;
  errorMessage = '';
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
}
