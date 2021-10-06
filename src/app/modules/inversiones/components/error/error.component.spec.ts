import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LottieModule } from 'ngx-lottie';

import { ErrorComponent } from './error.component';

function playerFactory() {​​
  return import('lottie-web');
}​​

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorComponent ],
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
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    component.titulo = 'Ocurrió un error en nuestros servicios';
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
