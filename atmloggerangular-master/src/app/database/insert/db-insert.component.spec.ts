import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbInsertComponent } from './db-insert.component';

describe('DbInsertComponent', () => {
  let component: DbInsertComponent;
  let fixture: ComponentFixture<DbInsertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DbInsertComponent]
    });
    fixture = TestBed.createComponent(DbInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
