import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpDisplayFaultComponent } from './up-display-fault.component';

describe('UpDisplayFaultComponent', () => {
  let component: UpDisplayFaultComponent;
  let fixture: ComponentFixture<UpDisplayFaultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpDisplayFaultComponent]
    });
    fixture = TestBed.createComponent(UpDisplayFaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
