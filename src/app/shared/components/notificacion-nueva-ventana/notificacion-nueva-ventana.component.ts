import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'shared-notificacion-nueva-ventana',
  templateUrl: './notificacion-nueva-ventana.component.html',
  styleUrls: ['./notificacion-nueva-ventana.component.scss']
})
export class NotificacionNuevaVentanaComponent implements OnInit {
  title: string;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {
    this.matIconRegistry.addSvgIcon(
      'face-new-window',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/face-new-window.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'chrome',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/icon-chrome.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'explorer',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/icon-explorer.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'safari',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/icon-safari.svg'),
    );
  }

  ngOnInit(): void {
    this.setTituloComponente();
  }

  private setTituloComponente() {
    const path = this.route.snapshot.url[0].path;
    switch (path) {
      case 'club-supervielle':
        this.title = 'Club Supervielle';
        break;
      case 'mi-negocio':
        this.title = 'Mi Negocio';
        break;
    }
  }
}
