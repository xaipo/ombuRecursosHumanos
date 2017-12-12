import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalidadTrabajoComponent } from './modalidad-trabajo.component';

describe('ModalidadTrabajoComponent', () => {
  let component: ModalidadTrabajoComponent;
  let fixture: ComponentFixture<ModalidadTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalidadTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalidadTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
