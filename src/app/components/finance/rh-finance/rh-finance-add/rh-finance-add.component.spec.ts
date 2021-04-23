import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhFinanceAddComponent } from './rh-finance-add.component';

describe('RhFinanceAddComponent', () => {
  let component: RhFinanceAddComponent;
  let fixture: ComponentFixture<RhFinanceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RhFinanceAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RhFinanceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
