import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'section-dropdown',
    standalone: true,
    imports: [NgbDropdownModule, RouterModule],
    templateUrl: './sectionDropdown.html',
    styles: [`
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
export class NgbdDropdownBasic {
}