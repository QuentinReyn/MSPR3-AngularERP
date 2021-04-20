import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhFinanceComponent } from './rh-finance.component';

describe('RhFinanceComponent', () => {
  let component: RhFinanceComponent;
  let fixture: ComponentFixture<RhFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RhFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RhFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
