import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/services/data-service/data.service';

@Component({
  selector: 'app-snipper-loading',
  templateUrl: './snipper-loading.component.html',
  styleUrls: ['./snipper-loading.component.scss']
})
export class SnipperLoadingComponent {
  private isLoadingSubscription = new Subscription();
  @Input() isLoadingSnipper = false;

  constructor(private dataService: DataService) {
    this.isLoadingSubscription = this.dataService.getIsLoadingObserver().subscribe((bol) => {
      this.isLoadingSnipper = bol;
    })
  }

}
