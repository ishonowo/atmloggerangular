import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTerminalComponent } from './display-terminal.component';

describe('DisplayTerminalComponent', () => {
  let component: DisplayTerminalComponent;
  let fixture: ComponentFixture<DisplayTerminalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayTerminalComponent]
    });
    fixture = TestBed.createComponent(DisplayTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
