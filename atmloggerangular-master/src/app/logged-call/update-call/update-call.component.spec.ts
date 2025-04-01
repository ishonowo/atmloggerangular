import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCallComponent } from './update-call.component';

describe('UpdateCallComponent', () => {
  let component: UpdateCallComponent;
  let fixture: ComponentFixture<UpdateCallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCallComponent]
    });
    fixture = TestBed.createComponent(UpdateCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
