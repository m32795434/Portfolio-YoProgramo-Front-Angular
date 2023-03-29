import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor() {
  }
  ngOnInit(): void {
  }
  imgEventHandler(e: any) {
    if (e.key === 'Enter' || e.type === 'click') {
      window.location.assign('https://www.argentina.gob.ar/economia/conocimiento/argentina-programa');
    }
  }

}
