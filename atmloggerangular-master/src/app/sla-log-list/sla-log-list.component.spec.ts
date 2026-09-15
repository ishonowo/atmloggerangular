import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaLogListComponent } from './sla-log-list.component';

describe('SlaLogListComponent', () => {
  let component: SlaLogListComponent;
  let fixture: ComponentFixture<SlaLogListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlaLogListComponent]
    });
    fixture = TestBed.createComponent(SlaLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
