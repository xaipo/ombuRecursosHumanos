import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApicacionInduccionComponent } from './apicacion-induccion.component';

describe('ApicacionInduccionComponent', () => {
  let component: ApicacionInduccionComponent;
  let fixture: ComponentFixture<ApicacionInduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApicacionInduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApicacionInduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
