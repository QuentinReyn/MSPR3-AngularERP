import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCoutsComponent } from './gestion-couts.component';

describe('GestionCoutsComponent', () => {
  let component: GestionCoutsComponent;
  let fixture: ComponentFixture<GestionCoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCoutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
