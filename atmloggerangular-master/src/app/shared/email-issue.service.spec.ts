import { TestBed } from '@angular/core/testing';

import { EmailIssueService } from './email-issue.service';

describe('EmailIssueService', () => {
  let service: EmailIssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailIssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
