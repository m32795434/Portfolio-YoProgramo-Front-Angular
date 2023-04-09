import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Conexion } from 'src/interfaces/Conexion';
import { HomeAndCards, Section, StringSection } from 'src/interfaces/sections-interfaces';
import { SpringHomeAndCards } from 'src/interfaces/spring-interfaces';

@Injectable({
  providedIn: 'root'
})
export class SpringServerService implements Conexion {
//URL & CONFIG
private apiUrl = 'http://localhost:8080';
private config = { headers: { 'Content-Type': 'application/json' } };
  constructor(private http: HttpClient) {
  
   }
  updateSectionAndCards(section: StringSection, obj: Section): Observable<Section> {
    return this.http.put<Section>(`${this.apiUrl}/${section}`, obj, this.config)
  }

  getSectionAndCards(section: StringSection): Observable<Section> {
    return this.http.get<Section>(`${this.apiUrl}/${section}`);
  }
  
  SpringGetSectionAndCards(): Observable<HomeAndCards> {
    return from(fetch(`${this.apiUrl}/completeHomeSection`)).pipe(
      switchMap(response => response.json()),
      map(returnHomeAndCards)
    );
  }
  
}
const returnHomeAndCards = (data: SpringHomeAndCards)=>{
return {
  id: data.section.id,
        imgMobile: data.section.imgMobile,
        imgDesktop: data.section.imgDesktop,
        en: data.section.en,
        es: data.section.es,
        cards: data.homeCardList
}
}
/*

  deleteTask(task: TaskIterface): Observable<TaskIterface> {
    return this.http.delete<TaskIterface>(`${this.apiUrl}/${task.id}`)
  }
  
  createTask(task: TaskIterface): Observable<TaskIterface> {
    return this.http.post<TaskIterface>(`${this.apiUrl}/`, task, this.config);
  }*/
  
//traditional fetch work ok-->
  //put
  //await fetch(`${this.apiUrl}/${task.id}`, { method: "PUT", body: JSON.stringify(task), headers: { "Content-Type": "application/json" } })
  //get
  // async ngOnInit(): Promise<any> {
  //   const response = await fetch(this.apiUrl, { method: 'GET', headers: { Accept: 'application/json' } });
  //   const result = await response.json();
  //   console.log(result)
  // }
  
  // async anotherFunction():Promise<HomeAndCards>{
    // const response = await fetch(`${this.apiUrl}/completeHomeSection`);
    // const data : SpringHomeAndCards = await response.json()
    // let sec: HomeAndCards = { id: "home", imgMobile: "", imgDesktop: "", en: "", es: "", cards: [{ id: "id", en: "Loading!!..🫠", es: "Cargando!!🫠" }] };
      // sec.en = data.section.en;
      // sec.es = data.section.es;
      // sec.id = data.section.id;
      // sec.imgDesktop = data.section.imgDesktop;
      // sec.imgMobile = data.section.imgMobile;
      // sec.cards = data.homeCardList;
    // return sec;
  // }