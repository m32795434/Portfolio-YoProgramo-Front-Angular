import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  languageSubject = new Subject<string>();
  language = "en";

  constructor() { }

  getLanguageObserver(): Observable<string> {
    return this.languageSubject.asObservable();
  }

  setLanguage(newLanguage: string) {
    this.language = newLanguage;
    this.languageSubject.next(this.language);
  }
}
