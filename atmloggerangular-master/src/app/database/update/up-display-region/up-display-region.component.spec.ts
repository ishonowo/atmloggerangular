import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpDisplayRegionComponent } from './up-display-region.component';

describe('UpDisplayRegionComponent', () => {
  let component: UpDisplayRegionComponent;
  let fixture: ComponentFixture<UpDisplayRegionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpDisplayRegionComponent]
    });
    fixture = TestBed.createComponent(UpDisplayRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
