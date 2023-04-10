import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conexion } from 'src/interfaces/Conexion';
import { SectionAndCards, StringSection } from '../../interfaces/sections-interfaces';

@Injectable({
  providedIn: 'root'
})
export class JsonServerService implements Conexion {
  //URL & CONFIG
  private apiUrl = 'http://localhost:5000/sections';
  private config = { headers: { 'Content-Type': 'application/json' } };
  constructor(private http: HttpClient) {
  }

  updateSectionAndCards(section: StringSection, obj: SectionAndCards): Observable<SectionAndCards> {
    return this.http.put<SectionAndCards>(`${this.apiUrl}/${section}`, obj, this.config)
  }

  getSectionAndCards(section: StringSection): Observable<SectionAndCards> {
    return this.http.get<SectionAndCards>(`${this.apiUrl}/${section}`);
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