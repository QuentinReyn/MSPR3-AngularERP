import { TestBed } from '@angular/core/testing';

import { ConditionsVenteService } from './conditions-vente.service';

describe('ConditionsVenteService', () => {
  let service: ConditionsVenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConditionsVenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
