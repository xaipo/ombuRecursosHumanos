import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilTrabajoComponent } from './perfil-trabajo.component';

describe('PerfilTrabajoComponent', () => {
  let component: PerfilTrabajoComponent;
  let fixture: ComponentFixture<PerfilTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
