import { Injectable, OnDestroy } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from 'src/app/shared/models/cliente';
import { Notificacion, NotificacionesResponse } from 'src/app/shared/models/notificacion';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService implements OnDestroy {

  subscription: Subscription;
  private backendUrl: string;
  private notificacionesNoLeidasCount$ = new BehaviorSubject<number>(0);
  private notificaciones$ = new BehaviorSubject<Notificacion[]>([]);

  constructor(
    private clienteService: ClienteService,
    private httpService: HttpClient,
    private settingsService: SettingsService,
  ) {
    this.backendUrl = this.settingsService.settings.backendUrl;
    this.checkNotificacionClavePorVencer();
  }

  inicializarNotificaciones() {
    this.getNotificacionesResponse().subscribe(response => {
      this.pushNotificaciones(response.lista_notificaciones);
      this.updateNotificacionesNoLeidasCount(response.no_leidas);
    });
  }

  getNotificacionesNoLeidasCount$(): Observable<number> {
    return this.notificacionesNoLeidasCount$.asObservable();
  }

  get notificacionesNoLeidasCount(): number {
    return this.notificacionesNoLeidasCount$.getValue();
  }

  private setNotificacionesNoLeidasCount(item: number) {
    this.notificacionesNoLeidasCount$.next(item);
  }

  public updateNotificacionesComoLeidas() {
    if (this.notificacionesNoLeidasCount$.value > 0) {
      this.postNotificacionesComoLeidas().subscribe();
    }
    sessionStorage.setItem('vio_notificacion_clave', 'true');
    this.setNotificacionesNoLeidasCount(0);
    this.marcarNotificacionesComoLeidas();
  }

  updateNotificacionesNoLeidasCount(count: number) {
    const countActual = this.notificacionesNoLeidasCount$.getValue();
    this.setNotificacionesNoLeidasCount(countActual + count);
  }

  private marcarNotificacionesComoLeidas() {
    const notificaciones = this.notificaciones.map(notificacion => {
      notificacion.leido = true;
      return notificacion;
    });

    this.clienteService.updateVioNotificacionClave(true);

    this.setNotificaciones(notificaciones);
  }

  getNotificaciones$(): Observable<Notificacion[]> {
    return this.notificaciones$.asObservable();
  }

  get notificaciones(): Notificacion[] {
    return this.notificaciones$.getValue();
  }

  private setNotificaciones(notificaciones: Notificacion[]) {
    this.notificaciones$.next(notificaciones);
  }

  pushNotificaciones(notificacionesNuevas: Notificacion[]) {
    const notificacionesActuales = this.notificaciones$.getValue();
    const notificaciones = [
      ...notificacionesActuales,
      ...notificacionesNuevas
    ];

    this.setNotificaciones(notificaciones);
  }

  updateNotificaciones(notificacionesNuevas: Notificacion[]) {
    const noLeidasCount = notificacionesNuevas
      .reduce((acum, notificacionActual) => acum + (notificacionActual.leido ? 0 : 1), 0);

    this.pushNotificaciones(notificacionesNuevas);
    this.updateNotificacionesNoLeidasCount(noLeidasCount);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getNotificacionesResponse(): Observable<NotificacionesResponse> {
    return this.httpService.get<NotificacionesResponse>(`${this.backendUrl}bandejanotificaciones`);
  }

  public postNotificacionesComoLeidas(): Observable<any> {
    return this.httpService.post<any>(`${this.backendUrl}bandejanotificaciones/leidas`, {});
  }


  generarNotificacionClavePorVencer(cliente: Cliente): Notificacion | null {
    let notificacion: Notificacion = null;

    if (cliente && cliente.preferencias.clave_por_vencer) {
      const ahora = moment().startOf('day');
      const descripcionVencimientoClave = this.obtenerDescripcionVencimientoClave(cliente, ahora);

      notificacion = {
        nombre: 'Tu clave de acceso a Online Banking está próxima a vencer',
        descripcion: descripcionVencimientoClave,
        link_call_to_action: {
          descripcion: 'Cambio de Clave',
          href: '/DefaultObi.aspx?mostrar=misdatos-seguridad'
        },
        leido: this.notificacionClavePorVencerVisto,
      };
    }

    return notificacion;
  }

  private obtenerDescripcionVencimientoClave(cliente: Cliente, tiempo: moment.Moment): string {
    tiempo = tiempo.startOf('day');

    const fechaExpiracionClave = moment(cliente.fecha_expiracion_clave).startOf('day');

    const diasFaltantesParaExpiracion: number = fechaExpiracionClave.diff(tiempo, 'days');

    let diasFaltantesMensaje: string;
    if (diasFaltantesParaExpiracion > 0) {
      diasFaltantesMensaje = `vencerá en ${diasFaltantesParaExpiracion} ${diasFaltantesParaExpiracion > 1 ? 'días' : 'día'}`;
    } else {
      diasFaltantesMensaje = 'vence hoy';
    }

    return `Tu clave de acceso ${diasFaltantesMensaje}. Si querés cambiarla ahora, ingresá a Cambio de Clave.`;
  }

  private checkNotificacionClavePorVencer() {
    this.clienteService.getcliente$()
      .pipe(take(1))
      .subscribe(cliente => {
        const notificacionClavePorVencer = this.generarNotificacionClavePorVencer(cliente);

        if (notificacionClavePorVencer) {
          this.pushNotificaciones([notificacionClavePorVencer]);
          if (!this.notificacionClavePorVencerVisto) {
            this.updateNotificacionesNoLeidasCount(1);
          }
        }
      });
  }

  get notificacionClavePorVencerVisto(): boolean {
    return sessionStorage.getItem('vio_notificacion_clave') === 'true';
  }

  set notificacionClavePorVencerVisto(vioNotificacionClave: boolean) {
    sessionStorage.setItem('vio_notificacion_clave', String(vioNotificacionClave));
  }
}
