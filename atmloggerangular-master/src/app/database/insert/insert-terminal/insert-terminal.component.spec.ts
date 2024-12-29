import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertTerminalComponent } from './insert-terminal.component';

describe('InsertTerminalComponent', () => {
  let component: InsertTerminalComponent;
  let fixture: ComponentFixture<InsertTerminalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertTerminalComponent]
    });
    fixture = TestBed.createComponent(InsertTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
