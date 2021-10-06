import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { Habilitacion } from 'src/app/shared/models/habilitacion';

@Injectable({
  providedIn: 'root'
})
export class HabilitacionService {
  private habilitacionSubject = new BehaviorSubject<boolean>(false);
  private habilitacionStopDebitSubject = new BehaviorSubject<boolean>(false);
  private habilitacionPagosSubject = new BehaviorSubject<boolean>(false);
  private habilitacionDeliveriesSubject = new BehaviorSubject<boolean>(false);
  private habilitacionInternaTarjetas = new BehaviorSubject<boolean>(false);
  private habilitacionInternaCuentas = new BehaviorSubject<boolean>(false);
  private habilitacionHubVirtual = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private settingsService: SettingsService) {
  }

  getHabilitacion$(): Observable<boolean> {
    return this.habilitacionSubject.asObservable();
  }

  getHabilitacionStopDebit$(): Observable<boolean> {
    return this.habilitacionStopDebitSubject.asObservable();
  }

  getHabilitacionPagos$(): Observable<boolean> {
    return this.habilitacionPagosSubject.asObservable();
  }

  getHabilitacionDeliveries$(): Observable<boolean> {
    return this.habilitacionDeliveriesSubject.asObservable();
  }

  getHabilitacionInternaTarjetas$(): Observable<boolean> {
    return this.habilitacionInternaTarjetas.asObservable();
  }

  getHabilitacionInternaCuentas$(): Observable<boolean> {
    return this.habilitacionInternaCuentas.asObservable();
  }

  getHabilitacionHubVirtual$(): Observable<boolean> {
    return this.habilitacionHubVirtual.asObservable();
  }

  iniciarEmisorHabilitacion(): void {
    this.http.get<Habilitacion>(this.settingsService.settings.backendUrl + 'habilitaciones/extraccion').subscribe(
      habilitacion => this.emitirActualizacionHabilitacion(habilitacion.esta_habilitado)
    );

    this.http.get<Habilitacion>(this.settingsService.settings.backendTarjetasUrl + 'habilitaciones/stop-debit').subscribe(
      habilitacion => this.emitirActualizacionHabilitacionStopDebit(habilitacion.esta_habilitado)
    );

    this.http.get<Habilitacion>(this.settingsService.settings.backendTarjetasUrl + 'habilitaciones/pagos').subscribe(
      habilitacion => this.emitirActualizacionHabilitacionPagos(habilitacion.esta_habilitado)
    );

    this.http.get<Habilitacion>(this.settingsService.settings.backendTarjetasUrl + 'habilitaciones/deliveries').subscribe(
      habilitacion => this.emitirActualizacionHabilitacionDeliveries(habilitacion.esta_habilitado)
    );

    this.http.get<Habilitacion>(this.settingsService.settings.backendTarjetasUrl + 'habilitaciones/InternaTarjetas').subscribe(
      habilitacion => this.emitirActualizacionhabilitacionInternaTarjetas(habilitacion.esta_habilitado)
    );

    this.http.get<Habilitacion>(this.settingsService.settings.backendCuentasUrl + 'habilitaciones/InternaCuentas').subscribe(
      habilitacion => this.emitirActualizacionhabilitacionInternaCuentas(habilitacion.esta_habilitado)
    );

    this.http.get<Habilitacion>(this.settingsService.settings.backendUrl + 'habilitaciones/HubVirtual').subscribe(
      habilitacion => this.emitirActualizacionHabilitacionHubVirtual(habilitacion.esta_habilitado)
    );
  }

  estaHabilitado(feature: string): Observable<Habilitacion> {
    return this.http.get<Habilitacion>(this.settingsService.settings.backendUrl + 'habilitaciones/' + feature);
  }

  private emitirActualizacionHabilitacion(clienteHabilitacionService: boolean) {
    this.habilitacionSubject.next(clienteHabilitacionService);
  }

  private emitirActualizacionHabilitacionStopDebit(clienteHabilitacionService: boolean) {
    this.habilitacionStopDebitSubject.next(clienteHabilitacionService);
  }

  private emitirActualizacionHabilitacionPagos(clienteHabilitacionService: boolean) {
    this.habilitacionPagosSubject.next(clienteHabilitacionService);
  }

  private emitirActualizacionHabilitacionDeliveries(clienteHabilitacionService: boolean) {
    this.habilitacionDeliveriesSubject.next(clienteHabilitacionService);
  }

  private emitirActualizacionhabilitacionInternaTarjetas(clienteHabilitacionService: boolean) {
    this.habilitacionInternaTarjetas.next(clienteHabilitacionService);
  }

  private emitirActualizacionhabilitacionInternaCuentas(clienteHabilitacionService: boolean) {
    this.habilitacionInternaCuentas.next(clienteHabilitacionService);
  }

  private emitirActualizacionHabilitacionHubVirtual(clienteHabilitacionService: boolean) {
    this.habilitacionHubVirtual.next(clienteHabilitacionService);
  }
}
