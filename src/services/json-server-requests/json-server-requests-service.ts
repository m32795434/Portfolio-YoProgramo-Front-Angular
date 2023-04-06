import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Conexion } from 'src/interfaces/Conexion';
import { Experience, Home, Projects, QPD, Section, StringSection } from '../../interfaces/sections-interfaces';

@Injectable({
  providedIn: 'root'
})
export class JsonServerRequestsService implements Conexion {
  //URL & CONFIG
  private apiUrl = 'http://localhost:5000/sections';
  private config = { headers: { 'Content-Type': 'application/json' } };
  constructor(private http: HttpClient) {
  }

  updateSectionAndCards(section: StringSection, obj: Section): Observable<Section> {
    return this.http.put<Section>(`${this.apiUrl}/${section}`, obj, this.config)
  }

  getSectionAndCards(section: StringSection): Observable<Section> {
    return this.http.get<Section>(`${this.apiUrl}/${section}`);
    // .pipe( //I could define the error catching here. Pipe is an Observable's method
    //   catchError(error => {
    //     console.error('Error al obtener la seccion', error);
    //     return throwError(() => new Error(error));
    //   })
    // )
  }
}
/*

  deleteTask(task: TaskIterface): Observable<TaskIterface> {
    return this.http.delete<TaskIterface>(`${this.apiUrl}/${task.id}`)
  }
  
  createTask(task: TaskIterface): Observable<TaskIterface> {
    return this.http.post<TaskIterface>(`${this.apiUrl}/`, task, this.config);
  }*/