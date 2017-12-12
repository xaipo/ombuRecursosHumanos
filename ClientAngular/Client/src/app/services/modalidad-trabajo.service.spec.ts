import { TestBed, inject } from '@angular/core/testing';
import { ModalidadTrabajoService } from './modalidad-trabajo.service';

describe('ModalidadTrabajoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalidadTrabajoService]
    });
  });

  it('should be created', inject([ModalidadTrabajoService], (service: ModalidadTrabajoService) => {
    expect(service).toBeTruthy();
  }));
});
