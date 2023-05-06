import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Conexion } from 'src/interfaces/Conexion';
import { ABM, ExperienceAndCards, ExperienceCard, HomeAndCards, HomeCard, ProjectsAndCards, ProjectsCard, QPDAndCards, QPDCard, SectionAndCards, SectionCard, SectionInfo, SkillsAndCards, SkillsCard, StringSection, User } from 'src/interfaces/sections-interfaces';
import { SpringExperienceAndCards, SpringExperienceCard, SpringHomeAndCards, SpringHomeCard, SpringProjectsAndCards, SpringProjectsCard, SpringQPDAndCards, SpringQPDCard, SpringSkillsAndCards, SpringSkillsCard, UpdateUserAndPassObj } from 'src/interfaces/spring-interfaces';

@Injectable({
  providedIn: 'root'
})
export class SpringServerService implements Conexion {
  //URL & CONFIG
  private apiUrl = 'https://manuelbravard-yoprogramo-api.onrender.com';
  private config = { headers: { 'Content-Type': 'application/json' } };
  constructor(private http: HttpClient) {

  }

  checkAuth(user: User): Observable<boolean> | undefined {
    return this.http.post<boolean>(`${this.apiUrl}/login`, user, this.config)
  }
  saveUser(user: UpdateUserAndPassObj): Observable<any> | undefined {
    return this.http.put<any>(`${this.apiUrl}/user`, user, this.config)
  }

  //-----------------------------GET FULL/Complete SECTIONS => SectionAndCards-----------------------------

