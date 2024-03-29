import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { LoginService } from 'src/services/login-service/login.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../../services/language/language.service';
import { UserLevels, AuthObj } from 'src/interfaces/sections-interfaces';


@Component({
    selector: 'section-dropdown',
    // standalone: true,
    // imports: [NgbDropdownModule, RouterModule, FormsModule],
    templateUrl: './section-dropdown.component.html',
    // styleUrls: ['./section-dropdown.component.scss']

})
export class NgbdDropdownBasic implements OnInit {
    logged: UserLevels = "";
    loggedSubscription = new Subscription();
    languageSubsc = new Subscription();
    isLoadingSubsc = new Subscription();
    userName = '';
    password = '';
    language = "en";
    greaterThan975 = false;
    protected isLoading = false;

    constructor(private loginService: LoginService, private languageSrv: LanguageService) {
        this.loggedSubscription = this.loginService.getloggedObserver().subscribe((role) => {
            this.logged = role;
        });
        this.languageSubsc = this.languageSrv.getLanguageObserver().subscribe((val) => this.language = val);
        this.isLoadingSubsc = this.loginService.getisLoadingObserver().subscribe((bool) => this.isLoading = bool);
    }

    ngOnInit(): void {
        window.onresize = this.checkForResize;
        this.checkForResize();
        // this.loginService.isLogged();
        // this.logged = logged;
    }


    checkForResize = (): void => {
        const widthViewPort: any = window?.visualViewport?.width;
        if (widthViewPort != null) {
            if (widthViewPort > 975.2) {
                // this.text = 'Section';
                this.greaterThan975 = true;
            } else if (widthViewPort < 975.2) {
                // this.text = 'menu';
                this.greaterThan975 = false;
            }
        }

    }

    loginToggle(content: TemplateRef<any>) {
        this.loginService.managelogin(content);
    }
    onSubmit(e: any) {
        const userName = e.target.userName.value;
        const password = e.target.password.value;
        // const id = e.target.id.value;
        // const level = e.target.level.value;
        this.loginService.checkAuth(userName, password);
        // console.log(`User Name: ${this.userName}, Password: ${this.password}`);
        // if (this.userName === 'manuel87' && this.password === '1234') {
        //     this.loginService.shouldEnableContentEditable(true);
        // }
    }
}
