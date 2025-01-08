import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBranchInfoComponent } from './display-branch-info.component';

describe('DisplayBranchInfoComponent', () => {
  let component: DisplayBranchInfoComponent;
  let fixture: ComponentFixture<DisplayBranchInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayBranchInfoComponent]
    });
    fixture = TestBed.createComponent(DisplayBranchInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
