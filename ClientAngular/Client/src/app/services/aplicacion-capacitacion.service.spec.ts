import { TestBed, inject } from '@angular/core/testing';

import { AplicacionCapacitacionService } from './aplicacion-capacitacion.service';

describe('AplicacionCapacitacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AplicacionCapacitacionService]
    });
  });

  it('should be created', inject([AplicacionCapacitacionService], (service: AplicacionCapacitacionService) => {
    expect(service).toBeTruthy();
  }));
});
