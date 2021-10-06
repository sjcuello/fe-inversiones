import { Component, Input } from '@angular/core';

@Component({
  selector: 'ftya-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

  @Input() mensaje: string;
}
