import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { DefaultLayoutComponent } from './../../shared/layouts/default-layout/default-layout.component';
import { InversionesComponent } from './pages/inversiones/inversiones.component';
import { CanActivateService } from '../../core/services/can-activate.service';
import { CanActivateFriendsFamilyService } from 'src/app/core/services/can-activate-friends-family.service';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [CanActivateFriendsFamilyService],
    children: [{  path: 'home', component: InversionesComponent}]
  },
  {
    path: 'dolar-mep',
    loadChildren: () => import('./modules/dolar-mep/dolar-mep.module').then(m => m.DolarMepModule),
    canActivate: [CanActivateService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class InversionesRoutingModule {}
