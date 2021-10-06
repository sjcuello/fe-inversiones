import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificacionNuevaVentanaComponent } from './notificacion-nueva-ventana.component';
import { AngularMaterialModule } from '../../../angular-material.module';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('NotificacionNuevaVentanaComponent', () => {
  let component: NotificacionNuevaVentanaComponent;
  let fixture: ComponentFixture<NotificacionNuevaVentanaComponent>;
  let mockActivatedRoute;

  beforeEach(async(() => {

    /*mockActivatedRoute = {
      snapshot: {
        url: [{path:''}]
      }
    };*/

    TestBed.configureTestingModule({
      declarations: [
        NotificacionNuevaVentanaComponent
      ],
      imports: [
        AngularMaterialModule,
        MatIconTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });

  }));

  /*beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionNuevaVentanaComponent);
    component = fixture.componentInstance;
  });*/

  it('should create', () => {
    fixture = TestBed.createComponent(NotificacionNuevaVentanaComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('Deberia mostrar el titulo de Club Supervielle cuando se naveda a club-supervielle', () => {

    mockActivatedRoute = {
      snapshot: {
        url: [{path: 'club-supervielle'}]
      }
    };
    TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });
    TestBed.compileComponents();

    fixture = TestBed.createComponent(NotificacionNuevaVentanaComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    const titulo = fixture.debugElement.query(By.css('.notificacion-nueva-ventana__titulo'));
    expect(titulo.nativeElement.textContent.trim()).toBe('Club Supervielle');
  });

  it('Deberia mostrar el titulo de Mi Negocio cuando se naveda a mi-negocio', () => {

    mockActivatedRoute = {
      snapshot: {
        url: [{path: 'mi-negocio'}]
      }
    };
    TestBed.overrideProvider(ActivatedRoute, { useValue: mockActivatedRoute });
    TestBed.compileComponents();

    fixture = TestBed.createComponent(NotificacionNuevaVentanaComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    const titulo = fixture.debugElement.query(By.css('.notificacion-nueva-ventana__titulo'));
    expect(titulo.nativeElement.textContent.trim()).toBe('Mi Negocio');
  });
});
