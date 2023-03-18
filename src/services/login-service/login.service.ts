import { Injectable, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
// import { editableElements, editButtons, loginButton } from 'src/app/libraries/elements';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private logged = false;
  private loggedSubject = new Subject<any>();
  modalRef?: NgbModalRef;
  closeResult = '';

  constructor(private modalService: NgbModal) { }

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
      // windowClass: 'my-custom-class'
    });
    this.modalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );

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
      // createLoggedTooltips();
      console.log('shouldEnableContentEditable(true)');
      // if (changeImgInput) {
      //   changeImgInput.onchange = function () {
      //     selectImg(this);
      //   };
      // }
      // Array.from(document.querySelectorAll('.save-button')).forEach((but: any) => {
      //   but.hidden = false;
      // but.addEventListener('click', handleEditButtons);
      //});
      // Array.from(document.querySelectorAll('.edit-content')).forEach((el: any) => {
      //   console.log(el);
      //   el.contentEditable = true;
      // });

      // mirrorInterval = setInterval(() => {
      //   mirrorToLocalStorage();
      //   console.log('Mirroring!!!');
      // }, 10000);
      // if (loginButton) {
      //   console.log(loginButton)
      //   loginButton.textContent = 'LOGOUT';
      // }
    } else {
      localStorage.setItem('logged', 'false');
      this.logged = false;
      this.loggedSubject.next(this.logged);
      console.log('login out.....');
      // if (toolChangeImg) {
      //   toolChangeImg.forEach((el) => el.hide());
      // }
      // if (tooltipsSaveBts) {
      //   tooltipsSaveBts.forEach((el) => el.hide());
      // }
      // editableElements.forEach((el: any) => {
      //   el.contentEditable = false;
      // });
      // editButtons.forEach((but: any) => {
      //   but.hidden = true;
      //   // but.removeEventListener('click', handleEditButtons);
      // });
      // mirrorToLocalStorage();
      // clearInterval(mirrorInterval);
      // if (loginButton) loginButton.textContent = 'LOGIN';
    }
  }

}
