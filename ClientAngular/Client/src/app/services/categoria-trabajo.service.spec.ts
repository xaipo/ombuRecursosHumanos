import { TestBed, inject } from '@angular/core/testing';

import { CategoriaTrabajoService } from './categoria-trabajo.service';

describe('CategoriaTrabajoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriaTrabajoService]
    });
  });

  it('should be created', inject([CategoriaTrabajoService], (service: CategoriaTrabajoService) => {
    expect(service).toBeTruthy();
  }));
});
