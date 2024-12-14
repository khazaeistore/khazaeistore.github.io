import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from './settings.service'; // اضافه کردن SettingsService برای مدیریت زبان

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient, private settingsService: SettingsService) {}

  // دریافت دسته‌بندی‌ها بدون نیاز به ارسال زبان
  getCategories(): Observable<any> {
    const language = this.settingsService.getCurrentLanguage(); // دریافت زبان جاری
    return this.http.get(`/data/${language}/categories.json`);
  }

  // دریافت محصولات بدون نیاز به ارسال زبان
  getProducts(): Observable<any> {
    const language = this.settingsService.getCurrentLanguage(); // دریافت زبان جاری
    return this.http.get(`/data/${language}/products.json`);
  }
}
