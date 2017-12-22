import { TestBed, inject } from '@angular/core/testing';

import { VacanteService } from './vacante.service';

describe('VacanteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VacanteService]
    });
  });

  it('should be created', inject([VacanteService], (service: VacanteService) => {
    expect(service).toBeTruthy();
  }));
});
