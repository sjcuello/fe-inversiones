import { TestBed } from '@angular/core/testing';

import { CanActivateService } from './can-activate.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CanActivateService', () => {
  let service: CanActivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ]
    });
    service = TestBed.inject(CanActivateService);
  });

  it('Debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });
});
