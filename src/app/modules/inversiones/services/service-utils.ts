import { HttpHeaders } from '@angular/common/http';

const version = 'v1.0';
export const obtenerBackendUrl = (setting) => `${setting.settings.backendUrlInversiones}${version}`;
export const obtenerBackendUrlHome = (setting) => `${setting.settings.backendUrlInversionesHome}${version}`;
export const obtenerActivateUrl = (setting) => `${setting.settings.activateUrl}`;
export const obtenerHeaders = (authService) => new HttpHeaders({ Authorization: `Bearer ${authService.getToken()}` });
