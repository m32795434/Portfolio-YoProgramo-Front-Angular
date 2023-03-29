import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { LoginService } from 'src/services/login-service/login.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
    selector: 'section-dropdown',
    standalone: true,
    imports: [NgbDropdownModule, RouterModule, FormsModule],
    templateUrl: './section-dropdown.component.html',
    styleUrls: ['./section-dropdown.component.scss']

})
export class NgbdDropdownBasic implements OnInit {
    logged = false;
    loggedSubscription = new Subscription();
    userName = '';
    password = '';
    constructor(private loginService: LoginService) {
        this.loggedSubscription = this.loginService.getloggedObserver().subscribe((val) => {
            this.logged = val;
        })
    }

    ngOnInit(): void {
        window.onresize = this.checkForResize;
        this.checkForResize();
        this.logged = this.loginService.isLogged();
    }

    text = 'Section';
    greaterThan975 = false;

    checkForResize = (): void => {
        const widthViewPort: any = window?.visualViewport?.width;
        if (widthViewPort != null) {
            if (widthViewPort > 975.2) {
                this.text = 'Section';
                this.greaterThan975 = true;
            } else if (widthViewPort < 975.2) {
                this.text = 'menu';
                this.greaterThan975 = false;
            }
        }

    }
    loginToggle(content: TemplateRef<any>) {
        this.loginService.managelogin(content);
    }
    onSubmit(content: TemplateRef<any>) {
        console.log(`User Name: ${this.userName}, Password: ${this.password}`);
        if (this.userName === 'manuel87' && this.password === '1234') {
            this.loginService.shouldEnableContentEditable(true);
        }
    }
}