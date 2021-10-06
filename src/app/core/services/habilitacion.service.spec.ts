import { TestBed } from '@angular/core/testing';

import { HabilitacionService } from './habilitacion.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SettingsService } from './settings.service';

describe('HabilitacionService', () => {
  let habilitacionService: HabilitacionService;
  let httpMock: HttpTestingController;
  const settingsServiceMock = {
    settings: {
      backendUrl: 'http://localhost:5000/api/'
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: SettingsService, useValue: settingsServiceMock }
      ]
    });
    habilitacionService = TestBed.inject(HabilitacionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('debería ser creado', () => {
    expect(habilitacionService).toBeTruthy();
  });

  it('deberia llamar con GET a endpoint de habilitaciones para saber si el usuario esta habilitado', () => {
    const feature = 'transferencias';
    const responseMock = { esta_habilitado: true };

    habilitacionService.estaHabilitado(feature).subscribe((response) => {
      expect(response).toEqual(responseMock);
    });

    const httpRequest = httpMock.expectOne('http://localhost:5000/api/habilitaciones/' + feature);
    expect(httpRequest.request.method).toBe('GET');
    httpRequest.flush(responseMock);
    httpMock.verify();
  });
});
