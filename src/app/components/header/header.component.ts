import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  imgEventHandler(e: any) {
    console.log(e);
    if (e.key === 'Enter' || e.type === 'click') {
      console.log(e.target.alt);
      switch (e.target.alt) {
        case 'Instagram':
          window.location.assign('https://www.instagram.com/augustox86/');
          break;
        case 'Linkedin':
          window.location.assign('https://www.linkedin.com/in/manuel-augusto-bravard-642034204/');
          break;
        case 'Whatsapp':
          window.location.assign('https://api.whatsapp.com/send?phone=5493454093473')
          break;
        case 'Argentina Programa':
          window.location.assign('https://www.argentina.gob.ar/economia/conocimiento/argentina-programa');
          break;
        default:
          window.location.assign('https://api.whatsapp.com/send?phone=5493454093473');
          break;
      }
    }
  }

}
