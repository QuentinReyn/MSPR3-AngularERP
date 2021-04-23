import { TestBed } from '@angular/core/testing';

import { RhFinanceService } from './rh-finance.service';

describe('RhFinanceService', () => {
  let service: RhFinanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RhFinanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
