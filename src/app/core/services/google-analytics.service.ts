import { Inject, Injectable, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from './settings.service';
import { ClienteService } from './cliente.service';
import { Subscription } from 'rxjs';

declare global {
  interface Window {
    dataLayer: Array<any>;
    ga: any;
    gaplugins: any;
    gtag(event: string, value: any, details?: any): void;
  }
}

enum Event {
  MENU = 'Menu hamburguesa',
  ACCESOS_DIRECTOS = 'Atajos transversales',
  TOTALIZADOR_CUENTAS = 'Totalizador de saldo',
  CUENTAS = 'Panel - Cuentas',
  ULTIMOS_MOVIMIENTOS = 'Panel - Ultimos movimientos',
  SOLICITUD_EXITOSA = 'Solicitud exitosa',
  ENVIAR_POR_MAIL = 'Enviar por mail',
  ERROR = 'Error',
  SELECCION = 'Selección',
}

enum EventCategory {
  CROSS_SECCION = 'OBI - Cross Seccion',
  MIS_PRODUCTOS = 'OBI - Mis Productos',
  EXTRACCION_SIN_TD = 'OBI - Extracción sin tarjeta',
  MENU_TARJETA = 'OBI - Tarjeta Elipsis'
}

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService implements OnDestroy {

  private ids: Array<string>;
  private pasoWizardTitulo = 'OBI - Extracción Sin Tarjeta - Supervielle';
  private subscriptionCliente: Subscription;

  constructor(private settingsService: SettingsService, @Inject(DOCUMENT) private document: Document,
              private clienteService: ClienteService) {

    this.ids = settingsService.settings?.googleAnalyticsIds;

    const urlId: string = this.ids?.[0];

    const s: HTMLScriptElement = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + urlId;

    const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
    head.appendChild(s);
    this.configure();
    this.tagSet({hitTimestamp: this.getHitTimestamp()});
    this.tagConfig({send_page_view: false});
    this.subscriptionCliente = this.clienteService.getcliente$().subscribe(
      cliente => this.tagSet({userId: cliente.persona_id})
    );
  }

  ngOnDestroy(): void {

    this.subscriptionCliente.unsubscribe();
  }

  pageView(title: string, path: string) {

    if (path !== '/') {
      this.tagConfig({
        page_title: title,
        page_path: '/obi' + path,
        linker: {
          accept_incoming: true,
          domains: ['supervielle.com.ar', 'tiendasupervielle.com', 'tiendasupervielleviajes.com', 'fondospremier.com.ar'],
        },
        custom_map: {
          dimension1: 'clientId',
          dimension2: 'userId',
          dimension7: 'hitTimestamp'
        }
      });
    }
  }

  abrioMenu() {

    this.tagEvent(Event.MENU, EventCategory.CROSS_SECCION, 'Click - Abrir Menu');
  }

  cerroMenu() {

    this.tagEvent(Event.MENU,  EventCategory.CROSS_SECCION, 'Click - Cerrar Menu');
  }

  clickEnMenu(seccion: string) {

    this.tagEvent(Event.MENU,  EventCategory.CROSS_SECCION, 'Click - ' + seccion);
  }

  clickEnAccesoDirecto(acceso: string) {

    this.tagEvent(Event.ACCESOS_DIRECTOS, EventCategory.MIS_PRODUCTOS, 'Click - Atajo ' + acceso);
  }

  scrollHastaAccesoDirecto(acceso: string) {

    this.tagEvent(Event.ACCESOS_DIRECTOS, EventCategory.MIS_PRODUCTOS, 'Scroll Horizontal - Atajo ' + acceso);
  }

  clickEnCuentas(desplegado: boolean) {

    this.tagEvent(Event.CUENTAS, EventCategory.MIS_PRODUCTOS, `Desplegable - ${desplegado ? 'Abrir' : 'Cerrar'}`);
  }

  clickEnVerDetalleCuentas() {

    this.tagEvent(Event.CUENTAS, EventCategory.MIS_PRODUCTOS, 'Click - Ver detalle de todas las cuentas');
  }

  clickEnUltimosMovimientos(desplegado: boolean) {

    this.tagEvent(Event.ULTIMOS_MOVIMIENTOS, EventCategory.MIS_PRODUCTOS, `Desplegable - ${desplegado ? 'Abrir' : 'Cerrar'}`);
  }

  clickEnVerMasMovimientos() {

    this.tagEvent(Event.ULTIMOS_MOVIMIENTOS, EventCategory.MIS_PRODUCTOS, 'Click - Click - Ver mas movimientos');
  }

  clickEnVerCuentas() {

    this.tagEvent(Event.TOTALIZADOR_CUENTAS, EventCategory.MIS_PRODUCTOS, 'Click - Ver Cuentas');
  }

  eligiendoDniExtraccionSinTD() {

    this.pageView(this.pasoWizardTitulo, '/extraccion-sin-tarjeta/dni');
  }

  eligiendoCuentaExtraccionSinTD() {

    this.pageView(this.pasoWizardTitulo, '/extraccion-sin-tarjeta/elegir-cuenta');
  }

  eligiendoMontoExtraccionSinTD() {

    this.pageView(this.pasoWizardTitulo, '/extraccion-sin-tarjeta/elegir-monto');
  }

  confirmandoExtraccionSinTD() {

    this.pageView(this.pasoWizardTitulo, '/extraccion-sin-tarjeta/confirmacion');
  }

  confirmaExtraccionSinTD() {

    this.pageView(this.pasoWizardTitulo, '/extraccion-sin-tarjeta/solicitud-exitosa');
  }

  errorExtraccionSinTD() {
    this.pageView(this.pasoWizardTitulo, '/extraccion-sin-tarjeta/solicitud-error');
  }

  clickEnConfirmarExtraccionSinTD(montoSaldo: number, esParaUnTercero: boolean) {

    this.tagEvent(Event.SOLICITUD_EXITOSA, EventCategory.EXTRACCION_SIN_TD,
            `Destinatario: ${esParaUnTercero ? 'Otra Persona' : 'Yo'} - Saldo a retirar: ${montoSaldo}`);
  }

  errorSolicitudExtraccionSinTD(montoSaldo: string, esParaUnTercero: boolean, mensajeDeError: string) {

    this.tagEvent(Event.ERROR, EventCategory.EXTRACCION_SIN_TD,
             `Destinatario: ${esParaUnTercero ? 'Otra Persona' : 'Yo'} - Saldo a retirar: ${montoSaldo} - Error: ${mensajeDeError}`);
  }

  envioCodigoExtraccionSinTD(exitoso: boolean) {

    this.tagEvent(Event.ENVIAR_POR_MAIL, EventCategory.EXTRACCION_SIN_TD, `Envío de código por mail: ${exitoso ? 'Exitoso' : 'Error'}`);
  }

  seleccionMotivoMenuTarjeta(motivo: string) {

    this.tagEvent(Event.SELECCION, EventCategory.MENU_TARJETA, motivo);
  }

  decorarUrl(url: string): string {

    try {
      const trackers = window.ga.getAll();
      /* utiliza el ultimo ID configurado para el tracking cross-domain */
      const linker = new window.gaplugins.Linker(trackers[trackers.length - 1]);
      return linker.decorate(url) + '&uid';
    } catch (error) {
      return url;
    }
  }

  private tagEvent(value: Event, category: string, label: string) {

    this.tag('event', value, {
      event_category: category,
      event_label: label
    });
  }

  private tagConfig(data: object) {

    this.ids?.forEach(id => this.tag('config', id, data));
  }

  private tagSet(data: object) {

    window.gtag('set', data);
  }

  private tag(event: string, value: string, details?: any) {

    window.gtag(event, value, details);
  }

  private configure() {

    window.dataLayer = window.dataLayer || [];

    // tslint:disable-next-line: only-arrow-functions
    window.gtag = window.gtag || function() {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
  }

  private getHitTimestamp(): string {

    const now = new Date();
    const tzo = -now.getTimezoneOffset();
    const dif = tzo >= 0 ? '+' : '-';
    return now.getFullYear()
        + '-' + this.pad(now.getMonth() + 1)
        + '-' + this.pad(now.getDate())
        + 'T' + this.pad(now.getHours())
        + ':' + this.pad(now.getMinutes())
        + ':' + this.pad(now.getSeconds())
        + '.' + this.pad(now.getMilliseconds())
        + dif + this.pad(tzo / 60)
        + ':' + this.pad(tzo % 60);
  }

  private pad(value: number): string {
    const norm = Math.abs(Math.floor(value));
    return (norm < 10 ? '0' : '') + norm;
  }
}
