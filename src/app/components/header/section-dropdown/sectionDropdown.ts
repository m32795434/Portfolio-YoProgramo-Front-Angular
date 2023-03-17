import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'section-dropdown',
    standalone: true,
    imports: [NgbDropdownModule, RouterModule, FormsModule],
    templateUrl: './sectionDropdown.html',
    styles: [`
    
    #menu-Hamb {
    color: #b3b3b3;
    font-size: 20px;
    background-color: transparent;
    outline: none;
    border: transparent;
    &:hover {
            border-radius: 7px;
            box-shadow: 0 0 7px 4px #8a8989;
        }
    }
    #sectionBtn {
        font-family: Montserrat, 'Open Sans', Lato, 'sans-serif';
        font-size: 20px;
        color: #b3b3b3;
        &:hover {
            border-radius: 7px;
            box-shadow: 0 0 7px 4px #8a8989;
        }
    }
    .close{
        border-radius:5px;
        &:hover{
            color: white;
            background-color: blue;
            border-color: grey;
            box-shadow: 0 0 2px 1px #8a8989;

        }
    }
    .form-control:hover{
        border-radius: 7px;
        box-shadow: 0 0 7px 4px #8a8989;
    }
`]

})
export class NgbdDropdownBasic implements OnInit {
    userName = '';
    password = '';
    constructor(private loginService: LoginService, private modalService: NgbModal) { }

    ngOnInit(): void {
        window.onresize = this.checkForResize;
        this.checkForResize();
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
