import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../services/login-service/login.service';
import { DataService } from '../../../services/data-service/data.service';
import { Projects } from 'src/interfaces/sections-interfaces';

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
  section: any = { id: "projects", en: "", es: "" };
  lenguage = 'en';
  errorMessage = '';
  constructor(private loginService: LoginService, private dataService: DataService,) {
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((val) => {
      this.logged = val;
      console.log('logged at home?', this.logged);
    });

    this.dataSubscription = this.dataService.getProjectsDataObserver().subscribe((section) => {
      this.section = section;
    })
    this.errorSubscription = this.dataService.getErrorObserver().subscribe((message) => { this.errorMessage = message })
  }
  ngOnInit(): void {
    const content = this.dataService.getData('projects');
    if (content) {
      this.section = content;
    } else {
      this.dataService.getSectionFromJsonServer('projects');
    }
    //checks if the user is logged when init
    this.logged = this.loginService.isLogged();
  }
  saveH1(e: any) {
    const targetId = e.target.dataset.id;
    const innerHTML = document.querySelector(`#${targetId}`)?.innerHTML;
    this.section[this.lenguage] = innerHTML;
    this.dataService.updateSection('projects', this.section);
  }
}
