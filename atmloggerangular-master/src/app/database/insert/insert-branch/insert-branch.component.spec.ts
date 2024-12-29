import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertBranchComponent } from './insert-branch.component';

describe('InsertBranchComponent', () => {
  let component: InsertBranchComponent;
  let fixture: ComponentFixture<InsertBranchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertBranchComponent]
    });
    fixture = TestBed.createComponent(InsertBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
