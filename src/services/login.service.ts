import { Injectable } from '@angular/core';
import { editableElements, editButtons } from 'src/app/libraries/elements';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  logged = false;

  constructor() { }
  isLogged() {
    const logged: any = localStorage.getItem('logged')
    this.logged = JSON.parse(logged);
    console.log('refreshed....logged?:', this.logged);
  }

  managelogin() {
    if (this.logged) {
      // LOGOUT
      console.log('login out...');
      console.log('logged?', this.logged);
      // shouldEnableContentEditable(false);
    } else {
      // LOGIN
      console.log('logged?', this.logged);
      // createForm();
      console.log('form created');
    }
  }

  // shouldEnableContentEditable(bool: boolean) {
  //   if (bool) {
  //     localStorage.setItem('logged', 'true');
  //     this.logged = true;
  //     // createLoggedTooltips();
  //     console.log('shouldEnableContentEditable(true)');
  //     // if (changeImgInput) {
  //     //   changeImgInput.onchange = function () {
  //     //     selectImg(this);
  //     //   };
  //     // }
  //     editButtons.forEach((but: any) => {
  //       but.hidden = false;
  //       // but.addEventListener('click', handleEditButtons);
  //     });
  //     editableElements.forEach((el: any) => {
  //       el.contentEditable = true;
  //     });

  //     // mirrorInterval = setInterval(() => {
  //     //   mirrorToLocalStorage();
  //     //   console.log('Mirroring!!!');
  //     // }, 10000);

  //     loginButtons.forEach((el) => (el.textContent = 'LOGOUT'));
  //   } else {
  //     localStorage.setItem('login', false);
  //     logged = false;
  //     console.log('login out.....');
  //     if (toolChangeImg) {
  //       toolChangeImg.forEach((el) => el.hide());
  //     }
  //     if (tooltipsSaveBts) {
  //       tooltipsSaveBts.forEach((el) => el.hide());
  //     }
  //     editableElements.forEach((el) => {
  //       el.contentEditable = false;
  //     });
  //     editButtons.forEach((but) => {
  //       but.hidden = true;
  //       but.removeEventListener('click', handleEditButtons);
  //     });
  //     mirrorToLocalStorage();
  //     clearInterval(mirrorInterval);
  //     loginButtons.forEach((el) => (el.textContent = 'LOGIN'));
  //   }
  // }

}
