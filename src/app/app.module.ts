import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';


import { AppComponent } from './app.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { QPDComponent } from './components/qpd/qpd.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbdDropdownBasic } from './components/header/section-dropdown/section-dropdown.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HardAndSoftSkillsComponent } from './components/hardAndSoftSkills/hard-and-soft-skills.component';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingsOffcanvasComponent } from './components/header/settings-offcanvas/settings-offcanvas.component';
import { SocialsDropdown } from './components/header/solcials-dropdown/socials-dropdown.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { SnipperLoadingComponent } from './components/snipper-loading/snipper-loading.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ExperienceComponent,
    QPDComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    HardAndSoftSkillsComponent,
    SettingsOffcanvasComponent,
    SnipperLoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbDropdownModule,
    BrowserAnimationsModule, NgbdDropdownBasic, RouterModule, FontAwesomeModule, HttpClientModule, FormsModule, CommonModule, NgbDatepickerModule, NgbAlertModule, DragDropModule, MatSliderModule, JsonPipe, SocialsDropdown, MatRadioModule,
    NgScrollbarModule.withConfig({
      track: "vertical",
      visibility: "hover",
      appearance: "compact",
      pointerEventsMethod: "viewport",
      autoHeightDisabled: false,
      autoWidthDisabled: true
    }),
    NgCircleProgressModule.forRoot(
      {
        "backgroundColor": "#FDB900",
        "backgroundPadding": 11,
        "radius": 100,
        "maxPercent": 100,
        "units": " Point",
        "unitsColor": "#483500",
        "outerStrokeWidth": 19,
        "outerStrokeColor": "#FFFFFF",
        "innerStrokeColor": "#FFFFFF",
        "titleColor": "#483500",
        "subtitleColor": "#483500",
        "showSubtitle": false,
        "showInnerStroke": false,
        "startFromZero": false
      }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
