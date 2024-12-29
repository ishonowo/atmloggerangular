import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertContactComponent } from './insert-contact.component';

describe('InsertContactComponent', () => {
  let component: InsertContactComponent;
  let fixture: ComponentFixture<InsertContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertContactComponent]
    });
    fixture = TestBed.createComponent(InsertContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
