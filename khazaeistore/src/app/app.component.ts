import { Component, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {
  isFavoritesDrawerOpen = false;
  isRtl = false;

  @ViewChild('favoritesDrawer', { static: true }) favoritesDrawer!: MatDrawer;

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    // Subscribe to RTL changes
    this.settingsService.rtl$.subscribe((rtl) => {
      this.isRtl = rtl;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // Update drawer position whenever isRtl changes
    if (changes['isRtl']) {
      this.updateDrawerPosition();
    }
  }

  toggleFavoritesDrawer() {
    this.favoritesDrawer.toggle();
  }

  updateDrawerPosition() {
    if (this.favoritesDrawer) {
      this.favoritesDrawer.position = this.isRtl ?  'end': 'start';
    }
  }

  switchLanguage(lang: string) {
    this.settingsService.setLanguage(lang);
  }

  onDrawerOpenedChange(isOpened: boolean) {
    this.isFavoritesDrawerOpen = isOpened;
  }
}
