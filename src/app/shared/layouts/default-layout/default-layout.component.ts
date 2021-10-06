import { Component } from '@angular/core';
import { GoogleAnalyticsService } from '../../../core/services/google-analytics.service';

@Component({
  selector: 'shared-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: [
    './default-layout.component.scss',
  ]
})
export class DefaultLayoutComponent {

  constructor(private analyticsService: GoogleAnalyticsService) {}

  abrioMenu(): void {
    this.analyticsService.abrioMenu();
  }

  cerroMenu(): void {
    this.analyticsService.cerroMenu();
  }
}
