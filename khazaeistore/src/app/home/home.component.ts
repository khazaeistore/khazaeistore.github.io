import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { DataService } from '../services/data.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: any[] = [];
  selectedCategory: any = null;
  products: Product[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    // گوش دادن به تغییر زبان
    this.settingsService.language$.subscribe(() => {
      this.loadCategories(); // بازلود دسته‌بندی‌ها بر اساس زبان جدید
    });

    this.loadCategories(); // بارگذاری اولیه دسته‌بندی‌ها
  }

  loadCategories() {
    this.dataService.getCategories().subscribe((data) => {
      this.categories = data;

      // به‌روزرسانی selectedCategory بر اساس داده‌های جدید
      if (this.selectedCategory) {
        // پیدا کردن دسته‌بندی جدید بر اساس id
        this.selectedCategory = this.categories.find(cat => cat.id === this.selectedCategory.id);

        // بارگذاری محصولات مجدداً
        this.showProducts(this.selectedCategory);
      }
    });
  }

  showProducts(category: any) {
    this.selectedCategory = category;
    this.dataService.getProducts().subscribe((products: Product[]) => {
      this.products = products.filter((product: Product) => product.categoryId === category.id);
    });
  }

  goToProductDetail(product: Product) {
    this.router.navigate(['/product', product.id]);
  }
}
