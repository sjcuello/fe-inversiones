import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { obtenerActivateUrl } from 'src/app/modules/inversiones/services/service-utils';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivate {

  private activateUrl: string;

  constructor(private router: Router, private setting: SettingsService ) {
    this.activateUrl = obtenerActivateUrl(this.setting);
  }

  canActivate() {
    if (this.activateUrl === 'false') {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
