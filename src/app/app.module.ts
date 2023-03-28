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
// import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { QPDComponent } from './components/qpd/qpd.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbdDropdownBasic } from './components/header/section-dropdown/sectionDropdown';
import { HardAndSoftSkillsComponent } from './components/hardAndSoftSkills/hard-and-soft-skills.component';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, NgbdDropdownBasic, RouterModule, FontAwesomeModule, HttpClientModule, FormsModule, CommonModule, NgbDatepickerModule, NgbAlertModule, JsonPipe, NgCircleProgressModule.forRoot(
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
      })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
