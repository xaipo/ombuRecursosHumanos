import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApicacionCapacitacionComponent } from './apicacion-capacitacion.component';

describe('ApicacionCapacitacionComponent', () => {
  let component: ApicacionCapacitacionComponent;
  let fixture: ComponentFixture<ApicacionCapacitacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApicacionCapacitacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApicacionCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
