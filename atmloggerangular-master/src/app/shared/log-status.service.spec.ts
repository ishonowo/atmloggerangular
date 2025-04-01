import { TestBed } from '@angular/core/testing';

import { LogStatusService } from './log-status.service';

describe('LogStatusService', () => {
  let service: LogStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
