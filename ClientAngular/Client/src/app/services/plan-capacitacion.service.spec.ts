import { TestBed, inject } from '@angular/core/testing';

import { PlanCapacitacionService } from './plan-capacitacion.service';

describe('PlanCapacitacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanCapacitacionService]
    });
  });

  it('should be created', inject([PlanCapacitacionService], (service: PlanCapacitacionService) => {
    expect(service).toBeTruthy();
  }));
});
