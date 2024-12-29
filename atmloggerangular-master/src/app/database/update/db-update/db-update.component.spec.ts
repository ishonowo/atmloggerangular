import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbUpdateComponent } from './db-update.component';

describe('DbUpdateComponent', () => {
  let component: DbUpdateComponent;
  let fixture: ComponentFixture<DbUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DbUpdateComponent]
    });
    fixture = TestBed.createComponent(DbUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
