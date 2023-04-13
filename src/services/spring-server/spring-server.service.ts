import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Conexion } from 'src/interfaces/Conexion';
import {  ABM, ExperienceAndCards, ExperienceCard, HomeAndCards, HomeCard, ProjectsAndCards, ProjectsCard, QPDAndCards, QPDCard, SectionAndCards, SectionCard, SectionInfo, SkillsAndCards, SkillsCard, StringSection } from 'src/interfaces/sections-interfaces';
import {  SpringExperienceAndCards, SpringExperienceCard, SpringHomeAndCards, SpringHomeCard, SpringProjectsAndCards, SpringProjectsCard, SpringQPDAndCards, SpringQPDCard, SpringSkillsAndCards, SpringSkillsCard} from 'src/interfaces/spring-interfaces';

@Injectable({
  providedIn: 'root'
})
export class SpringServerService implements Conexion {
//URL & CONFIG
private apiUrl = 'http://localhost:8080';
private config = { headers: { 'Content-Type': 'application/json' } };
  constructor(private http: HttpClient) {
  
   }
  createCard(sec: StringSection, obj: SectionCard): Observable<any> | undefined {
    throw new Error('Method not implemented.');
  }
  updateSectionAndCards(section: StringSection, obj: SectionAndCards): Observable<SectionAndCards> {
    return this.http.put<SectionAndCards>(`${this.apiUrl}/${section}`, obj, this.config)
  }

   //-----------------------------GET FULL/Complete SECTIONS => SectionAndCards-----------------------------

   getSectionAndCards(sec:StringSection):Observable<SectionAndCards>| undefined{
   switch (sec) {
     case "home":
       return this.getHomeAndCardsObs();
       case "experience":
       return this.getExperienceAndCardsObs();
       case "projects":
       return this.getProjectsAndCardsObs();
       case "qPD":
       return this.getQPDAndCardsObs();
       case "skills":
       return this.getSkillsAndCardsObs();
     default:
    return undefined;
   }
   }
  getHomeAndCardsObs(): Observable<HomeAndCards> {
    return from(fetch(`${this.apiUrl}/completeHomeSection`)).pipe(
      switchMap(response => response.json()),
      map(mapSpringHomeAndCards)
    );
  }
  getExperienceAndCardsObs(): Observable<ExperienceAndCards> {
    return from(fetch(`${this.apiUrl}/completeExperienceSection`)).pipe(
      switchMap(response => response.json()),
      map(mapSpringExperienceAndCards)
    );
  }
  getProjectsAndCardsObs(): Observable<ProjectsAndCards> {
    return from(fetch(`${this.apiUrl}/completeProjectsSection`)).pipe(
      switchMap(response => response.json()),
      map(mapSpringProjectsAndCards)
    );
  }
  getSkillsAndCardsObs(): Observable<SkillsAndCards> {
    return from(fetch(`${this.apiUrl}/completeSkillsSection`)).pipe(
      switchMap(response => response.json()),
      map(mapSpringSkillsAndCards)
    );
  }
  getQPDAndCardsObs(): Observable<QPDAndCards> {
    return from(fetch(`${this.apiUrl}/completeQPDSection`)).pipe(
      switchMap(response => response.json()),
      map(mapSpringQPDAndCards)
    );
  }

  // -----------------------------UPDATE SECTION-----------------------------

  updateSectionInfo(sec:StringSection, obj: SectionInfo):Observable<any> | undefined{
return this.http.put<any>(`${this.apiUrl}/update/section`, obj, this.config);
  }

  //-----------------------------ABM CARDS-----------------------------

  aBMCard(sec: StringSection, obj: SectionCard, abm:ABM): Observable<any> | undefined{
    if(abm === "create" || abm === "udpdate"){
      let springCard;
      switch (sec) {
        case "home":
        springCard = toSpringCards.mapToSpringHomeCard(obj)
        break;
        case "experience":
        springCard = toSpringCards.mapToSpringExperienceCard(obj)
        break;
        case "skills":
        springCard = toSpringCards.mapToSpringSkillsCard(obj)
        break;
        case "qPD":
        springCard = toSpringCards.mapToSpringQPDCard(obj)
        break;
        case "projects":
        springCard = toSpringCards.mapToSpringProjectsCard(obj)
        break;
        default:
        break;
      }
      if(abm === "create"){
        return this.http.post<any>(`${this.apiUrl}/${sec}/createCard`, springCard, this.config);
      }else {
        return this.http.put<any>(`${this.apiUrl}/${sec}/updateCard`, springCard, this.config);
      }
    }else 
      return this.http.delete<any>(`${this.apiUrl}/${sec}/deleteCard/${obj.id}`);
  }
}


