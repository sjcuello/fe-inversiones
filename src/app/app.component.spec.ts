import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Idle, IdleExpiry } from '@ng-idle/core';
import { AuthService } from './core/services/auth.service';
import { AngularMaterialModule } from './angular-material.module';
import { of } from 'rxjs';
import { InactividadDialogComponent } from './shared/components/inactividad-dialog/inactividad-dialog.component';
import { SharedModule } from './shared/shared.module';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let mockAuthService: any;
  let fixture: ComponentFixture<AppComponent>;
  let mockIdle: any;
  const ngIdleExpiryKey = 'ng2Idle.main.expiry';

  beforeEach(async(() => {

    mockAuthService = {
        fetchToken: jest.fn()
    };

    mockIdle = {
      setIdle: () => {},
      setTimeout: () => {},
      setInterrupts: () => {},
      setAutoResume: () => {},
      onIdleEnd: of(),
      onTimeout: of(),
      onIdleStart: of(),
      onTimeoutWarning: of(5),
      watch: () => {},
      timeout: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AngularMaterialModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: 'googleTagManagerId', useValue: 'GTM-XXXXXX' },
        { provide: Idle, useValue: mockIdle },
        IdleExpiry,
        { provide: AuthService, useValue: mockAuthService },
      ],
    })
      .overrideModule(BrowserDynamicTestingModule,
        {
          set: { entryComponents: [ InactividadDialogComponent ] }
        })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  }));

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Obi'`, () => {
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app.title).toEqual('Obi');
  });

  it('debería forzar el timeout del idle serivce, cuando comienza el onTimeoutWarning y la sesión está expirada', () => {
    const expiredDate = Date.now() - 20;
    localStorage.setItem(ngIdleExpiryKey, expiredDate.toString());

    fixture.detectChanges();

    expect(mockIdle.timeout).toHaveBeenCalled();
  });

  it('debería no forzar el timeout del idle serivce, cuando comienza el onTimeoutWarning y la sesión no está expirada', () => {
    const expiredDate = Date.now() + 50;
    localStorage.setItem(ngIdleExpiryKey, expiredDate.toString());

    fixture.detectChanges();

    expect(mockIdle.timeout).toHaveBeenCalledTimes(0);
  });

  afterEach(() => {
    localStorage.clear();
  });
});
