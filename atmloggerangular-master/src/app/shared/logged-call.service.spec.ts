import { TestBed } from '@angular/core/testing';

import { LoggedCallService } from './logged-call.service';

describe('LoggedCallService', () => {
  let service: LoggedCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
