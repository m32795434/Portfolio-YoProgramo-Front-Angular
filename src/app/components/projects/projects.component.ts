import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../services/login-service/login.service';
import { DataService } from '../../../services/data-service/data.service';
import { LanguageService } from 'src/services/language/language.service';
import { ProjectsAndCards, ProjectsCard } from 'src/interfaces/sections-interfaces';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  logged: Boolean | undefined = false;
  private loggedSubscription = new Subscription();
  private dataSubscription = new Subscription();
  private errorSubscription = new Subscription();
  //contains all
  sectionAndCards: any = {
    section: {
      id: "projects", en: "", es: "", imgMobile: null,
      imgDesktop: null,
    },
    cards: []
  };
  newCard: ProjectsCard = {
    id: "",
    vMp4Src: "",
    vWebSrc: "",
    startDate: {
      year: 2022,
      month: 6,
      day: 1
    },
    endDate: {
      year: 2023,
      month: 5,
      day: 31
    },
    h2: { en: "", es: "" },
    ph: { en: "", es: "" },
  }

  language = 'en';
  languageSubc = new Subscription();

  errorMessage = '';
  constructor(private loginService: LoginService, private dataService: DataService, private languageSrc: LanguageService) {
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((val) => {
      this.logged = val;
      console.log('logged at home?', this.logged);
    });

    this.dataSubscription = this.dataService.getProjectsAndCardsObserver().subscribe((sectionAndCards) => {
      this.sectionAndCards = sectionAndCards;
    })
    this.errorSubscription = this.dataService.getErrorObserver().subscribe((message) => { this.errorMessage = message })
    this.languageSubc = this.languageSrc.getLanguageObserver().subscribe((val) => {
      this.language = val;
    })
  }
  ngOnInit(): void {
    const content = this.dataService.localGetSectionAndCards('projects');
    if (content) {
      this.sectionAndCards = content;
    } else {
      this.dataService.getSectionAndCards('projects');
    }
    //checks if the user is logged when init
    this.logged = this.loginService.isLogged();
  }
  // UDPATE request
  saveH1(e: any) {
    const targetId = e.target.dataset.id;
    const innerHTML = document.querySelector(`#${targetId}`)?.innerHTML;
    this.sectionAndCards.section[this.language] = innerHTML;
    this.dataService.updateSectionInfo('projects', this.sectionAndCards.section);
  }
}
