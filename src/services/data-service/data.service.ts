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
  //to debuggin: AllSectionsAndCards || any
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
        console.log('seccione cargada exitosamente en DataService:...', this.data[content.section.id]);
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

  switchSubscribeABMCard(section: StringSection, obj: SectionCard, abm: ABM, i: number): any {
    const subscribeSectionObject = {
      next: () => {
        if (abm === "create" || abm === "udpdate") {
          switch (section) {
            case "home":
              this.data.home.cards[i] = obj;
              this.homeAndCardsSubject.next(this.data.home);
              break;
            case "experience":
              this.data.experience.cards[i] = obj;
              this.experienceAndCardsSubject.next(this.data.experience);
              break;
            case "projects":
              this.data.projects.cards[i] = obj;
              this.projectsAndCardsSubject.next(this.data.projects);
              break;
            case "qPD":
              this.data.qPD.cards[i] = obj;
              this.qPDAndCardsSubject.next(this.data.qPD);
              break;
            case "skills":
              this.data.skills.cards[i] = obj;
              this.skillsAndCardsSubject.next(this.data.skills);
              break;
            default:
              break;
          }
        } else {
          //DELETE!
          switch (section) {
            case "home":
              // this.data.home.cards.splice(i, 1);
              const homeCards = deleteAndReassingIds(this.data.home.cards, i)
              this.data.home.cards = homeCards;
              this.homeAndCardsSubject.next(this.data.home);
              break;
            case "experience":
              const experienceCards = deleteAndReassingIds(this.data.experience.cards, i)
              this.data.experience.cards = experienceCards;
              this.experienceAndCardsSubject.next(this.data.experience);
              break;
            case "projects":
              const projectsCards = deleteAndReassingIds(this.data.projects.cards, i)
              this.data.projects.cards = projectsCards;
              this.projectsAndCardsSubject.next(this.data.projects);
              break;
            case "qPD":
              const qPDCards = deleteAndReassingIds(this.data.qPD.cards, i)
              this.data.qPD.cards = qPDCards;
              this.qPDAndCardsSubject.next(this.data.qPD);
              break;
            case "skills":
              const skillsCards = deleteAndReassingIds(this.data.skills.cards, i)
              this.data.skills.cards = skillsCards;
              this.skillsAndCardsSubject.next(this.data.skills);
              break;
            default:
              break;
          }
        }
        console.log(`successfully ${abm}d: `, ' card ', obj.id);
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

  localGetSectionAndCards(arg: StringSection): boolean {
    if (this.data[arg].section.en != "") {
      console.log(`geting ${arg} from DataService:`, this.data[arg]);
      switch (arg) {
        case "home":
          this.homeAndCardsSubject.next(this.data.home);
          break;
        case "experience":
          this.experienceAndCardsSubject.next(this.data.experience);
          break;
        case "projects":
          this.projectsAndCardsSubject.next(this.data.projects);
          break;
        case "qPD":
          this.qPDAndCardsSubject.next(this.data.qPD);
          break;
        case "skills":
          this.skillsAndCardsSubject.next(this.data.skills);
          break;
        default:
          break;
      }
      return true;
    }
    return false
  }

  switchSubscribeSortCards(sec: StringSection, arr: SectionCard[]) {
    const subscribeObj = {
      next: () => {
        switch (sec) {
          case "home":
            this.data.home.cards = arr;
            this.homeAndCardsSubject.next(this.data.home);
            break;
          case "experience":
            this.data.experience.cards = arr;
            this.experienceAndCardsSubject.next(this.data.experience);
            break;
          case "projects":
            this.data.projects.cards = arr;
            this.projectsAndCardsSubject.next(this.data.projects);
            break;
          case "qPD":
            this.data.qPD.cards = arr;
            this.qPDAndCardsSubject.next(this.data.qPD);
            break;
          case "skills":
            this.data.skills.cards = arr;
            this.skillsAndCardsSubject.next(this.data.skills);
            break;
          default:
            break;
        }
        console.log(`${sec} Cards sorted!`)
      },
      error: (error: Error) => {
        console.error(`An Error occurred while trying to sort the cards`, error);
        this.errorSubject.next(error.message)
      }
    }
    return subscribeObj;
  }

  //-------------------------------TO SERVER - HTTP REQUESTS--------------------------------

  getSectionAndCards(section: StringSection) {
    this.conexion.getSectionAndCards(section)?.subscribe(this.switchSubscribeSectionAndCards());
  }
  //for put and others, I will proceed to update the "data" obj when the request is successful

  updateSectionInfo(section: StringSection, obj: SectionInfo) {
    this.conexion.updateSectionInfo(section, obj)?.subscribe(this.switchSubscribeSectionInfo(section, obj));
  }
  aBMCard(sec: StringSection, obj: SectionCard, abm: ABM, i: number) {
    this.conexion.aBMCard(sec, obj, abm, i)?.subscribe(this.switchSubscribeABMCard(sec, obj, abm, i));
  }
  sortCards(sec: StringSection, arr: SectionCard[]) {
    this.conexion.sortCards(sec, arr).subscribe(this.switchSubscribeSortCards(sec, arr));
  }
}
function deleteAndReassingIds(arr: any, i: number) {
  const tempArray = arr.toSpliced(i, 1);
  tempArray.forEach((element: any, i: number) => {
    element.id = i + 1;
  });
  return tempArray;
}