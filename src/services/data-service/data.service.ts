import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Sections } from 'src/interfaces/sectionsInterface';
import { JsonServerRequestsService } from '../json-server-requests/json-server-requests-service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new Subject<any>();
  protected data?: any;
  constructor(private JsonServer: JsonServerRequestsService) { }

  getDataObserver() {
    return this.dataSubject.asObservable();
  }
  getDataFromJsonServer() {
    this.JsonServer.getAllSections().subscribe({
      next: (content) => {
        this.data = content;
        this.dataSubject.next(this.data);
        console.log('secciones cargadas exitosamente:...', this.data);
      },
      error: (error: Error) => {
        console.error('Error al cargar las secciones', error);
      },
      complete: () => {
        console.log('Subscription completed');
      }
    });
  }

  getData(arg: string): any {
    console.log('geting data from service:', this.data);
    if (this.data != undefined) return this.data[arg];
    return undefined;
  }


}
