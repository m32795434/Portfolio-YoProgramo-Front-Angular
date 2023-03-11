import { Component, OnInit } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'section-dropdown',
    standalone: true,
    imports: [NgbDropdownModule, RouterModule],
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
        }`]

})
export class NgbdDropdownBasic implements OnInit {
    constructor() { }

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
}