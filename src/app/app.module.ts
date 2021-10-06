import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CoreModule} from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import {JwtModule} from '@auth0/angular-jwt';
import { NgIdleModule } from '@ng-idle/core';
import {​​ LottieModule }​​ from 'ngx-lottie';

export function tokenGetter() {
  return sessionStorage.getItem('token');
}

export function playerFactory() {​​
  return import('lottie-web');
}​​

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgIdleModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: [
          'localhost:4200', 'localhost:5000', 'backend', 'personas'
        ],
      }
    }),
    LottieModule.forRoot({​​
      player: playerFactory
    }​​)
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
