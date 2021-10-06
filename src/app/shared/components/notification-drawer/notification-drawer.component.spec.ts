import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AngularMaterialModule } from '../../../angular-material.module';
import { Notificacion } from '../../models/notificacion';
import { NotificationDrawerComponent } from './notification-drawer.component';

let component: NotificationDrawerComponent;
let mockNotificaciones: Notificacion[];
let fixture: ComponentFixture<NotificationDrawerComponent>;

describe('NotificationDrawerComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationDrawerComponent ],
      imports: [AngularMaterialModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationDrawerComponent);
    component = fixture.componentInstance;
  });

  it('debería mostrar el mensaje de notificaciones leidas, cuando no hay notificaciones', () => {
    fixture.componentInstance.notificaciones = [];

    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.notificacion')).length).toBe(0);
    expect(fixture.debugElement.queryAll(By.css('.notification-drawer-message#notificacionesLeidas')).length).toBe(1);
  });

  it('debería mostrar las notificaciones, cuando hay notificaciones', () => {
    mockNotificaciones = [
      {
        nombre: 'Titulo de notificación',
        descripcion: 'Descripción de notificación',
        link_call_to_action: {
          descripcion: 'Descripción de Link',
          href: '/link'
        },
        leido: false
      }
    ];

    fixture.componentInstance.notificaciones = mockNotificaciones;

    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.notificacion')).length).toBe(1);
    expect(fixture.debugElement.queryAll(By.css('.notification-drawer-message#notificacionesLeidas')).length).toBe(0);
  });
});
