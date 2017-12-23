import { TestBed, inject } from '@angular/core/testing';

import { PreguntasTecService } from './preguntas-tec.service';

describe('PreguntasTecService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreguntasTecService]
    });
  });

  it('should be created', inject([PreguntasTecService], (service: PreguntasTecService) => {
    expect(service).toBeTruthy();
  }));
});
