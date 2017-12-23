import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApicacionDesempenoComponent } from './apicacion-desempeno.component';

describe('ApicacionDesempenoComponent', () => {
  let component: ApicacionDesempenoComponent;
  let fixture: ComponentFixture<ApicacionDesempenoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApicacionDesempenoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApicacionDesempenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
