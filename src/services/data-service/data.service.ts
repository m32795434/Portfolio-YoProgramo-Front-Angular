import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Home, Experience, QPD, Projects, Sections } from 'src/interfaces/sections-interfaces';
import { JsonServerRequestsService } from '../json-server-requests/json-server-requests-service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private homeDataSubject = new Subject<any>();
  private experienceDataSubject = new Subject<any>();
  private qPDDataSubject = new Subject<any>();
  private projectsDataSubject = new Subject<any>();
  private errorSubject = new Subject<any>();
  protected data: Sections = {
    home: { id: "home", imgMobile: "", imgDesktop: "", en: "", es: "", slides: [] },
    experience: { id: "experience", imgMobile: "", imgDesktop: "", en: "", es: "", slides: [] },
    qPD: { id: "qPD", imgMobile: "", imgDesktop: "", en: "", es: "", slides: [] },
    projects: { id: "projects", en: "", es: "" }
  };
  constructor(private JsonServer: JsonServerRequestsService) { }

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
  }

  getErrorObserver() {
    return this.errorSubject.asObservable();
  }
  getSectionFromJsonServer(section: "home" | "project" | "qPD" | "experience") {
    this.JsonServer.getSection(section).subscribe({
      next: (content: Home | Experience | QPD | Projects) => {
        switch (content.id) {
          case "home":
            this.data[content.id] = content;
            this.homeDataSubject.next(this.data[content.id]);
            break;
          case "experience":
            this.data[content.id] = content;
            this.experienceDataSubject.next(this.data[content.id]);
            break;
          case "projects":
            this.data[content.id] = content;
            this.projectsDataSubject.next(this.data[content.id]);
            break;
          case "qPD":
            this.data[content.id] = content;
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
    });
  }

  getData(arg: "home" | "project" | "qPD" | "experience"): Home | Experience | QPD | Projects | undefined {
    switch (arg) {
      case "home":
        console.log('geting home from service:', this.data[arg]);
        if (this.data != undefined) return this.data[arg];
        break;
      case "experience":
        console.log('geting data from service:', this.data[arg]);
        if (this.data != undefined) return this.data[arg];
        break;
      case "projects":
        console.log('geting data from service:', this.data[arg]);
        if (this.data != undefined) return this.data[arg];
        break;
      case "qPD":
        console.log('geting data from service:', this.data[arg]);
        if (this.data != undefined) return this.data[arg];
        break;
      default:
        break;
    }
    console.log('seccione cargada exitosamente:...', this.data[content.id]);
  }

}


}
