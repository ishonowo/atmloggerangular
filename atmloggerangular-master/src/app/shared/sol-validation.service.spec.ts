import { TestBed } from '@angular/core/testing';

import { SolValidationService } from './sol-validation.service';

describe('SolValidationService', () => {
  let service: SolValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
