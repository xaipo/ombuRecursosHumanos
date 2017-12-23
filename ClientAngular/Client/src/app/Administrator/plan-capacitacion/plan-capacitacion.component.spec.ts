import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCapacitacionComponent } from './plan-capacitacion.component';

describe('PlanCapacitacionComponent', () => {
  let component: PlanCapacitacionComponent;
  let fixture: ComponentFixture<PlanCapacitacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanCapacitacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
