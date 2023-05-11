import { Injectable, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, Subscription } from 'rxjs';
import { Conexion } from 'src/interfaces/Conexion';
import { SpringServerService } from '../spring-server/spring-server.service';
import { Accs_Token, AuthObj, User, UserLevels } from 'src/interfaces/sections-interfaces';
import jwt_decode from "jwt-decode";
import { Ref_Token } from 'src/interfaces/sections-interfaces';
// import { editableElements, editButtons, loginButton } from 'src/app/libraries/elements';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedSubject = new Subject<any>();
  private idSubject = new Subject<number>();
  modalRef?: NgbModalRef;
  private conexion: Conexion;
  private logged: UserLevels = "";

  constructor(private modalService: NgbModal, private dataAccess: SpringServerService) {
    this.conexion = this.dataAccess;
  }

  getloggedObserver(): Observable<UserLevels> {
    return this.loggedSubject.asObservable();
  }
  getIdObserver(): Observable<number> {
    return this.idSubject.asObservable();
  }


  isLogged(): void {
    let authObjt: any = localStorage.getItem('authObjt');
    if (authObjt != null && authObjt != "undefined") {
      authObjt = JSON.parse(authObjt);
      //bring me the tokens but first!tokens are valid?
      const refreshT: Ref_Token = jwt_decode(authObjt.refresh_token);
      const accessT: Accs_Token = jwt_decode(authObjt.access_token);
      console.log('accessT:  ', accessT);
      console.log('refreshT: ', refreshT);
      const now = new Date().getTime();
      const accessTExpTime = accessT.exp * 1000;
      const refreshTExpTime = refreshT.exp * 1000;

      if (accessTExpTime >= now) {
        console.log('access token exp time: OK. VAlidate until: ', new Date());
        this.conexion.setAuthObj(authObjt);
        this.shouldEnableContentEditable(true, authObjt) // enable content to edit, and store the tokens in the LS.
      } else {
        console.log('access token: Expired')

        if (refreshTExpTime >= now) {
          console.log('refresh token exp time: OK, refreshing access token!')
          authObjt.access_token = "";
          this.conexion.setAuthObj(authObjt)
          this.conexion.refreshToken().subscribe(this.respAuthObject);
        } else {
          this.shouldEnableContentEditable(false);
          console.log('refresh token EXPIRED, please sign in again!')
          const logginButton: any = document.querySelector('#logginButton');
          logginButton.click();
        }
      }
    }
  }


  managelogin(content: TemplateRef<any>) {
    if (this.logged) {
      // LOGOUT
      console.log('role logged?', this.logged);
      console.log('login out...');
      this.conexion.logout().subscribe({
        next(value) {
          console.log('tokens setted to "Expired"!')
        }, error(err) {
          console.error(err)
        },
      })
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
    if (bool) {
      if (res) {
        localStorage.setItem('authObjt', JSON.stringify(res));
        const decoded: Accs_Token = jwt_decode(res.access_token)
        this.logged = decoded.role; //set here the role for everyone who needs
        this.loggedSubject.next(this.logged);// send the role to everyone who needs
        console.log('contentEditable enabled');
      }
    } else {
      this.logged = "";
      this.loggedSubject.next(this.logged);
      localStorage.setItem('authObjt', JSON.stringify(undefined));
      console.log('contentEditable disabled');
    }
  }

  checkAuth(user: string, pass: string) {
    const userToCheck: User = {
      email: user, password: pass
    }
    console.log('userToCheck:', userToCheck);
    this.conexion.checkAuth(userToCheck)?.subscribe(this.respAuthObject)
  }
  private respAuthObject = {
    next: (res: AuthObj) => {
      //-----------------------------------------------------------------------------------------------------------AQUI
      //refresh tokens> 7 days of validate. When we refresh with it,it doesn't change. The access token changes. The refresh tokens, die when they expire.
      console.log('sending tokens to spring server!:', res)
      this.conexion.setAuthObj(res);
      this.shouldEnableContentEditable(true, res)//true
      alert('logged!');
    },
    error: (err: any) => {
      this.shouldEnableContentEditable(false)//false
      console.error(err)
    }
  }
}