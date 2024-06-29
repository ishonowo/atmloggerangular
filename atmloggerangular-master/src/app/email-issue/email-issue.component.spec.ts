import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailIssueComponent } from './email-issue.component';

describe('EmailIssueComponent', () => {
  let component: EmailIssueComponent;
  let fixture: ComponentFixture<EmailIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
