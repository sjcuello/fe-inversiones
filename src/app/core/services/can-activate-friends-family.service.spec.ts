import { TestBed } from '@angular/core/testing';

import { CanActivateFriendsFamilyService } from './can-activate-friends-family.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InversionesService } from '../../modules/inversiones/services/inversiones.service';
import { SettingsService } from './settings.service';
import { AuthService } from './auth.service';

describe('CanActivateFriendsFamilyService', () => {
  let service: CanActivateFriendsFamilyService;

  const settingsServiceMock = {
    settings: {
      backendUrl: 'http://localhost:5000/api/'
    }
  };
  
  const mockAuthService = {
    getToken: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        InversionesService,
        { provide: SettingsService, useValue: settingsServiceMock },
        { provide: AuthService, useValue: mockAuthService }
      ]
    });
    service = TestBed.inject(CanActivateFriendsFamilyService);
  });

  it('Debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });
});
