import { TestBed, inject } from '@angular/core/testing';

import { BancopreguntasPerfilService } from './bancopreguntas-perfil.service';

describe('BancopreguntasPerfilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BancopreguntasPerfilService]
    });
  });

  it('should be created', inject([BancopreguntasPerfilService], (service: BancopreguntasPerfilService) => {
    expect(service).toBeTruthy();
  }));
});
