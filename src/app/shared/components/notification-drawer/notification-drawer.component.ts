import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notificacion } from '../../models/notificacion';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'shared-notification-drawer',
  templateUrl: './notification-drawer.component.html',
  styleUrls: [
    './notification-drawer.component.scss',
  ]
})
export class NotificationDrawerComponent {
  @Input() notificaciones: Notificacion[];
  isOpen = true;
  @Output() $changeNotificationDrawerState: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'check-green',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/icon-check-green.svg')
    );
  }

  closeNotificationDrawer() {
    this.$changeNotificationDrawerState.emit(false);
  }
}
