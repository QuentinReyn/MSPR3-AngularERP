import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsVenteAddComponent } from './conditions-vente-add.component';

describe('ConditionsVenteAddComponent', () => {
  let component: ConditionsVenteAddComponent;
  let fixture: ComponentFixture<ConditionsVenteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionsVenteAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsVenteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
