import { TestBed, inject } from '@angular/core/testing';

import { HorarioTrabajoService } from './horario-trabajo.service';

describe('HorarioTrabajoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HorarioTrabajoService]
    });
  });

  it('should be created', inject([HorarioTrabajoService], (service: HorarioTrabajoService) => {
    expect(service).toBeTruthy();
  }));
});
