import { TestBed, inject } from '@angular/core/testing';

import { AplicacionInduccionService } from './aplicacion-induccion.service';

describe('AplicacionInduccionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AplicacionInduccionService]
    });
  });

  it('should be created', inject([AplicacionInduccionService], (service: AplicacionInduccionService) => {
    expect(service).toBeTruthy();
  }));
});
