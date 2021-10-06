import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { InactividadDialogComponent } from './components/inactividad-dialog/inactividad-dialog.component';
import { SessionExpiradaDialogComponent } from './components/session-expirada-dialog/session-expirada-dialog.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TooltipNuevoMenuComponent } from './components/tooltip-nuevo-menu/tooltip-nuevo-menu.component';
import { NumberToAbsPipe } from './pipes/number-to-abs.pipe';
import { NotificationDrawerComponent } from './components/notification-drawer/notification-drawer.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { NumberFloorPipe } from './pipes/number-floor.pipe';
import { TipoNombreCuentaPipe } from './pipes/tipo-nombre-cuenta.pipe';
import { NumeroDecimalPipe } from './pipes/numero-decimal.pipe';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificacionNuevaVentanaComponent } from './components/notificacion-nueva-ventana/notificacion-nueva-ventana.component';
import {SharedRoutingModule} from './shared-routing.module';
import { AvisoComponent } from './components/aviso/aviso.component';
import { VisibilityObserverDirective } from './directives/visibility-observer.directive';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';
import { StringSinPuntosPipe } from './pipes/string-sin-puntos.pipe';
import { NumeroAMonedaPipe } from './pipes/numero-a-moneda.pipe';
import { MonedaANumeroPipe } from './pipes/moneda-a-numero.pipe';
import { MinuteSecondsPipe } from './pipes/tiempo/minute-Seconds.pipe';
import { NgxCurrencyModule } from 'ngx-currency';
import { TipoNombreCuentaAbreviadaPipe } from './pipes/tipo-nombre-cuenta-abreviada.pipe';
import { ObtenerSiglaDestinatarioPipe } from './pipes/obtener-sigla-destinatario.pipe';
import { NumeroSinDecimalPipe } from './pipes/numero-sin-decimal.pipe';

registerLocaleData(localeEsAr, 'es-Ar');

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    DefaultLayoutComponent,
    FooterComponent,
    HeaderComponent,
    SideMenuComponent,
    ProgressBarComponent,
    InactividadDialogComponent,
    SessionExpiradaDialogComponent,
    TooltipNuevoMenuComponent,
    NumberToAbsPipe,
    NumberFloorPipe,
    NotificationDrawerComponent,
    ClickOutsideDirective,
    VisibilityObserverDirective,
    TipoNombreCuentaPipe,
    NumeroDecimalPipe,
    NumeroSinDecimalPipe,
    NumeroAMonedaPipe,
    MonedaANumeroPipe,
    NotificacionNuevaVentanaComponent,
    AvisoComponent,
    StringSinPuntosPipe,
    MinuteSecondsPipe,
    TipoNombreCuentaAbreviadaPipe,
    ObtenerSiglaDestinatarioPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    NgbDropdownModule,
    NgbAlertModule,
    SharedRoutingModule,
    PerfectScrollbarModule,
    NgxCurrencyModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ProgressBarComponent,
    NotificationDrawerComponent,
    ClickOutsideDirective,
    VisibilityObserverDirective,
    NumberToAbsPipe,
    NumberFloorPipe,
    NumeroDecimalPipe,
    NumeroSinDecimalPipe,
    TipoNombreCuentaPipe,
    ClipboardModule,
    NgbDropdownModule,
    AvisoComponent,
    PerfectScrollbarModule,
    MinuteSecondsPipe,
    NgxCurrencyModule,
    TipoNombreCuentaAbreviadaPipe,
    ObtenerSiglaDestinatarioPipe,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    NumeroDecimalPipe,
    DecimalPipe,
    TipoNombreCuentaAbreviadaPipe,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class SharedModule { }
