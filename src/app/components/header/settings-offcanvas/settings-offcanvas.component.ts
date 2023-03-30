import { Component, TemplateRef } from '@angular/core';
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/services/language/language.service';

@Component({
  selector: 'app-settings-offcanvas',
  templateUrl: './settings-offcanvas.component.html',
  styleUrls: ['./settings-offcanvas.component.scss']
})
export class SettingsOffcanvasComponent {
  closeResult = '';
  language = "en"
  // languageSubsc = new Subscription();

  constructor(private offcanvasService: NgbOffcanvas, private languageSrv: LanguageService) {
  }

  setLanguage(e: any) {
    const val = e.target.value;
    this.language = val;
    this.languageSrv.setLanguage(this.language);
  }
  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title', position: 'end' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === OffcanvasDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on the backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
