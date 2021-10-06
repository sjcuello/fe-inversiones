import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieModule } from 'ngx-lottie';
import { SharedModule } from '../../shared/shared.module';
import { InversionesRoutingModule } from './inversiones-routing.module';
import { InversionesComponent } from './pages/inversiones/inversiones.component';
import { TotalizadorCuentasComponent } from './components/totalizador-cuentas/totalizador-cuentas.component';
import { BotonComponent } from './components/boton/boton.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { HeaderInversionesComponent } from './components/header-inversiones/header-inversiones.component';
import { CuentasDropdownComponent } from './components/cuentas-dropdown/cuentas-dropdown.component';
import { MontoInputComponent } from './components/monto-input/monto-input.component';
import { DetalleSolicitudComponent } from './components/detalle-solicitud/detalle-solicitud.component';
import { ErrorComponent } from './components/error/error.component';
import { BannerComponent } from './components/banner/banner.component';
import { ExitoComponent } from './components/exito/exito.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DetalleConfirmacionComponent } from './components/detalle-confirmacion/detalle-confirmacion.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardDashboardComponent } from './components/card-dashboard/card-dashboard.component';
import { ModalComponent } from './components/modal/modal.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { SwitchComponent } from './components/switch/switch.component';
import { StepperOnboardingComponent } from './components/stepper-onboarding/stepper-onboarding.component';

const modules = [
  SharedModule,
  LottieModule
];

const components = [
  BotonComponent,
  StepperComponent,
  HeaderInversionesComponent,
  CuentasDropdownComponent,
  MontoInputComponent,
  DetalleSolicitudComponent,
  DetalleConfirmacionComponent,
  ErrorComponent,
  BannerComponent,
  ExitoComponent,
  SpinnerComponent,
  CardDashboardComponent,
  ModalComponent,
  ToggleComponent,
  SwitchComponent,
  StepperOnboardingComponent
];

@NgModule({
  declarations: [
    InversionesComponent,
    TotalizadorCuentasComponent,
    components
  ],
  imports: [
    CommonModule,
    InversionesRoutingModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    modules
  ],
  exports: [
    modules,
    components
  ]
})
export class InversionesModule { }
