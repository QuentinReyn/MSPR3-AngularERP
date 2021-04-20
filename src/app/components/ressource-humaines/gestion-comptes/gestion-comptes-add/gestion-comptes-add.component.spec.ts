import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionComptesAddComponent } from './gestion-comptes-add.component';

describe('GestionComptesAddComponent', () => {
  let component: GestionComptesAddComponent;
  let fixture: ComponentFixture<GestionComptesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionComptesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionComptesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
