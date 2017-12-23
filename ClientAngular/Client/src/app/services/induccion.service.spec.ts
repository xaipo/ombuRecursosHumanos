import { TestBed, inject } from '@angular/core/testing';

import { InduccionService } from './induccion.service';

describe('InduccionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InduccionService]
    });
  });

  it('should be created', inject([InduccionService], (service: InduccionService) => {
    expect(service).toBeTruthy();
  }));
});
