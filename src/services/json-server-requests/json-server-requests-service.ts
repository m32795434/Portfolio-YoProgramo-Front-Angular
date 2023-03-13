import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RequestServicesInterface } from 'src/interfaces/requestServicesInterface';

@Injectable({
  providedIn: 'root'
})
export class JsonServerRequestsService implements RequestServicesInterface {
  private apiUrl = 'http://localhost:5000/';
  private config = { headers: { 'Content-Type': 'application/json' } };

  constructor(private http: HttpClient) { }
  getAllSection(val: string): Observable<{}> {
    return this.http.get<{}>(`${this.apiUrl}${val}`);
    // .pipe( //I could define the error catching here
    //   catchError(error => {
    //     console.error('Error al obtener la seccion', error);
    //     return throwError(() => new Error(error));
    //   })
    // )
  }
  updateElContent(): Observable<{}> {
    throw new Error('Method not implemented.');
  }
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