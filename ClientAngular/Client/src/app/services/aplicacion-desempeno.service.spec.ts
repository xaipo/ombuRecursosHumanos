import { TestBed, inject } from '@angular/core/testing';

import { AplicacionDesempenoService } from './aplicacion-desempeno.service';

describe('AplicacionDesempenoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AplicacionDesempenoService]
    });
  });

  it('should be created', inject([AplicacionDesempenoService], (service: AplicacionDesempenoService) => {
    expect(service).toBeTruthy();
  }));
});
