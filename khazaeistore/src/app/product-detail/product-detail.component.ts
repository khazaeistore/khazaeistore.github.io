import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { DataService } from '../services/data.service';
import { SettingsService } from '../services/settings.service'; // استفاده از SettingsService برای مدیریت زبان

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private settingsService: SettingsService // استفاده از سرویس تنظیمات برای زبان
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id')); // تبدیل به عدد

    // بارگذاری اولیه محصول
    this.loadProduct(productId);

    // گوش دادن به تغییر زبان
    this.settingsService.language$.subscribe(() => {
      this.loadProduct(productId); // بارگذاری مجدد محصول با زبان جدید
    });
  }

  loadProduct(productId: number) {
    this.dataService.getProducts().subscribe((products: Product[]) => {
      this.product = products.find((p: Product) => p.id === productId) || null;
    });
  }
}
