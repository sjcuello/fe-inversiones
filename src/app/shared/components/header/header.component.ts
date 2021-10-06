import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay, filter, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { Cliente } from '../../models/cliente';
import { Notificacion } from '../../models/notificacion';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss',
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {

  nombre = '';
  isNotificationDrawerOpen = false;
  notificacionesNoLeidasCount = 0;
  @Output() $sideMenuState: EventEmitter<boolean> = new EventEmitter<boolean>();
  subscriptions: Subscription[] = [];
  breadcrumbItems: string[] = [];
  notificaciones: Notificacion[] = [];
  tieneNotificacionesNoLeidas = false;
  readonly opacityTransition: number = 250;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private notificacionService: NotificacionService,
    private routerService: Router,
    private activatedRouteService: ActivatedRoute,
  ) {
    this.matIconRegistry.addSvgIcon(
      'notificaciones',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/notificaciones.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'icon-logout-grey',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/icon-logout-grey.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'flecha-derecha',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/flecha-derecha.svg')
    );

    const routerSub = this.routerService.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getBreadcrumbItems(this.activatedRouteService.root);
      });
    this.subscriptions.push(routerSub);
  }

  ngOnInit(): void {
    this.getDatosHeader();
    this.subscribeNotificacionesNoLeidasCount();
  }

  getNotificaciones() {
    this.notificaciones = this.notificacionService.notificaciones.map( notificacion => {
      return JSON.parse(JSON.stringify(notificacion));
    });
  }

  private subscribeNotificacionesNoLeidasCount() {
    const subscription = this.notificacionService.getNotificacionesNoLeidasCount$()
      .pipe(
        tap(notificaciones => {
          this.tieneNotificacionesNoLeidas = notificaciones > 0;
        }),
        delay(this.opacityTransition)
      )
      .subscribe(
        item => {
          this.notificacionesNoLeidasCount = item;
        });
    this.subscriptions.push(subscription);
  }

  getDatosHeader(): void {
    const cliente: Cliente = JSON.parse(sessionStorage.getItem('cliente'));
    this.nombre = cliente?.nombre;
  }

  openMenu(): void {
    this.$sideMenuState.emit(true);
  }

  toggleNotificationDrawer(): void {
    const deberiaAbrir = !this.isNotificationDrawerOpen;
    if (deberiaAbrir) {
      this.getNotificaciones();
      this.notificacionService.updateNotificacionesComoLeidas();
    }
    this.isNotificationDrawerOpen = deberiaAbrir;
  }

  salir(): void {
    const redirigirAHBI = true;
    this.authService.salir(redirigirAHBI);
  }

  getBreadcrumbItems(route: ActivatedRoute) {
    const breadcrumbItems: string[] = [];
    let childRoute: ActivatedRouteSnapshot = route.snapshot.children[0];
    while (childRoute) {
      const titluoBreadcrumb = childRoute.data.titulo;
      if (titluoBreadcrumb) {
        breadcrumbItems.push(titluoBreadcrumb);
      }
      childRoute = childRoute.children ? childRoute.children[0] : null;
    }
    this.breadcrumbItems = breadcrumbItems;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
