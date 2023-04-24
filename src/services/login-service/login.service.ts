import { Injectable, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { Conexion } from 'src/interfaces/Conexion';
import { SpringServerService } from '../spring-server/spring-server.service';
import { AuthObj, User, UserLevels } from 'src/interfaces/sections-interfaces';
// import { editableElements, editButtons, loginButton } from 'src/app/libraries/elements';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedSubject = new Subject<any>();
  private idSubject = new Subject<number>();
  modalRef?: NgbModalRef;
  private conexion: Conexion;
  private logged: AuthObj = {
    id: 0,
    auth: false,
    level: ""
  };

  constructor(private modalService: NgbModal, private dataAccess: SpringServerService) {
    this.conexion = this.dataAccess;
  }

  getloggedObserver(): Observable<AuthObj> {
    return this.loggedSubject.asObservable();
  }
  getIdObserver(): Observable<number> {
    return this.idSubject.asObservable();
  }
  isLogged(): any {
    let logged: any = localStorage.getItem('logged')
    if (logged != null) {
      logged = JSON.parse(logged);
      this.logged = logged;
      console.log('refreshed....logged?:', this.logged.auth);
      return this.logged;
    }
    return this.logged;
  }

  managelogin(content: TemplateRef<any>) {
    if (this.logged.auth) {
      // LOGOUT
      console.log('logged?', this.logged.auth);
      console.log('login out...');
      this.logged = { auth: false, level: "", id: 0 }
      this.shouldEnableContentEditable(this.logged);
    } else {
      // LOGIN
      console.log('logged?', this.logged.auth);
      this.createForm(content);
      console.log('form created');
    }
  }
  createForm(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'loginModal',
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: true,
      windowClass: 'cdk-drag'
    });
    this.modalRef.result.then(
      (result) => {
        console.log(`Closed with: ${result}`)
      },
      (reason) => {
        console.log(`Dismissed ${this.getDismissReason(reason)}`)
      },
    );
    Array.from(document.querySelectorAll('.modal-body input')).forEach((el) => {
      el.addEventListener('mousedown', (e: Event) => {
        e.stopPropagation();
      });
      el.addEventListener('touchstart', (e: Event) => {
        e.stopPropagation();
      });
    })
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  shouldEnableContentEditable(logged: AuthObj) {
    if (logged.auth) {
      localStorage.setItem('logged', JSON.stringify(logged));
      // this.logged.auth = true;
      this.loggedSubject.next(this.logged);
      console.log('contentEditable enabled');
    } else {
      localStorage.setItem('logged', JSON.stringify(logged));
      // this.logged = false;
      this.loggedSubject.next(this.logged);
      console.log('contentEditable disabled');
    }
  }
  checkAuth(user: string, pass: string, id: number, level: UserLevels) {
    const userToCheck: User = {
      id: id, userName: user, userPass: pass, level: level,
    }
    console.log('userToCheck:', userToCheck);
    this.conexion.checkAuth(userToCheck)?.subscribe((res) => {
      if (res) {
        console.log('res:...', res)
        this.logged.auth = res;
        this.logged.level = level;
        this.logged.id = id;
        this.shouldEnableContentEditable(this.logged)//true
      } else {
        this.shouldEnableContentEditable(this.logged)//false
      }

    })
  }
}
