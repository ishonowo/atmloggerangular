import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueLoggedComponent } from './issue-logged.component';

describe('IssueLoggedComponent', () => {
  let component: IssueLoggedComponent;
  let fixture: ComponentFixture<IssueLoggedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueLoggedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
