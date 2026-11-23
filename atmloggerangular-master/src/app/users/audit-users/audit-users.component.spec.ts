import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditUsersComponent } from './audit-users.component';

describe('AuditUsersComponent', () => {
  let component: AuditUsersComponent;
  let fixture: ComponentFixture<AuditUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditUsersComponent]
    });
    fixture = TestBed.createComponent(AuditUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
