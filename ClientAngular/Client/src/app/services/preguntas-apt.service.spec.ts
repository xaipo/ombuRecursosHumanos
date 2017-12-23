import { TestBed, inject } from '@angular/core/testing';

import { PreguntasAptService } from './preguntas-apt.service';

describe('PreguntasAptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreguntasAptService]
    });
  });

  it('should be created', inject([PreguntasAptService], (service: PreguntasAptService) => {
    expect(service).toBeTruthy();
  }));
});
