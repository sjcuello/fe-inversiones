import { TestBed } from '@angular/core/testing';

import { GoogleAnalyticsService } from './google-analytics.service';
import { ClienteService } from './cliente.service';
import { SettingsService } from './settings.service';
import { of } from 'rxjs';

describe('GoogleAnalyticsService', () => {
  let service: GoogleAnalyticsService;
  let mockClienteService;
  let mockSettingsService;

  beforeEach(() => {

    mockClienteService = {
      getcliente$: jest.fn()
    };

    const mockCliente = {
      persona_id : '12346'
    };

    mockClienteService.getcliente$.mockReturnValue(of(mockCliente));

    mockSettingsService = {
      settings: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ClienteService, useValue: mockClienteService },
        { provide: SettingsService, useValue: mockSettingsService }
      ]
    });
    service = TestBed.inject(GoogleAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
