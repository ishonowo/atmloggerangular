import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertRegionComponent } from './insert-region.component';

describe('InsertRegionComponent', () => {
  let component: InsertRegionComponent;
  let fixture: ComponentFixture<InsertRegionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertRegionComponent]
    });
    fixture = TestBed.createComponent(InsertRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
