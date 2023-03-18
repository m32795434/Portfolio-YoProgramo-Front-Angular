import { Component, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { LoginService } from 'src/services/login-service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private logged = false;
  private loggedSubscription = new Subscription();
  constructor(private loginService: LoginService) {
    this.loggedSubscription = this.loginService.getloggedObserver().subscribe((val) => {
      this.logged = val;
    })
  }
  ngOnInit(): void {
    this.loginService.isLogged();
  }

  imgEventHandler(e: any) {
    if (e.key === 'Enter' || e.type === 'click') {
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
