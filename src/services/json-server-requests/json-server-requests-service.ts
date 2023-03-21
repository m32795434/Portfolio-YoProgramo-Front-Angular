import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RequestServicesInterface } from 'src/interfaces/requestServicesInterface';
import { Experience, Home, Projects, QPD, Section, StringSection } from '../../interfaces/sections-interfaces';

@Injectable({
  providedIn: 'root'
})
export class JsonServerRequestsService implements RequestServicesInterface {
  //URL & CONFIG
  private apiUrl = 'http://localhost:5000/sections';
  private config = { headers: { 'Content-Type': 'application/json' } };


  constructor(private http: HttpClient) { }
  updateSection(section: StringSection): Observable<Section> {
    throw new Error('Method not implemented.');
  }
  // getSection(section: string): Observable<Home> {
  //   throw new Error('Method not implemented.');
  // }

  getSection(section: StringSection): Observable<Section> {
    return this.http.get<Home | Experience | QPD | Projects>(`${this.apiUrl}/${section}`);
    // .pipe( //I could define the error catching here. Pipe is an Observable's method
    //   catchError(error => {
    //     console.error('Error al obtener la seccion', error);
    //     return throwError(() => new Error(error));
    //   })
    // )
  }

  updateElContent<S extends StringSection, O extends Section>(section: S, obj: O): Observable<O> {
    return this.http.put<O>(`${this.apiUrl}/`, obj, this.config)
  }
  // updateSlideElContent(): Observable<ElInterface> {
  //   throw new Error('Method not implemented.');
  // }
}
/*
private apiUrl = 'http://localhost:5000/tasks';
  private config = { headers: { 'Content-Type': 'application/json' } };
  constructor(
    private http: HttpClient
  ) { }

  getTasks(): Observable<TaskIterface[]> {
    const pepe = of(this.apiUrl)
    const items = this.http.get<TaskIterface[]>(this.apiUrl);
    return items;
  }
  deleteTask(task: TaskIterface): Observable<TaskIterface> {
    return this.http.delete<TaskIterface>(`${this.apiUrl}/${task.id}`)
  }
  updateTaskReminder(task: TaskIterface): Observable<TaskIterface> {
    return this.http.put<TaskIterface>(`${this.apiUrl}/${task.id}`, task, this.config);
  }
  createTask(task: TaskIterface): Observable<TaskIterface> {
    return this.http.post<TaskIterface>(`${this.apiUrl}/`, task, this.config);
  }*/