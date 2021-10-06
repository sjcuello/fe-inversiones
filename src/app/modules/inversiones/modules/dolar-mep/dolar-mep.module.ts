import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DolarMepComponent } from './pages/dolar-mep/dolar-mep.component';
import { DolarMepRoutingModule } from './dolar-mep-routing.module';
import { VentaDolarMepComponent } from './pages/venta-dolar-mep/venta-dolar-mep.component';
import { CompraDolarMepComponent } from './pages/compra-dolar-mep/compra-dolar-mep.component';
import { InversionesModule } from '../../inversiones.module';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';

@NgModule({
  declarations: [
    DolarMepComponent,
    CompraDolarMepComponent,
    VentaDolarMepComponent,
    OnboardingComponent
  ],
  imports: [
    CommonModule,
    DolarMepRoutingModule,
    InversionesModule
  ]
})
export class DolarMepModule { }
