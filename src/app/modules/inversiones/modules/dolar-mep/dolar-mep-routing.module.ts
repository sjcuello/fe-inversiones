import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './../../../../shared/layouts/default-layout/default-layout.component';
import { CompraDolarMepComponent } from './pages/compra-dolar-mep/compra-dolar-mep.component';
import { VentaDolarMepComponent } from './pages/venta-dolar-mep/venta-dolar-mep.component';
import { DolarMepComponent } from './pages/dolar-mep/dolar-mep.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [{  path: '', component: DolarMepComponent }]
  },
  {
    path: '',
    children: [
      {  path: 'compra', component: CompraDolarMepComponent },
      {  path: 'venta', component: VentaDolarMepComponent },
      {  path: 'onboarding', component: OnboardingComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DolarMepRoutingModule {}
