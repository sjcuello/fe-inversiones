import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderInversionesComponent } from './header-inversiones.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HeaderInversionesComponent', () => {
  let component: HeaderInversionesComponent;
  let fixture: ComponentFixture<HeaderInversionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule ],
      declarations: [ HeaderInversionesComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderInversionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe emitir la accion cuando hace click en botón volver', () => {
    const botonBack = fixture.debugElement.query(By.css('.btn-back')).nativeElement;
    spyOn(component.accionVolver, 'emit');

    botonBack.click();

    expect(component.accionVolver.emit).toHaveBeenCalledTimes(1);
  });

  it('Debebería mostrar título vacío si no se pasa por parárametro', () => {
    expect(component.titulo).toBe('');
  });
});
