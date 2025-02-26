import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpDisplayBranchComponent } from './up-display-branch.component';

describe('UpDisplayBranchComponent', () => {
  let component: UpDisplayBranchComponent;
  let fixture: ComponentFixture<UpDisplayBranchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpDisplayBranchComponent]
    });
    fixture = TestBed.createComponent(UpDisplayBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
