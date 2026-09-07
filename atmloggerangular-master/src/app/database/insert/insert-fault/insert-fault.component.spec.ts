import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertFaultComponent } from './insert-fault.component';

describe('InsertFaultComponent', () => {
  let component: InsertFaultComponent;
  let fixture: ComponentFixture<InsertFaultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertFaultComponent]
    });
    fixture = TestBed.createComponent(InsertFaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
