import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conexion } from 'src/interfaces/Conexion';

@Injectable({
  providedIn: 'root'
})
export class DbRequestsService implements Conexion {

  constructor() { }
  getAllSection(): Observable<any> {
    throw new Error('Method not implemented.');
  }
  updateElContent(): Observable<any> {
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