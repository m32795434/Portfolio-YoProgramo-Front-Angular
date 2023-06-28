import { Component, TemplateRef, OnInit } from '@angular/core';
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Conexion } from 'src/interfaces/Conexion';
import { PassObj, UserLevels } from 'src/interfaces/sections-interfaces';
import { LanguageService } from 'src/services/language/language.service';
import { LoginService } from 'src/services/login-service/login.service';
import { SpringServerService } from 'src/services/spring-server/spring-server.service';
import { Subscription } from 'rxjs';
import { wait } from 'src/app/libraries/utils';

@Component({
  selector: 'app-settings-offcanvas',
  templateUrl: './settings-offcanvas.component.html',
  // styleUrls: ['./settings-offcanvas.component.scss']
})
export class SettingsOffcanvasComponent implements OnInit {
  protected closeResult = '';
  protected language = "en"
  private loggedSubscription = new Subscription();
  private languageSubc = new Subscription();

  // tempId = 0;
  protected logged: UserLevels = "";
  protected updated = false;
  private conexion: Conexion;

  constructor(private offcanvasService: NgbOffcanvas, private languageSrv: LanguageService, private loginService: LoginService, private dataAccess: SpringServerService) {
    this.conexion = this.dataAccess;
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((role) => {
      this.logged = role;
    });
    this.languageSubc = this.languageSrv.getLanguageObserver().subscribe((val) => {
      this.language = val;
    })
  }

  setLanguage(e: any) {
    this.languageSrv.setLanguage(e.target.value);

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
  async saveUser(e: any) {
    const t = e.target;
    // if (t.id.value != this.tempId) {
    //   this.language == "en" ? alert('Wrong id!') : alert('Id equivocado!')
    //   return;
    // }
    if (t.userPass.value != t.userPass2.value) {
      this.language == "en" ? alert('Passwords doesn\'t match!') : alert('Las claves no coinciden!')
      return;
    }
    // if (t.userName.value != t.userName2.value) {
    //   this.language == "en" ? alert('Username doesn\'t match!') : alert('El nombre de usuario no coincide!')
    //   return;
    // }
    const passObj: PassObj = {
      password: e.target.userPass.value,
    }
    this.conexion.saveUser(passObj)?.subscribe((res) => {
      this.updated = true;
    })
    t.reset();
    await wait(3000)
    this.updated = false;
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
    // this.loginService.isLogged();
    // this.logged = logged;
  }
}
