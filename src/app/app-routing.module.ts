import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '',
    loadChildren: () => import('./modules/inversiones/inversiones.module').then(m => m.InversionesModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./modules/logout/logout.module').then(m => m.LogoutModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
