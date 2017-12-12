import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaTrabajoComponent } from './categoria-trabajo.component';

describe('CategoriaTrabajoComponent', () => {
  let component: CategoriaTrabajoComponent;
  let fixture: ComponentFixture<CategoriaTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
