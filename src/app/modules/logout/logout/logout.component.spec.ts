import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SessionExpiradaDialogComponent } from '../../../shared/components/session-expirada-dialog/session-expirada-dialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutComponent, SessionExpiradaDialogComponent],
      imports: [BrowserAnimationsModule, AngularMaterialModule]
    })
      .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [SessionExpiradaDialogComponent] } })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
