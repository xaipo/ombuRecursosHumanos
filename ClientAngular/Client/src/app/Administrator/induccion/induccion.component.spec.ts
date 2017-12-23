import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InduccionComponent } from './induccion.component';

describe('InduccionComponent', () => {
  let component: InduccionComponent;
  let fixture: ComponentFixture<InduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
