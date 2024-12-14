import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private languageSubject = new BehaviorSubject<string>(localStorage.getItem('lang') || 'fa');
  private rtlSubject = new BehaviorSubject<boolean>(this.languageSubject.getValue() === 'fa');

  language$ = this.languageSubject.asObservable();
  rtl$ = this.rtlSubject.asObservable();

  constructor(private translate: TranslateService) {
    // Set initial language based on localStorage or default
    this.setLanguage(this.languageSubject.getValue());
  }

  setLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    this.languageSubject.next(lang);
    this.rtlSubject.next(lang === 'fa');
    this.translate.use(lang);
    document.body.dir = lang === 'fa' ? 'rtl' : 'ltr'; // Update document direction
  }

  getCurrentLanguage(): string {
    return this.languageSubject.getValue();
  }

  isRtl(): boolean {
    return this.rtlSubject.getValue();
  }
}
