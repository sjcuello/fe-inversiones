import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SettingsHttpService } from './settings-http.service';
import { AuthService } from './auth.service';

describe('SettingsHttpService', () => {
  let mockAuthService;

  beforeEach(() => {

    mockAuthService = {
        fetchToken: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SettingsHttpService,
        { provide: AuthService, useValue: mockAuthService }
      ]
    });
  });

  it('should be created', () => {
    const service: SettingsHttpService = TestBed.inject(SettingsHttpService);
    expect(service).toBeTruthy();
  });
});
