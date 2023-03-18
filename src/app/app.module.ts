import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { QPDComponent } from './components/qpd/qpd.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbdDropdownBasic } from './components/header/section-dropdown/sectionDropdown';
import { HardAndSoftSkillsComponent } from './components/hardAndSoftSkills/hard-and-soft-skills.component';
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
    BrowserAnimationsModule, NgbdDropdownBasic, RouterModule, FontAwesomeModule, HttpClientModule, FormsModule, CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
