import { Component, OnInit } from '@angular/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { AutoResume, DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InactividadDialogComponent } from './shared/components/inactividad-dialog/inactividad-dialog.component';
import { MonitorActividadService } from './core/services/monitor-actividad.service';
import { AuthService } from './core/services/auth.service';
import { SettingsService } from './core/services/settings.service';
import { NavigationEnd, Router } from '@angular/router';
import { GoogleAnalyticsService } from './core/services/google-analytics.service';
import { NotificacionService } from './core/services/notificacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  title: string;
  inactivityDialog: MatDialogRef<any> = null;

  constructor(
    private gtmService: GoogleTagManagerService,
    private idle: Idle,
    public dialog: MatDialog,
    private monitorActividadService: MonitorActividadService,
    private authService: AuthService,
    private settingsService: SettingsService,
    private router: Router,
    private googleAnalyticsService: GoogleAnalyticsService,
    private notificacionService: NotificacionService,
  ) {  }

  openDialog(): MatDialogRef<any> {

    const dialogRef = this.dialog.open(InactividadDialogComponent, {
      width: '335px',
      data: {},
      disableClose: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.inactivityDialog = null;
        this.idle.interrupt(true);
      } else if (result === false) {
        const redirigirAHBI = true;
        this.authService.salir(redirigirAHBI);
      }
    });

    return dialogRef;
  }

  ngOnInit() {
    this.title = 'Obi';
    // Configuramos el tiempo (segundos) de inactividad del usuario en el browser para comenzar a mostrar el dialogo
    this.idle.setIdle(this.settingsService.settings.idleSeconds);
    // Configuramos el tiempo (segundos) mediante el cual se va mostrar el dialogo para continuar o cerrar sesion
    this.idle.setTimeout(this.settingsService.settings.idleTimeoutSeconds);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.idle.setAutoResume(AutoResume.notIdle);

    this.idle.onTimeout.subscribe(() => {
      this.authService.salir();
      if (this.inactivityDialog) {
        this.inactivityDialog.close();
      }
      this.router.navigate(['logout']);
    });

    this.idle.onTimeoutWarning.subscribe((countdown) => {
      const expiryDate = parseInt(localStorage.getItem('ng2Idle.main.expiry'), 10);
      const isSessionExpired: boolean = expiryDate - Date.now() < 0;

      if (isSessionExpired) {
        this.idle.timeout();
        return;
      }

      this.monitorActividadService.decrementarCountDown(countdown);

      if (!this.inactivityDialog) {
        this.inactivityDialog = this.openDialog();
      }
    });

    this.idle.watch();

    this.router.events.forEach(item => {
      if (item instanceof NavigationEnd) {
        this.googleAnalyticsService.pageView(document.title, this.router.url);
      }
    });
    this.notificacionService.inicializarNotificaciones();
  }
}
