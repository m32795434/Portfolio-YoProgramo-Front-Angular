import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HomeAndCards, ExperienceAndCards, QPDAndCards, ProjectsAndCards, AllSectionsAndCards, SectionAndCards, StringSection, SkillsAndCards, SectionInfo, ExperienceCard, SectionCard, ABM } from 'src/interfaces/sections-interfaces';
import { Conexion } from 'src/interfaces/Conexion';
import { SpringServerService } from '../spring-server/spring-server.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  //SUBJECTS
  private homeAndCardsSubject = new Subject<HomeAndCards>();
  private experienceAndCardsSubject = new Subject<ExperienceAndCards>();
  private qPDAndCardsSubject = new Subject<QPDAndCards>();
  private projectsAndCardsSubject = new Subject<ProjectsAndCards>();
  private skillsAndCardsSubject = new Subject<SkillsAndCards>();

  private errorSubject = new Subject<any>();
  //convert this into an array. 
  protected data: any = {
    home: { section: { id: "home", imgMobile: "", imgDesktop: "", en: "", es: "" }, cards: [], },
    experience: { section: { id: "experience", imgMobile: "", imgDesktop: "", en: "", es: "" }, cards: [], },
    qPD: { section: { id: "qPD", imgMobile: "", imgDesktop: "", en: "", es: "" }, cards: [], },
    projects: { section: { id: "projects", imgMobile: null, imgDesktop: null, en: "", es: "" }, cards: [], },
    skills: { section: { id: "skills", imgMobile: "", imgDesktop: "", en: "", es: "" }, cards: [], }
  };
  //  = new DataAccess(new JsonServerService(HttpClient))
  private conexion: Conexion;
  public constructor(private dataAccess: SpringServerService) {
    this.conexion = this.dataAccess;
  }

  //GET OBSERVERS
  getHomeAndCardsObserver(): Observable<HomeAndCards> {
    return this.homeAndCardsSubject.asObservable();
  }
  getExperienceAndCardsObserver(): Observable<ExperienceAndCards> {
    return this.experienceAndCardsSubject.asObservable();
  }
  getQPDAndCardsObserver(): Observable<QPDAndCards> {
    return this.qPDAndCardsSubject.asObservable();
  }
  getProjectsAndCardsObserver(): Observable<ProjectsAndCards> {
    return this.projectsAndCardsSubject.asObservable();
  } getSkillsAndCardsObserver(): Observable<SkillsAndCards> {
    return this.skillsAndCardsSubject.asObservable();
  }


  getErrorObserver() {
    return this.errorSubject.asObservable();
  }
  //REQUESTS
  switchSubscribeSectionAndCards(): any {
    const subscribeSectionObject = {
      next: (content: SectionAndCards) => {
        switch (content.section.id) {
          case "home":
            this.data.home = content;
            this.homeAndCardsSubject.next(this.data.home);
            break;
          case "experience":
            this.data.experience = content;
            this.experienceAndCardsSubject.next(this.data.experience);
            break;
          case "projects":
            this.data.projects = content;
            this.projectsAndCardsSubject.next(this.data.projects);
            break;
          case "qPD":
            this.data.qPD = content;
            this.qPDAndCardsSubject.next(this.data.qPD);
            break;
          case "skills":
            this.data.skills = content;
            this.skillsAndCardsSubject.next(this.data.skills);
            break;
          default:
            break;
        }
        console.log('seccione cargada exitosamente:...', this.data[content.section.id]);
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
  switchSubscribeSectionInfo(section: StringSection, obj: SectionInfo): any {
    const subscribeSectionObject = {
      next: () => {
        switch (section) {
          case "home":
            this.data.home.section = obj;
            this.homeAndCardsSubject.next(this.data.home);
            break;
          case "experience":
            this.data.experience.section = obj;
            this.experienceAndCardsSubject.next(this.data.experience);
            break;
          case "projects":
            this.data.projects.section = obj;
            this.projectsAndCardsSubject.next(this.data.projects);
            break;
          case "qPD":
            this.data.qPD.section = obj;
            this.qPDAndCardsSubject.next(this.data.qPD);
            break;
          case "skills":
            this.data.skills.section = obj;
            this.skillsAndCardsSubject.next(this.data.skills);
            break;
          default:
            break;
        }
        console.log('seccón actualizada exitosamente:...', this.data[section]);
      },
      error: (error: Error) => {
        console.error('Error al actualizar la info de la sección', error);
        this.errorSubject.next(error.message)
      }
    }
    return subscribeSectionObject;
  }

  switchSubscribeABMCard(section: StringSection, obj: SectionCard, abm: ABM): any {
    const subscribeSectionObject = {
      next: () => {
        switch (abm) {
          case "create":
            switch (section) {
              case "home":
                this.data.home.section = obj;
                this.homeAndCardsSubject.next(this.data.home);
                break;
              case "experience":
                this.data.experience.section = obj;
                this.experienceAndCardsSubject.next(this.data.experience);
                break;
              case "projects":
                this.data.projects.section = obj;
                this.projectsAndCardsSubject.next(this.data.projects);
                break;
              case "qPD":
                this.data.qPD.section = obj;
                this.qPDAndCardsSubject.next(this.data.qPD);
                break;
              case "skills":
                this.data.skills.section = obj;
                this.skillsAndCardsSubject.next(this.data.skills);
                break;
              default:
                break;
            }
            break;
          case "delete":
            switch (section) {
              case "home":
                this.data.home.section = obj;
                this.homeAndCardsSubject.next(this.data.home);
                break;
              case "experience":
                this.data.experience.section = obj;
                this.experienceAndCardsSubject.next(this.data.experience);
                break;
              case "projects":
                this.data.projects.section = obj;
                this.projectsAndCardsSubject.next(this.data.projects);
                break;
              case "qPD":
                this.data.qPD.section = obj;
                this.qPDAndCardsSubject.next(this.data.qPD);
                break;
              case "skills":
                this.data.skills.section = obj;
                this.skillsAndCardsSubject.next(this.data.skills);
                break;
              default:
                break;
            }
            break;
          case "udpdate":
            switch (section) {
              case "home":
                this.data.home.section = obj;
                this.homeAndCardsSubject.next(this.data.home);
                break;
              case "experience":
                this.data.experience.section = obj;
                this.experienceAndCardsSubject.next(this.data.experience);
                break;
              case "projects":
                this.data.projects.section = obj;
                this.projectsAndCardsSubject.next(this.data.projects);
                break;
              case "qPD":
                this.data.qPD.section = obj;
                this.qPDAndCardsSubject.next(this.data.qPD);
                break;
              case "skills":
                this.data.skills.section = obj;
                this.skillsAndCardsSubject.next(this.data.skills);
                break;
              default:
                break;
            }
            break;
          default:
            break;
        }
        console.log(`successfully ${abm}d: `, obj.id, ' card');
      },
      error: (error: Error) => {
        console.error(`An Error occurred while trying to ${abm}`, error);
        this.errorSubject.next(error.message)
      }
    }
    return subscribeSectionObject;
  }

  //CHECK THE CONTENT LOCALLY. IT RUNS WHEN YOU ENTER A SECTION. IF IT'S NOT A "REFRESH", 
  // THE CONTENT COULD BE HERE, AND YOU CAN SAVE YOURSELF AN HTTP REQUEST

  localGetSectionAndCards(arg: StringSection): SectionAndCards | undefined {
    if (this.data[arg].section.en != "") {
      console.log(`geting ${arg} from service:`, this.data[arg]);
      return this.data[arg];
    }
    return undefined;
  }

  //-------------------------------TO SERVER - HTTP REQUESTS--------------------------------

  getSectionAndCards(section: StringSection) {
    this.conexion.getSectionAndCards(section)?.subscribe(this.switchSubscribeSectionAndCards());
  }
  //for put and others, I will proceed to update the "data" obj when the request is successful
  //updateSectionAndCards WILL BE DEPRECATED
  updateSectionAndCards(section: StringSection, obj: SectionAndCards) {
    this.conexion.updateSectionAndCards(section, obj)?.subscribe((this.switchSubscribeSectionAndCards()))
  }
  updateSectionInfo(section: StringSection, obj: SectionInfo) {
    this.conexion.updateSectionInfo(section, obj)?.subscribe(this.switchSubscribeSectionInfo(section, obj));
  }
  aBMCard(sec: StringSection, obj: SectionCard, abm: ABM) {
    this.conexion.aBMCard(sec, obj, abm)?.subscribe(this.switchSubscribeABMCard(sec, obj, abm));
  }
}