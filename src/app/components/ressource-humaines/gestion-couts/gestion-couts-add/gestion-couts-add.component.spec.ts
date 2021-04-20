import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCoutsAddComponent } from './gestion-couts-add.component';

describe('GestionCoutsAddComponent', () => {
  let component: GestionCoutsAddComponent;
  let fixture: ComponentFixture<GestionCoutsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCoutsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCoutsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
