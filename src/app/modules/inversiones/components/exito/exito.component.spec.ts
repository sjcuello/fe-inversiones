import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LottieModule } from 'ngx-lottie';

import { ExitoComponent } from './exito.component';

function playerFactory() {​​
  return import('lottie-web');
}​​

describe('ExitoComponent', () => {
  let component: ExitoComponent;
  let fixture: ComponentFixture<ExitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitoComponent ],
      imports: [
        BrowserAnimationsModule,
        LottieModule.forRoot({
          player: playerFactory
        })
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitoComponent);
    component = fixture.componentInstance;
    component.titulo = '¡Orden de compra creada!';
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
