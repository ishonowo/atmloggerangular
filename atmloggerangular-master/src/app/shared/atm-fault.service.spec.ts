import { TestBed } from '@angular/core/testing';

import { AtmFaultService } from './atm-fault.service';

describe('AtmFaultService', () => {
  let service: AtmFaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtmFaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
