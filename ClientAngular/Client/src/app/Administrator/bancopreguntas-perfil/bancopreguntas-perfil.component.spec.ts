import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BancopreguntasPerfilComponent } from './bancopreguntas-perfil.component';

describe('BancopreguntasPerfilComponent', () => {
  let component: BancopreguntasPerfilComponent;
  let fixture: ComponentFixture<BancopreguntasPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancopreguntasPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancopreguntasPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
