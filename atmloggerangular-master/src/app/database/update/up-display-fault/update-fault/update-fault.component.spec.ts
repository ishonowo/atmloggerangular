import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFaultComponent } from './update-fault.component';

describe('UpdateFaultComponent', () => {
  let component: UpdateFaultComponent;
  let fixture: ComponentFixture<UpdateFaultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateFaultComponent]
    });
    fixture = TestBed.createComponent(UpdateFaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
