import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Home, Experience, QPD, Projects, Sections, Section, StringSection, Skills } from 'src/interfaces/sections-interfaces';
import { JsonServerRequestsService } from '../json-server-requests/json-server-requests-service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  //SUBJECTS
  private homeDataSubject = new Subject<any>();
  private experienceDataSubject = new Subject<any>();
  private qPDDataSubject = new Subject<any>();
  private projectsDataSubject = new Subject<any>();
  private skillsDataSubject = new Subject<any>();

  private errorSubject = new Subject<any>();

  protected data: Sections = {
    home: { id: "home", imgMobile: "", imgDesktop: "", en: "", es: "", cards: [] },
    experience: { id: "experience", imgMobile: "", imgDesktop: "", en: "", es: "", cards: [] },
    qPD: { id: "qPD", imgMobile: "", imgDesktop: "", en: "", es: "", cards: [] },
    projects: { id: "projects", en: "", es: "" },
    skills: { id: "skills", imgMobile: "", imgDesktop: "", en: "", es: "", cards: [] }
  };
  constructor(private JsonServer: JsonServerRequestsService) { }

  //GET OBSERVERS
  getHomeDataObserver() {
    return this.homeDataSubject.asObservable();
  }
  getExperienceDataObserver() {
    return this.experienceDataSubject.asObservable();
  }
  getQPDDataObserver() {
    return this.qPDDataSubject.asObservable();
  }
  getProjectsDataObserver() {
    return this.projectsDataSubject.asObservable();
  } getSkillsDataObserver() {
    return this.skillsDataSubject.asObservable();
  }


  getErrorObserver() {
    return this.errorSubject.asObservable();
  }
  //REQUESTS
  subscribeSectionObjectFunct(): any {
    const subscribeSectionObject = {
      next: (content: Home | Experience | QPD | Projects | Skills) => {
        switch (content.id) {
          case "home":
            this.data['home'] = content;
            this.homeDataSubject.next(this.data[content.id]);
            break;
          case "experience":
            this.data['experience'] = content;
            this.experienceDataSubject.next(this.data[content.id]);
            break;
          case "projects":
            this.data['projects'] = content;
            this.projectsDataSubject.next(this.data[content.id]);
            break;
          case "qPD":
            this.data['qPD'] = content;
            this.qPDDataSubject.next(this.data[content.id]);
            break;
          case "skills":
            this.data['skills'] = content;
            this.qPDDataSubject.next(this.data[content.id]);
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

  getSectionFromJsonServer(section: StringSection) {
    this.JsonServer.getSection(section).subscribe(this.subscribeSectionObjectFunct());
  }

  getData(arg: StringSection): Section | undefined {
    if (this.data[arg].en != "") {
      console.log(`geting ${arg} from service:`, this.data[arg]);
      return this.data[arg];
    }
    return undefined;
  }
  updateSection(section: StringSection, obj: Section) {
    this.JsonServer.updateSection(section, obj).subscribe(this.subscribeSectionObjectFunct())
  }

}