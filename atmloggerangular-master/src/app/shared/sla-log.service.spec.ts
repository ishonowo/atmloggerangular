import { TestBed } from '@angular/core/testing';

import { SlaLogService } from './sla-log.service';

describe('SlaLogService', () => {
  let service: SlaLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlaLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
