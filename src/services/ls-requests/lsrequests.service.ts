import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conexion } from 'src/interfaces/Conexion';

@Injectable({
  providedIn: 'root'
})
export class LSRequestsService implements Conexion {

  constructor() { }
  getAllSection(): Observable<any> {
    throw new Error('Method not implemented.');
  }
  updateElContent(): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