  getSectionAndCards(sec: StringSection): Observable<SectionAndCards> | undefined {
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
      switchMap(response => {
        console.log('project response:', response)
        const res = response.json();
        console.log('response.json():', res);
        return res
      }),
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

  updateSectionInfo(sec: StringSection, obj: SectionInfo): Observable<any> | undefined {
    return this.http.put<any>(`${this.apiUrl}/update/section`, obj, this.config);
  }

  //-----------------------------ABM CARDS-----------------------------

  aBMCard(sec: StringSection, obj: SectionCard, abm: ABM, i: number): Observable<any> | undefined {
    if (abm === "create" || abm === "udpdate") {
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
      if (abm === "create") {
        return this.http.post<any>(`${this.apiUrl}/${sec}/createCard`, springCard, this.config);
      } else {
        console.log('card to update:', springCard)
        return this.http.put<any>(`${this.apiUrl}/${sec}/updateCard`, springCard, this.config);
      }
    } else
      return this.http.delete<any>(`${this.apiUrl}/${sec}/deleteCard/${obj.id}`);
  }
}


//-----------------------------GET FULL SECTIONS SWITCH CASES-----------------------------
//HOME
const mapSpringHomeAndCards = (data: SpringHomeAndCards) => {
  return {
    section: data.section,
    cards: mapSpringHomeCards(data.cards)
  }
}
const mapSpringHomeCards = (cards: SpringHomeCard[]) => {
  const newHomeCards = cards.map((card) => {
    const homeCard: HomeCard = {
      id: card.id,
      ph: { en: card.phEn, es: card.phEs }
    };
    return homeCard;
  })
  return newHomeCards;
}
//EXPERIENCE
const mapSpringExperienceAndCards = (data: SpringExperienceAndCards) => {
  return {
    section: data.section,
    cards: mapSpringExperienceCards(data.cards)
  }
}
const mapSpringExperienceCards = (cards: SpringExperienceCard[]) => {
  const newExperienceCards = cards.map((card) => {
    const experienceCard = {
      id: card.id,
      img: {
        src: card.imgSrc, alt: {
          en: card.imgAltEn, es: card.imgAltEs
        }
      },
      startDate: { year: card.startDateYear, month: card.startDateMonth, day: card.startDateDay },
      endDate: { year: card.endDateYear, month: card.endDateMonth, day: card.endDateDay },
      ph: { en: card.phEn, es: card.phEs }
    };
    return experienceCard;
  })
  return newExperienceCards;
}
//PROJECTS
const mapSpringProjectsAndCards = (data: SpringProjectsAndCards) => {
  return {
    section: data.section,
    cards: mapSpringProjectsCards(data.cards)
  }
}
const mapSpringProjectsCards = (cards: SpringProjectsCard[]) => {
  const newProjectsCards = cards.map((card) => {
    const projectsCard = {
      id: card.id,
      vMp4Src: card.vmp4Src,
      vWebSrc: card.vwebSrc,
      startDate: { year: card.startDateYear, month: card.startDateMonth, day: card.startDateDay },
      endDate: { year: card.endDateYear, month: card.endDateMonth, day: card.endDateDay },
      h2: { en: card.h2En, es: card.h2Es },
      ph: { en: card.phEn, es: card.phEs },
      codeUrl: card.codeUrl,
      deployUrl: card.deployUrl
    };
    return projectsCard;
  })
  return newProjectsCards;
}
//SKILLS
const mapSpringSkillsAndCards = (data: SpringSkillsAndCards) => {
  return {
    section: data.section,
    cards: mapSpringSkillsCards(data.cards)
  }
}
const mapSpringSkillsCards = (cards: SpringSkillsCard[]) => {
  const newSkillsCards = cards.map((card) => {
    const skillsCard = {
      id: card.id,
      img: {
        src: card.imgSrc,
        alt: {
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
const mapSpringQPDAndCards = (data: SpringQPDAndCards) => {
  return {
    section: data.section,
    cards: mapSpringQPDCards(data.cards)
  }
}
const mapSpringQPDCards = (cards: SpringQPDCard[]) => {
  const newQPDCards = cards.map((card) => {
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
  mapToSpringHomeCard(card: any): SpringHomeCard {
    return {
      id: card.id,
      phEn: card.ph.en,
      phEs: card.ph.es
    }
  },
  //QPDCard
  mapToSpringQPDCard(card: any): SpringQPDCard {
    return {
      id: card.id,
      imgSrc: card.img.src,
      imgAltEn: card.img.alt.en,
      imgAltEs: card.img.alt.es,
      startDateYear: card.startDate.year,
      startDateMonth: card.startDate.month,
      startDateDay: card.startDate.day,
      endDateYear: card.endDate.year,
      endDateMonth: card.endDate.month,
      endDateDay: card.endDate.day,
      phEn: card.ph.en,
      phEs: card.ph.es,
      h2En: card.h2.en,
      h2Es: card.h2.es
    }
  },
  //ExperienceCard
  mapToSpringExperienceCard(card: any): SpringExperienceCard {
    return {
      id: card.id,
      imgSrc: card.img.src,
      imgAltEn: card.img.alt.en,
      imgAltEs: card.img.alt.es,
      startDateYear: card.startDate.year,
      startDateMonth: card.startDate.month,
      startDateDay: card.startDate.day,
      endDateYear: card.endDate.year,
      endDateMonth: card.endDate.month,
      endDateDay: card.endDate.day,
      phEn: card.ph.en,
      phEs: card.ph.es,
    }
  },
  mapToSpringProjectsCard(card: any): SpringProjectsCard {
    return {
      id: card.id,
      vmp4Src: card.vMp4Src,
      vwebSrc: card.vWebSrc,
      startDateYear: card.startDate.year,
      startDateMonth: card.startDate.month,
      startDateDay: card.startDate.day,
      endDateYear: card.endDate.year,
      endDateMonth: card.endDate.month,
      endDateDay: card.endDate.day,
      phEn: card.ph.en,
      phEs: card.ph.es,
      h2En: card.h2.en,
      h2Es: card.h2.es,
      codeUrl: card.codeUrl,
      deployUrl: card.deployUrl
    }
  },
  mapToSpringSkillsCard(card: any): SpringSkillsCard {
    return {
      id: card.id,
      imgSrc: card.img.src,
      imgAltEn: card.img.alt.en,
      imgAltEs: card.img.alt.es,
      value: card.value,
      bkColor: card.bkColor,
      outStrokeColor: card.outStrokeColor,
    }
  },
}
