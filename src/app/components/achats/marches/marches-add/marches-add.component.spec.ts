import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchesAddComponent } from './marches-add.component';

describe('MarchesAddComponent', () => {
  let component: MarchesAddComponent;
  let fixture: ComponentFixture<MarchesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarchesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
