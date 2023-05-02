import { Component } from '@angular/core';
import { LanguageService } from '../../../../services/language/language.service';
import { Subscription } from 'rxjs';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'socials-dropdown',
    standalone: true,
    imports: [NgbDropdownModule],
    templateUrl: './socials-dropdown.component.html',
    // styleUrls: ['./socials-dropdown.component.scss']
})
export class SocialsDropdown {
    language = "en";
    languageSubsc = new Subscription();
    constructor(private languageSrv: LanguageService) {
        this.languageSubsc = this.languageSrv.getLanguageObserver().subscribe((val) => { this.language = val })
    }
    imgEventHandler(e: any) {
        if (e.key === 'Enter' || e.type === 'click') {
            switch (e.currentTarget.dataset.social) {
                case 'Instagram':
                    window.location.assign('https://www.instagram.com/augustox86/');
                    break;
                case 'Linkedin':
                    window.location.assign('https://www.linkedin.com/in/manuel-augusto-bravard-642034204/');
                    break;
                case 'Whatsapp':
                    window.location.assign('https://api.whatsapp.com/send?phone=5493454093473')
                    break;
                default:
                    window.location.assign('https://api.whatsapp.com/send?phone=5493454093473');
                    break;
            }
        }
    }
}