import { Injectable, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { Conexion } from 'src/interfaces/Conexion';
import { SpringServerService } from '../spring-server/spring-server.service';
import { User, UserLevels } from 'src/interfaces/sections-interfaces';
// import { editableElements, editButtons, loginButton } from 'src/app/libraries/elements';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private logged = false;
  private loggedSubject = new Subject<any>();
  modalRef?: NgbModalRef;
  private conexion: Conexion;
  private auth = false;
  private level = "no_level";

  constructor(private modalService: NgbModal, private dataAccess: SpringServerService) {
    this.conexion = this.dataAccess;
  }

  getloggedObserver(): Observable<any> {
    return this.loggedSubject.asObservable();
  }
  isLogged(): boolean {
    const logged: string | null = localStorage.getItem('logged');
    if (logged) {
      this.logged = JSON.parse(logged);
      console.log('refreshed....logged?:', this.logged);
      return this.logged;
    } else {
      return false;
    }
  }

  managelogin(content: TemplateRef<any>) {
    if (this.logged) {
      // LOGOUT
      console.log('login out...');
      console.log('logged?', this.logged);
      this.shouldEnableContentEditable(false);
    } else {
      // LOGIN
      console.log('logged?', this.logged);
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

  shouldEnableContentEditable(bool: boolean) {
    if (bool) {
      localStorage.setItem('logged', 'true');
      this.logged = true;
      this.loggedSubject.next(this.logged);
      console.log('enabling contentEditable');

    } else {
      localStorage.setItem('logged', 'false');
      this.logged = false;
      this.loggedSubject.next(this.logged);
      console.log('disabling contentEditable');

    }
  }
  checkAuth(user: string, pass: string, id: number, level: UserLevels) {
    const userToCheck: User = {
      id: id, userName: user, userPass: pass, level: level,
    }
    console.log('userToCheck:', userToCheck);
    this.conexion.checkAuth(userToCheck)?.subscribe((res) => {
      this.auth = res;
      this.level = level;
      console.log('Authorized?:', this.auth, level);
    })
  }
}
