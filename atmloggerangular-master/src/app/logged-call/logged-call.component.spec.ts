import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedCallComponent } from './logged-call.component';

describe('LoggedCallComponent', () => {
  let component: LoggedCallComponent;
  let fixture: ComponentFixture<LoggedCallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggedCallComponent]
    });
    fixture = TestBed.createComponent(LoggedCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
