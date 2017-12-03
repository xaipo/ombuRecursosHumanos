import { TestBed, inject } from '@angular/core/testing';

import { PerfilTrabajoService } from './perfil-trabajo.service';

describe('PerfilTrabajoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerfilTrabajoService]
    });
  });

  it('should be created', inject([PerfilTrabajoService], (service: PerfilTrabajoService) => {
    expect(service).toBeTruthy();
  }));
});
