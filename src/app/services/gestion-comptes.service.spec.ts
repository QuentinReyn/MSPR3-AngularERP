import { TestBed } from '@angular/core/testing';

import { GestionComptesService } from './gestion-comptes.service';

describe('GestionComptesService', () => {
  let service: GestionComptesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionComptesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
