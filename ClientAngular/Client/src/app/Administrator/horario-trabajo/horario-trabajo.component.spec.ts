import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioTrabajoComponent } from './horario-trabajo.component';

describe('HorarioTrabajoComponent', () => {
  let component: HorarioTrabajoComponent;
  let fixture: ComponentFixture<HorarioTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
