import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasAptComponent } from './preguntas-apt.component';

describe('PreguntasAptComponent', () => {
  let component: PreguntasAptComponent;
  let fixture: ComponentFixture<PreguntasAptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntasAptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntasAptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
