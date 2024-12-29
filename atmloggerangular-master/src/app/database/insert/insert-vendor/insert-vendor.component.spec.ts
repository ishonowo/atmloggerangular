import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertVendorComponent } from './insert-vendor.component';

describe('InsertVendorComponent', () => {
  let component: InsertVendorComponent;
  let fixture: ComponentFixture<InsertVendorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertVendorComponent]
    });
    fixture = TestBed.createComponent(InsertVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
