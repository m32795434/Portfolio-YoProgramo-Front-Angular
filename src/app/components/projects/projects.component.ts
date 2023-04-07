import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../services/login-service/login.service';
import { DataService } from '../../../services/data-service/data.service';
import { LanguageService } from 'src/services/language/language.service';

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
  sectionAndCards: any = { id: "projects", en: "", es: "" };
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
  saveH1(e: any) {
    const targetId = e.target.dataset.id;
    const innerHTML = document.querySelector(`#${targetId}`)?.innerHTML;
    this.sectionAndCards[this.language] = innerHTML;
    this.dataService.updateSectionAndCards('projects', this.sectionAndCards);
  }
}