//-----------------------------GET FULL SECTIONS-----------------------------
//HOME
const mapSpringHomeAndCards = (data: SpringHomeAndCards)=>{
return {
  section: data.section,
  cards:mapSpringHomeCards(data.cards)
}
}
const mapSpringHomeCards = (cards:SpringHomeCard[])=>{
const newHomeCards = cards.map((card)=>{
  const homeCard:HomeCard = {
    id: card.id,
    ph: { en: card.phEn, es: card.phEs }};
  return homeCard;
})
return newHomeCards;
}
//EXPERIENCE
const mapSpringExperienceAndCards = (data: SpringExperienceAndCards)=>{
  return {
    section: data.section,
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
//PROJECTS
const mapSpringProjectsAndCards = (data: SpringProjectsAndCards)=>{
  return {
    section: data.section,
    cards:mapSpringProjectsCards(data.cards)
  }
  }
  const mapSpringProjectsCards = (cards:SpringProjectsCard[])=>{
  const newProjectsCards = cards.map((card)=>{
    const projectsCard = {
      id: card.id,
      img: {
          src: card.imgSrc, alt: {
              en: card.imgAltEn, es: card.imgAltEs
          }
      },
      h2: { en: card.h2En, es: card.h2Es },
      ph: { en: card.phEn, es: card.phEs }};
    return projectsCard;
  })
  return newProjectsCards;
  }
  //SKILLS
const mapSpringSkillsAndCards = (data: SpringSkillsAndCards)=>{
  return {
    section: data.section,
    cards:mapSpringSkillsCards(data.cards)
  }
  }
  const mapSpringSkillsCards = (cards:SpringSkillsCard[])=>{
  const newSkillsCards = cards.map((card)=>{
    const skillsCard = {
      id: card.id,
      img: {
          src: card.imgSrc, alt: {
              en: card.imgAltEn, es: card.imgAltEs
          }
      },
      value: card.value, bkColor: card.bkColor, outStrokeColor: card.outStrokeColor,
      };
    return skillsCard;
  })
  return newSkillsCards;
  }
//QPD
const mapSpringQPDAndCards = (data: SpringQPDAndCards)=>{
  return {
    section: data.section,
    cards:mapSpringQPDCards(data.cards)
  }
  }
  const mapSpringQPDCards = (cards:SpringQPDCard[])=>{
  const newQPDCards = cards.map((card)=>{
    const qPDCard = {
      id: card.id,
      img: {
          src: card.imgSrc, alt: {
              en: card.imgAltEn, es: card.imgAltEs
          }
      },
      startDate: { year: card.startDateYear, month: card.startDateMonth, day: card.startDateDay },
      endDate: { year: card.endDateYear, month: card.endDateMonth, day: card.endDateDay },
      h2: { en: card.h2En, es: card.h2Es },
      ph: { en: card.phEn, es: card.phEs }
      };
    return qPDCard;
  })
  return newQPDCards;
  }

  // ----------------------------- MAP FROM a SectionCard to a Spring Card
  const toSpringCards = {
    //HomeCard
    mapToSpringHomeCard(card:any):SpringHomeCard{
      return{
        id:card.id,
        phEn:card.ph.en,
        phEs:card.ph.es
      }
    },
    //QPDCard
    mapToSpringQPDCard(card:any):SpringQPDCard{
      return{
        id:card.id,
        imgSrc:card.img.src,
        imgAltEn:card.img.alt.en,
        imgAltEs:card.img.alt.es,
        startDateYear:card.startDate.year,
        startDateMonth:card.startDate.month,
        startDateDay:card.startDate.day,
        endDateYear:card.endDate.year,
        endDateMonth:card.endDate.month,
        endDateDay:card.endDate.day,
        phEn:card.ph.en,
        phEs:card.ph.es,
        h2En:card.h2.en,
        h2Es:card.h2.es
      }
    },
    //ExperienceCard
    mapToSpringExperienceCard(card:any):SpringExperienceCard{
      return{
        id:card.id,
        imgSrc:card.img.src,
        imgAltEn:card.img.alt.en,
        imgAltEs:card.img.alt.es,
        startDateYear:card.startDate.year,
        startDateMonth:card.startDate.month,
        startDateDay:card.startDate.day,
        endDateYear:card.endDate.year,
        endDateMonth:card.endDate.month,
        endDateDay:card.endDate.day,
        phEn:card.ph.en,
        phEs:card.ph.es,
            }
    }, 
    mapToSpringProjectsCard(card:any):SpringProjectsCard{
      return{
        id:card.id,
        imgSrc:card.img.src,
        imgAltEn:card.img.alt.en,
        imgAltEs:card.img.alt.es,
        phEn:card.ph.en,
        phEs:card.ph.es,
        h2En:card.h2.en,
        h2Es:card.h2.es
      }
    },
    mapToSpringSkillsCard(card:any):SpringSkillsCard{
      return{
        id:card.id,
        imgSrc:card.img.src,
        imgAltEn:card.img.alt.en,
        imgAltEs:card.img.alt.es,
        value:card.value,
        bkColor:card.bkColor,
        outStrokeColor:card.outStrokeColor,
      }
    },
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
  