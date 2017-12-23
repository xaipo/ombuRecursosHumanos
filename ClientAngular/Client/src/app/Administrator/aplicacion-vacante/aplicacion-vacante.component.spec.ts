import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicacionVacanteComponent } from './aplicacion-vacante.component';

describe('AplicacionVacanteComponent', () => {
  let component: AplicacionVacanteComponent;
  let fixture: ComponentFixture<AplicacionVacanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AplicacionVacanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicacionVacanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
