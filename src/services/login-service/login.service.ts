import { Injectable, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { Conexion } from 'src/interfaces/Conexion';
import { SpringServerService } from '../spring-server/spring-server.service';
import { Accs_Token, AuthObj, User, UserLevels } from 'src/interfaces/sections-interfaces';
import jwt_decode from "jwt-decode";
// import { editableElements, editButtons, loginButton } from 'src/app/libraries/elements';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedSubject = new Subject<any>();
  // private authSubject = new Subject<AuthObj>();
  private idSubject = new Subject<number>();
  modalRef?: NgbModalRef;
  private conexion: Conexion;
  private logged: UserLevels = "";

  constructor(private modalService: NgbModal, private dataAccess: SpringServerService) {
    this.conexion = this.dataAccess;
  }
  // getAuthObserver(): Observable<AuthObj> {
  //   return this.authSubject.asObservable();
  // }
  getloggedObserver(): Observable<UserLevels> {
    return this.loggedSubject.asObservable();
  }
  getIdObserver(): Observable<number> {
    return this.idSubject.asObservable();
  }
  isLogged(): UserLevels {
    let authObjt: any = localStorage.getItem('authObjt');
    if (authObjt != null) {
      authObjt = JSON.parse(authObjt);
      const access: Accs_Token = jwt_decode(authObjt.access_token);
      this.logged = access.role;
      console.log('refreshed....any role?:', this.logged);
      return this.logged;
    }
    return this.logged;
  }

  managelogin(content: TemplateRef<any>) {
    if (this.logged) {
      // LOGOUT
      console.log('role logged?', this.logged);
      console.log('login out...');
      this.logged = "";
      this.shouldEnableContentEditable(false);
    } else {
      // LOGIN
      console.log('role logged?', this.logged);
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

  shouldEnableContentEditable(bool: boolean, res?: AuthObj) {
    let decode: Accs_Token = {
      sub: "", role: "", iat: 0, exp: 0
    };
    if (bool) {
      if (res) {
        decode = jwt_decode(res?.access_token);
      }
      localStorage.setItem('authObjt', JSON.stringify(res));
      // this.logged.auth = true;
      this.loggedSubject.next(this.logged);
      console.log('contentEditable enabled');
    } else {
      localStorage.setItem('authObjt', JSON.stringify(res));
      // this.logged = false;
      this.loggedSubject.next(this.logged);
      console.log('contentEditable disabled');
    }
  }
  checkAuth(user: string, pass: string) {
    const userToCheck: User = {
      email: user, password: pass
    }
    console.log('userToCheck:', userToCheck);
    this.conexion.checkAuth(userToCheck)?.subscribe({
      next: res => {
        this.conexion.setAuthObj(res);
        console.log('sending tokens to sring server!:', res)
        const decoded: Accs_Token = jwt_decode(res.access_token)
        this.logged = decoded.role;
        this.shouldEnableContentEditable(true, res)//true
        console.log('role:...', decoded.role, 'Authobjt: ', res, 'this.logged: ', this.logged)
      },
      error: err => {
        this.shouldEnableContentEditable(false)//false
        console.error(err)
      }
    })
  }
}