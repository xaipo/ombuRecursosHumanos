import { TestBed, inject } from '@angular/core/testing';

import { AplicacionVacanteService } from './aplicacion-vacante.service';

describe('AplicacionVacanteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AplicacionVacanteService]
    });
  });

  it('should be created', inject([AplicacionVacanteService], (service: AplicacionVacanteService) => {
    expect(service).toBeTruthy();
  }));
});
