import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasTecComponent } from './preguntas-tec.component';

describe('PreguntasTecComponent', () => {
  let component: PreguntasTecComponent;
  let fixture: ComponentFixture<PreguntasTecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntasTecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntasTecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
