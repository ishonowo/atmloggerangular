import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTerminalComponent } from './update-terminal.component';

describe('UpdateTerminalComponent', () => {
  let component: UpdateTerminalComponent;
  let fixture: ComponentFixture<UpdateTerminalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTerminalComponent]
    });
    fixture = TestBed.createComponent(UpdateTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
