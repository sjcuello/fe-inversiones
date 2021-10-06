import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { NotificacionNuevaVentanaComponent } from './components/notificacion-nueva-ventana/notificacion-nueva-ventana.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: 'club-supervielle', component: NotificacionNuevaVentanaComponent, data: { titulo: 'Club Supervielle'} },
      { path: 'mi-negocio', component: NotificacionNuevaVentanaComponent, data: { titulo: 'Mi Negocio'} }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule {
}
