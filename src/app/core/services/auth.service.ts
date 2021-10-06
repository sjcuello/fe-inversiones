import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { Cliente } from '../../shared/models/cliente';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private settingsService: SettingsService,
    private jwtHelper: JwtHelperService
  ) { }

  getToken(): string {
    return sessionStorage.getItem('token');
  }

  private setToken(token: string): void {
    this.jwtHelper.decodeToken(token);
    sessionStorage.setItem('token', token);
  }

  fetchToken(): Observable<string> {
    return this.http.get(this.settingsService.settings.jwtProviderUrl, { responseType: 'text' });
  }

  getTokenDueTime() {
    const tokenExpirationDate = this.jwtHelper.getTokenExpirationDate();
    const dueTime = moment(tokenExpirationDate).subtract(1, 'minutes').diff(moment());
    return Math.min(dueTime, Math.pow(2, 31) - 1);
  }

  initCicloAuth(): Observable<string> {
    return this.fetchToken().pipe(
      tap(response => {
        this.setToken(response);
        this.cicleAuth();
      })
    );
  }

  private cicleAuth(): void {
    if (!this.getToken()) {
      return;
    }

    const dueTime = this.getTokenDueTime();
    timer(dueTime).toPromise().then(
      () => {
        this.fetchToken().toPromise().then(
          response => {
            this.setToken(response);
            this.cicleAuth();
          }
        );
      });
  }

  salir(redigir: boolean = false) {
    const cliente: Cliente = JSON.parse(sessionStorage.getItem('cliente'));
    sessionStorage.clear();

    if (cliente.mostrar_encuesta && redigir) {
      window.location.href = '/CloseSession/CloseSession.aspx';
    } else {
      this.http.get('/Logout.aspx', { responseType: 'text' }).toPromise().then(
        res => console.log(res)
      );

      if (redigir) {
        window.location.href = this.settingsService.settings.logoffUrl;
      }
    }
  }
}
