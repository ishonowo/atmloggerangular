import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVendorContactComponent } from './update-vendor-contact.component';

describe('UpdateVendorContactComponent', () => {
  let component: UpdateVendorContactComponent;
  let fixture: ComponentFixture<UpdateVendorContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateVendorContactComponent]
    });
    fixture = TestBed.createComponent(UpdateVendorContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
