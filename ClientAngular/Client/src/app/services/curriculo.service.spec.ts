import { TestBed, inject } from '@angular/core/testing';

import { CurriculoService } from './curriculo.service';

describe('CurriculoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurriculoService]
    });
  });

  it('should be created', inject([CurriculoService], (service: CurriculoService) => {
    expect(service).toBeTruthy();
  }));
});
