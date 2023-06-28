import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new Subject<string>();
  private language = "en";

  constructor() { }

  getLanguageObserver(): Observable<string> {
    return this.languageSubject.asObservable();
  }
  checkLanguage(): void {
    let lg = localStorage.getItem('language');
    if (lg) {
      console.log('language from localstorage:', lg)
      this.language = JSON.parse(lg)
      this.languageSubject.next(this.language);
    }
  }
  setLanguage(newLanguage: string) {
    this.language = newLanguage;
    this.languageSubject.next(this.language);
    localStorage.setItem('language', JSON.stringify(this.language));

  }
}
