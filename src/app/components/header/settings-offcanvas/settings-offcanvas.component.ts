import { Component, TemplateRef, OnInit } from '@angular/core';
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Conexion } from 'src/interfaces/Conexion';
import { UserLevels } from 'src/interfaces/sections-interfaces';
import { UpdateUserAndPassObj } from 'src/interfaces/spring-interfaces';
import { LanguageService } from 'src/services/language/language.service';
import { LoginService } from 'src/services/login-service/login.service';
import { SpringServerService } from 'src/services/spring-server/spring-server.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings-offcanvas',
  templateUrl: './settings-offcanvas.component.html',
  styleUrls: ['./settings-offcanvas.component.scss']
})
export class SettingsOffcanvasComponent implements OnInit {
  closeResult = '';
  language = "en"
  private loggedSubscription = new Subscription();

  logged: Boolean | undefined = false;
  level: UserLevels = "";
  private conexion: Conexion;
  // languageSubsc = new Subscription();

  constructor(private offcanvasService: NgbOffcanvas, private languageSrv: LanguageService, private loginService: LoginService, private dataAccess: SpringServerService) {
    this.conexion = this.dataAccess;
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((AuthObj) => {
      this.logged = AuthObj.auth;
      this.level = AuthObj.level
    });
  }

  setLanguage(e: any) {
    const val = e.target.value;
    this.language = val;
    this.languageSrv.setLanguage(this.language);
  }
  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title', position: 'end' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  saveUser(e: any) {
    const tempUser: UpdateUserAndPassObj = {
      id: parseInt(e.target.id.value),
      userPass: e.target.userPass.value,
      userName: e.target.userName.value
    }
    this.conexion.saveUser(tempUser)?.subscribe((res) => { console.log('user data update!', res) })
  }
  private getDismissReason(reason: any): string {
    if (reason === OffcanvasDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on the backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit(): void {
    const authObj = this.loginService.isLogged();
    this.logged = authObj.auth;
    this.level = authObj.level;
  }
}
