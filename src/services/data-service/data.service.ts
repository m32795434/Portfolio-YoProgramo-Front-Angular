import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HomeAndCards, ExperienceAndCards, QPDAndCards, ProjectsAndCards, AllSectionsAndCards, SectionAndCards, StringSection, SkillsAndCards } from 'src/interfaces/sections-interfaces';
import { JsonServerService } from '../json-server/json-server.service';
import { Conexion } from 'src/interfaces/Conexion';
import { SpringServerService } from '../spring-server/spring-server.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  //SUBJECTS
  private homeAndCardsSubject = new Subject<any>();
  private experienceAndCardsSubject = new Subject<any>();
  private qPDAndCardsSubject = new Subject<any>();
  private projectsAndCardsSubject = new Subject<any>();
  private skillsAndCardsSubject = new Subject<any>();

  private errorSubject = new Subject<any>();

  protected data: AllSectionsAndCards = {
    home: { id: "home", imgMobile: "", imgDesktop: "", en: "", es: "", cards: [] },
    experience: { id: "experience", imgMobile: "", imgDesktop: "", en: "", es: "", cards: [] },
    qPD: { id: "qPD", imgMobile: "", imgDesktop: "", en: "", es: "", cards: [] },
    projects: {
      id: "projects", imgMobile: null, imgDesktop: null, en: "", es: "", cards: []
    },
    skills: { id: "skills", imgMobile: "", imgDesktop: "", en: "", es: "", cards: [] }
  };
  //  = new DataAccess(new JsonServerService(HttpClient))
  private conexion: Conexion;
  public constructor(private dataAccess: SpringServerService) {
    this.conexion = this.dataAccess;
  }

  //GET OBSERVERS
  getHomeAndCardsObserver() {
    return this.homeAndCardsSubject.asObservable();
  }
  getExperienceAndCardsObserver() {
    return this.experienceAndCardsSubject.asObservable();
  }
  getQPDAndCardsObserver() {
    return this.qPDAndCardsSubject.asObservable();
  }
  getProjectsAndCardsObserver() {
    return this.projectsAndCardsSubject.asObservable();
  } getSkillsAndCardsObserver() {
    return this.skillsAndCardsSubject.asObservable();
  }


  getErrorObserver() {
    return this.errorSubject.asObservable();
  }
  //REQUESTS
  switchSubscribeSectionAndCards(): any {
    const subscribeSectionObject = {
      next: (content: HomeAndCards | ExperienceAndCards | QPDAndCards | ProjectsAndCards | SkillsAndCards) => {
        switch (content.id) {
          case "home":
            this.data['home'] = content;
            this.homeAndCardsSubject.next(this.data[content.id]);
            break;
          case "experience":
            this.data['experience'] = content;
            this.experienceAndCardsSubject.next(this.data[content.id]);
            break;
          case "projects":
            this.data['projects'] = content;
            this.projectsAndCardsSubject.next(this.data[content.id]);
            break;
          case "qPD":
            this.data['qPD'] = content;
            this.qPDAndCardsSubject.next(this.data[content.id]);
            break;
          case "skills":
            this.data['skills'] = content;
            this.skillsAndCardsSubject.next(this.data[content.id]);
            break;
          default:
            break;
        }
        console.log('seccione cargada exitosamente:...', this.data[content.id]);
      },
      error: (error: Error) => {
        console.error('Error al cargar la seccion', error);
        this.errorSubject.next(error.message)
      },
      complete: () => {
        console.log('Subscription completed');
      }
    }
    return subscribeSectionObject;
  }

  localGetSectionAndCards(arg: StringSection): SectionAndCards | undefined {
    //RETURN THIS TO: this.data[arg].en != ""
    if (this.data[arg].en != "") {
      console.log(`geting ${arg} from service:`, this.data[arg]);
      return this.data[arg];
    }
    return undefined;
  }

  //TO SERVER
  getSectionAndCards(section: StringSection) {
    this.conexion.getSectionAndCards(section)?.subscribe(this.switchSubscribeSectionAndCards());
  }
  //for put and others, I will proceed to update the "data" obj when the request is successful
  //updateSectionAndCards WILL BE DEPRECATED
  updateSectionAndCards(section: StringSection, obj: SectionAndCards) {
    this.conexion.updateSectionAndCards(section, obj)?.subscribe((this.switchSubscribeSectionAndCards()))
  }

}