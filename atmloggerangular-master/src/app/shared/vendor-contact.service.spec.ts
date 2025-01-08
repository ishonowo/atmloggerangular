import { TestBed } from '@angular/core/testing';

import { VendorContactService } from './vendor-contact.service';

describe('VendorContactService', () => {
  let service: VendorContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
