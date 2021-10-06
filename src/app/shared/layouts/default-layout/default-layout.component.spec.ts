import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLayoutComponent } from './default-layout.component';
import { Component } from '@angular/core';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NotificationDrawerComponent } from '../../components/notification-drawer/notification-drawer.component';
import { AngularMaterialModule } from '../../../angular-material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleAnalyticsService } from '../../../core/services/google-analytics.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DefaultLayoutComponent', () => {
  @Component({ selector: 'shared-header', template: '' })
  class MockHeaderComponent { }

  @Component({ selector: 'shared-tooltip-nuevo-menu', template: '' })
  class MockToolTipNuevoMenuComponent { }

  let component: DefaultLayoutComponent;
  let fixture: ComponentFixture<DefaultLayoutComponent>;
  const mockGoogleAnalyticsService = {
    abrioMenu: jest.fn(),
    cerroMenu: jest.fn(),
    clickEnMenu: jest.fn()
  };

  const mockJwtHelperService = {
    getTokenExpirationDate: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultLayoutComponent, SideMenuComponent, MockToolTipNuevoMenuComponent,
        MockHeaderComponent, FooterComponent, NotificationDrawerComponent],
      imports: [BrowserAnimationsModule, AngularMaterialModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: GoogleAnalyticsService, useValue: mockGoogleAnalyticsService },
        { provide: JwtHelperService, useValue: mockJwtHelperService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
