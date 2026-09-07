import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFaultComponent } from './display-fault.component';

describe('DisplayFaultComponent', () => {
  let component: DisplayFaultComponent;
  let fixture: ComponentFixture<DisplayFaultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayFaultComponent]
    });
    fixture = TestBed.createComponent(DisplayFaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
