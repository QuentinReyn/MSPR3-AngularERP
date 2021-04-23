import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceHumainesComponent } from './ressource-humaines.component';

describe('RessourceHumainesComponent', () => {
  let component: RessourceHumainesComponent;
  let fixture: ComponentFixture<RessourceHumainesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RessourceHumainesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RessourceHumainesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
