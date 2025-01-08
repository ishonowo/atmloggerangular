import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRegionComponent } from './display-region.component';

describe('DisplayRegionComponent', () => {
  let component: DisplayRegionComponent;
  let fixture: ComponentFixture<DisplayRegionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayRegionComponent]
    });
    fixture = TestBed.createComponent(DisplayRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
