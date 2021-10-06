import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { By } from '@angular/platform-browser';
import { NotificationDrawerComponent } from '../notification-drawer/notification-drawer.component';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { NotificacionService } from 'src/app/core/services/notificacion.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService;
  let mockActivatedRoute;
  let mockRouter;
  let mockNotificacionService;

  beforeEach(async(() => {

    mockAuthService = {
        salir: jest.fn()
    };

    mockNotificacionService = {
      notificaciones: [],
      getNotificacionesNoLeidasCount$: jest.fn(),
      getNotificaciones$: jest.fn(),
      updateNotificacionesComoLeidas: jest.fn(),
    };

    mockActivatedRoute = {
      root: {
        snapshot: {
            children: [
          {
            data: {
              titulo: 'Primer Nivel'
            },
            children: [
              {
                data: {
                  titulo: 'Segundo Nivel',
                }
              }
            ]
          }
        ]
          }
      }
    };

    mockRouter = {
      events: of<Event>(new NavigationEnd(0, 'test', 'testAfterRedirect')),
    };

    mockNotificacionService.getNotificacionesNoLeidasCount$.mockReturnValue(of(0));
    mockNotificacionService.getNotificaciones$.mockReturnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        NotificationDrawerComponent,
      ],
      imports: [
        HttpClientModule,
        AngularMaterialModule,
        MatIconTestingModule,
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: NotificacionService, useValue: mockNotificacionService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('debería mostrarse siempre la campana de notificaciones', () => {
    fixture.detectChanges();
    const notificaciones = fixture.debugElement.query(By.css('.boton-notificacion') );
    expect(notificaciones).not.toBeNull();
  });

  it('debería llamarse al metodo salir del AuthService, cuando se usa el botón de salir', () => {
    fixture.detectChanges();
    const salirBoton = fixture.debugElement.query(By.css('.boton-salir'));
    const redirigirAHBIParameter = true;

    expect(salirBoton).toBeTruthy();

    salirBoton.triggerEventHandler('click', {});

    expect(mockAuthService.salir).toHaveBeenCalledWith(redirigirAHBIParameter);
  });

  it('debería llamarse al metodo salir del AuthService, cuando se usa el botón de salir', () => {
    fixture.detectChanges();
    const salirBoton = fixture.debugElement.query(By.css('.boton-salir'));
    const redirigirAHBIParameter = true;

    expect(salirBoton).toBeTruthy();

    salirBoton.triggerEventHandler('click', {});

    expect(mockAuthService.salir).toHaveBeenCalledWith(redirigirAHBIParameter);
  });

  it('debería mostrar el breadcrum adecuado', () => {
    fixture.detectChanges();

    const breadcrumbItems = fixture.debugElement.queryAll(By.css('.header-breadcrumbs .header-breadcrumbs__item'));
    expect(breadcrumbItems.length).toBe(2);
    expect(breadcrumbItems[0].nativeElement.textContent.trim()).toBe('Primer Nivel');
    expect(breadcrumbItems[1].nativeElement.textContent.trim()).toBe('Segundo Nivel');

  });

  it('debería setear la variable tieneNotificacionesNoLeidas en true, cuando hay notificaciones sin leer', fakeAsync(() => {
    mockNotificacionService.getNotificacionesNoLeidasCount$.mockReturnValue(of(2));

    fixture.detectChanges();

    expect(fixture.componentInstance.tieneNotificacionesNoLeidas).toBe(true);
    expect(fixture.componentInstance.notificacionesNoLeidasCount).toBe(0);

    tick(fixture.componentInstance.opacityTransition);

    expect(fixture.componentInstance.notificacionesNoLeidasCount).toBe(2);
  }));

  it('debería llamarse al método getNotificaciones y marcarlas como leidas cuando se llama al método toggleNotificationDrawer y deberiaAbrir es true', ()=> {
    const mockNotificaciones = [
      {
        nombre: 'Titulo de notificación',
        descripcion: 'Descripción de notificación',
        link_call_to_action: {
          description: 'Descripción de Link',
          href: '/link'
        },
        leido: false
      }
    ];

    jest.spyOn(fixture.componentInstance, 'getNotificaciones').mockImplementation(() => fixture.componentInstance.notificaciones = mockNotificaciones);
    fixture.componentInstance.isNotificationDrawerOpen = false;

    expect(fixture.componentInstance.notificaciones).toEqual([]);

    fixture.componentInstance.toggleNotificationDrawer();

    expect(fixture.componentInstance.getNotificaciones).toBeCalledTimes(1);
    expect(mockNotificacionService.updateNotificacionesComoLeidas).toBeCalledTimes(1);
    expect(fixture.componentInstance.notificaciones).toEqual(mockNotificaciones);
    expect(fixture.componentInstance.isNotificationDrawerOpen).toBe(true);
  });

  it('no debería llamarse al método getNotificaciones ni marcarlas como leidas cuando se llama al método toggleNotificationDrawer y deberiaAbrir es false', ()=> {

    jest.spyOn(fixture.componentInstance, 'getNotificaciones');
    fixture.componentInstance.isNotificationDrawerOpen = true;

    expect(fixture.componentInstance.notificaciones).toEqual([]);

    fixture.componentInstance.toggleNotificationDrawer();

    expect(fixture.componentInstance.getNotificaciones).toBeCalledTimes(0);
    expect(mockNotificacionService.updateNotificacionesComoLeidas).toBeCalledTimes(0);
    expect(fixture.componentInstance.notificaciones).toEqual([]);
    expect(fixture.componentInstance.isNotificationDrawerOpen).toBe(false);
  });

  it('debería tenerse en la variable notificaciones un clon de las notificaciones recibidas del servicio cuando se llama al método getNotificaciones', ()=> {
    const mockNotificaciones = [
      {
        nombre: 'Titulo de notificación',
        descripcion: 'Descripción de notificación',
        link_call_to_action: {
          description: 'Descripción de Link',
          href: '/link'
        },
        leido: false
      }
    ];
    fixture.componentInstance.notificacionService.notificaciones = mockNotificaciones;

    expect(fixture.componentInstance.notificaciones).toEqual([]);

    fixture.componentInstance.getNotificaciones();

    expect(fixture.componentInstance.notificaciones).toEqual(mockNotificaciones);
  });
});
