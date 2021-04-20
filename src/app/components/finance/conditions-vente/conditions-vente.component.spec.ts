import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsVenteComponent } from './conditions-vente.component';

describe('ConditionsVenteComponent', () => {
  let component: ConditionsVenteComponent;
  let fixture: ComponentFixture<ConditionsVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionsVenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
