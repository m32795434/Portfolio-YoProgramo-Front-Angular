import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Conexion } from 'src/interfaces/Conexion';
import {  ExperienceAndCards, HomeAndCards, SectionAndCards, StringSection } from 'src/interfaces/sections-interfaces';
import {  SpringExperienceAndCards, SpringExperienceCard, SpringHomeAndCards, SpringHomeCard} from 'src/interfaces/spring-interfaces';

@Injectable({
  providedIn: 'root'
})
export class SpringServerService implements Conexion {
//URL & CONFIG
private apiUrl = 'http://localhost:8080';
private config = { headers: { 'Content-Type': 'application/json' } };
  constructor(private http: HttpClient) {
  
   }
  updateSectionAndCards(section: StringSection, obj: SectionAndCards): Observable<SectionAndCards> {
    return this.http.put<SectionAndCards>(`${this.apiUrl}/${section}`, obj, this.config)
  }

  getSectionAndCards(section: StringSection): Observable<SectionAndCards> {
    return this.http.get<SectionAndCards>(`${this.apiUrl}/${section}`);
  }
   //change its name to getSectionAndCards!
   //GET FULL/Complete SECTIONS => SectionAndCards
   getSection(sec:StringSection){
    switch (sec) {
      case "home":
        return this.getHomeAndCardsObs();
        case "experience":
        return this.getExperienceAndCardsObs();
      default:
        break;
    }
    }
  getHomeAndCardsObs(): Observable<HomeAndCards> {
    return from(fetch(`${this.apiUrl}/completeHomeSection`)).pipe(
      switchMap(response => response.json()),
      map(mapSpringHomeAndCards)
    );
  }getExperienceAndCardsObs(): Observable<ExperienceAndCards> {
    return from(fetch(`${this.apiUrl}/completeExperienceSection`)).pipe(
      switchMap(response => response.json()),
      map(mapSpringExperienceAndCards)
    );
  }
 
}
//GET FULL SECTIONS
//HOME
const mapSpringHomeAndCards = (data: SpringHomeAndCards)=>{
return {
  id: data.section.id,
  imgMobile: data.section.imgMobile,
  imgDesktop: data.section.imgDesktop,
  en: data.section.en ,
  es: data.section.es,
  cards:mapSpringHomeCards(data.cards)
}
}
const mapSpringHomeCards = (cards:SpringHomeCard[])=>{
const newHomeCards = cards.map((card)=>{
  const homeCard = {
    id: card.id,
    ph: { en: card.phEn, es: card.phEs }};
  return homeCard;
})
return newHomeCards;
}
//EXPERIENCE
const mapSpringExperienceAndCards = (data: SpringExperienceAndCards)=>{
  return {
    id: data.section.id,
    imgMobile: data.section.imgMobile,
    imgDesktop: data.section.imgDesktop,
    en: data.section.en ,
    es: data.section.es,
    cards:mapSpringExperienceCards(data.cards)
  }
  }
  const mapSpringExperienceCards = (cards:SpringExperienceCard[])=>{
  const newExperienceCards = cards.map((card)=>{
    const experienceCard = {
      id: card.id,
      img: {
          src: card.imgSrc, alt: {
              en: card.imgAltEn, es: card.imgAltEs
          }
      },
      startDate: { year: card.startDateYear, month: card.startDateMonth, day: card.startDateDay },
      endDate: { year: card.endDateYear, month: card.endDateMonth, day: card.endDateDay },
      ph: { en: card.phEn, es: card.phEs }};
    return experienceCard;
  })
  return newExperienceCards;
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