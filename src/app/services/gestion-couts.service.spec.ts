import { TestBed } from '@angular/core/testing';

import { GestionCoutsService } from './gestion-couts.service';

describe('GestionCoutsService', () => {
  let service: GestionCoutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionCoutsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
