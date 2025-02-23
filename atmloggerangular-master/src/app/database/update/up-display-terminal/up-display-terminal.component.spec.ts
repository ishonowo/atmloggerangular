import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpDisplayTerminalComponent } from './up-display-terminal.component';

describe('UpDisplayTerminalComponent', () => {
  let component: UpDisplayTerminalComponent;
  let fixture: ComponentFixture<UpDisplayTerminalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpDisplayTerminalComponent]
    });
    fixture = TestBed.createComponent(UpDisplayTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
