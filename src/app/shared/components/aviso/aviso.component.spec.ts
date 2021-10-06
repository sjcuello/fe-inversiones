import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AvisoComponent} from './aviso.component';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import {Aviso, TipoAviso} from '../../models/aviso';
import {By} from '@angular/platform-browser';

describe('AlertComponent', () => {
  let component: AvisoComponent;
  let fixture: ComponentFixture<AvisoComponent>;
  let aviso: Aviso;
  let avisoSinLink: Aviso;
  let eventEmitter;

  beforeEach(async(() => {
    aviso = {
      tipo: TipoAviso.Alerta,
      leyenda_importante: 'Titulo',
      leyenda: 'Contenido',
      link: {
        texto: 'Texto de link',
        href: 'http://example.com/'
      }
    };

    avisoSinLink = {
      tipo: TipoAviso.Alerta,
      leyenda_importante: 'Titulo Sin Link',
      leyenda: 'Contenido Sin Link',
    };

    eventEmitter = {
      emit: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [ AvisoComponent ],
      imports: [
        NgbAlertModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoComponent);
    component = fixture.componentInstance;
  });

  it('debería mostrar los elementos correctos, cuando se le pase un aviso', () => {
    fixture.componentInstance.alert = aviso;
    fixture.detectChanges();

    const tituloElement = fixture.debugElement.query(By.css('.alert__contenido .alert__titulo'));
    const contenidoElement = fixture.debugElement.query(By.css('.alert__contenido .alert__texto'));
    const linkElement = fixture.debugElement.query(By.css('.alert__contenido .alert__link'));

    expect(tituloElement.nativeElement.textContent).toBe(aviso.leyenda_importante);
    expect(contenidoElement.nativeElement.textContent).toBe(aviso.leyenda);
    expect(linkElement.nativeElement.textContent).toBe(aviso.link.texto);
    expect(linkElement.nativeElement.href).toBe(aviso.link.href);
  });

  it('no debería mostrar el link, cuando no viene en el aviso', () => {
    fixture.componentInstance.alert = avisoSinLink;
    fixture.detectChanges();

    const tituloElement = fixture.debugElement.query(By.css('.alert__contenido .alert__titulo'));
    const contenidoElement = fixture.debugElement.query(By.css('.alert__contenido .alert__texto'));
    const linkElement = fixture.debugElement.query(By.css('.alert__contenido .alert__link'));

    expect(tituloElement.nativeElement.textContent).toBe(avisoSinLink.leyenda_importante);
    expect(contenidoElement.nativeElement.textContent).toBe(avisoSinLink.leyenda);
    expect(linkElement).toBeNull();
  });

  it('debería aplicar los estilos adecuados, cuando se le asigna un tipo', () => {
    fixture.componentInstance.alert = aviso;
    fixture.componentInstance.type = TipoAviso.Alerta;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css(`.alert.alert-${TipoAviso.Alerta}`))).toBeTruthy();
  });

  it('debería pasar el input correcto al NgbAlert, cuando se pasa por Input', () => {
    let dismissible = true;
    fixture.componentInstance.alert = aviso;
    fixture.componentInstance.type = TipoAviso.Alerta;
    fixture.detectChanges();

    let ngbAlert = fixture.debugElement.query(By.directive(NgbAlert));

    expect(ngbAlert.componentInstance.dismissible).toBe(dismissible);

    dismissible = false;
    fixture.componentInstance.dismissible = dismissible;
    fixture.detectChanges();

    ngbAlert = fixture.debugElement.query(By.directive(NgbAlert));

    expect(ngbAlert.componentInstance.dismissible).toBe(dismissible);

  });

  it('debería emitir el evento close, cuando se hace click sobre el elemento adecuado', () => {
    fixture.componentInstance.alert = aviso;
    fixture.componentInstance.type = TipoAviso.Alerta;
    fixture.componentInstance.dismissible = true;
    fixture.componentInstance.close$ = eventEmitter;
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(By.css('ngb-alert button.close'));
    closeButton.triggerEventHandler('click', {});

    expect(fixture.componentInstance.close$.emit).toHaveBeenCalled();
  });
});
