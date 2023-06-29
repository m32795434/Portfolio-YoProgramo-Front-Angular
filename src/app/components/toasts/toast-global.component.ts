import { Component, OnDestroy, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from './toast-service';
import { ToastsContainer } from './toasts-container.component';
import { Subscription } from 'rxjs';
import { DataService } from 'src/services/data-service/data.service';
import { LoginService } from 'src/services/login-service/login.service';

@Component({
    selector: 'ngbd-toast-global',
    standalone: true,
    imports: [NgbTooltipModule, ToastsContainer],
    templateUrl: './toast-global.component.html',
})
export class NgbdToastGlobal implements OnDestroy {
    protected warning = "";
    private itemDeletedSubscription = new Subscription();
    private updatedOrCreatedSubscription = new Subscription();
    private loginErrorSubscription = new Subscription();
    private loginOkSubscription = new Subscription();


    @ViewChild('dangerTpl') dangerTpl!: TemplateRef<any>;

    constructor(public toastService: ToastService, private dataService: DataService, private loginService: LoginService) {
        this.itemDeletedSubscription = this.dataService.getdeletedSubjectObserver().subscribe((item) => {
            this.warning = item;
            this.toastService.show(this.dangerTpl, { classname: 'bg-danger text-light' });
        })
        this.updatedOrCreatedSubscription = this.dataService.getupdatedOrCreatedSubjectObserver().subscribe((text) => {
            this.toastService.show(text, { classname: 'bg-success text-light' });
        })
        this.loginOkSubscription = this.loginService.getLoginOkObserver().subscribe((text) => {
            this.toastService.show(text, { classname: 'bg-success text-light' });
        })
        this.itemDeletedSubscription = this.loginService.getLoginErrorObserver().subscribe((text) => {
            this.warning = text;
            this.toastService.show(this.dangerTpl, { classname: 'bg-danger text-light' });
        })
    }

    ngOnDestroy(): void {
        this.toastService.clear();
    }
}
