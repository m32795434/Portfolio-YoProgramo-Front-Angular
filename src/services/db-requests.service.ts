import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestServicesInterface } from 'src/interfaces/requestServicesInterface';

@Injectable({
  providedIn: 'root'
})
export class DbRequestsService implements RequestServicesInterface {

  constructor() { }
  getAllSection(): Observable<any> {
    throw new Error('Method not implemented.');
  }
  updateElContent(): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
