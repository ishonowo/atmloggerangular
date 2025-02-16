import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpDisplayContactComponent } from './up-display-contact.component';

describe('UpDisplayContactComponent', () => {
  let component: UpDisplayContactComponent;
  let fixture: ComponentFixture<UpDisplayContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpDisplayContactComponent]
    });
    fixture = TestBed.createComponent(UpDisplayContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
