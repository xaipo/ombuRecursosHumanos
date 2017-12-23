import { TestBed, inject } from '@angular/core/testing';

import { EvaluacionDesempenoService } from './evaluacion-desempeno.service';

describe('EvaluacionDesempenoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvaluacionDesempenoService]
    });
  });

  it('should be created', inject([EvaluacionDesempenoService], (service: EvaluacionDesempenoService) => {
    expect(service).toBeTruthy();
  }));
});
