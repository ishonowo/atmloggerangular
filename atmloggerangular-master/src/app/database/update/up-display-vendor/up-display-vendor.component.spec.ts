import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpDisplayVendorComponent } from './up-display-vendor.component';

describe('UpDisplayVendorComponent', () => {
  let component: UpDisplayVendorComponent;
  let fixture: ComponentFixture<UpDisplayVendorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpDisplayVendorComponent]
    });
    fixture = TestBed.createComponent(UpDisplayVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
