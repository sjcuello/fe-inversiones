import {APP_INITIALIZER, ErrorHandler, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { ErrorHandlerService } from './services/error-handler.service';
import {SettingsHttpService} from './services/settings-http.service';
import {SettingsService} from './services/settings.service';

export function app_Init(settingsHttpService: SettingsHttpService) {
  return () => settingsHttpService.initializeApp();
}

export function gtm_Init(settingsService: SettingsService) {
  return settingsService.settings.googleTagManagerId;
}

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        { provide: ErrorHandler, useClass: ErrorHandlerService },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
        { provide: APP_INITIALIZER, useFactory: app_Init, deps: [SettingsHttpService], multi: true },
        { provide: 'googleTagManagerId', useFactory: gtm_Init, deps: [SettingsService] }
    ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('El modulo CoreModule ya ha sido importado. El CoreModule solo debe ser importado en el AppModule.');
    }
  }
}
