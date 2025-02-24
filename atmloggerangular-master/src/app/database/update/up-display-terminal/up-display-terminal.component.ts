import { Component, OnInit } from '@angular/core';
import { TerminalService } from 'src/app/shared/terminal.service';
import { TerminalWithName } from 'src/app/model/terminalWithName';

@Component({
  selector: 'app-up-display-terminal',
  templateUrl: './up-display-terminal.component.html',
  styleUrls: ['./up-display-terminal.component.css']
})

export class UpDisplayTerminalComponent implements OnInit {
  terminals: TerminalWithName[] = [];
  loading: boolean = true;
  error: string = '';
  selectedTerminal: TerminalWithName | null = null;

  constructor(
    private terminalService: TerminalService
  ) {}

  ngOnInit(){
    this.loadTerminalsWithNames();
  }


  loadTerminalsWithNames(): void {
    this.loading = true;
    this.terminalService.getAllTerminalWithNames().subscribe({
      next: (data) => {
        this.terminals = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading terminals with names';
        this.loading = false;
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Finished with all terminals with names.');
      },
    });
  }

  onSelect(terminal: TerminalWithName): void {
    this.selectedTerminal = terminal;
  }

  onUpdateComplete(): void {
    this.loadTerminalsWithNames();
    this.selectedTerminal = null; // Close the form
    console.log('Update complete and terminals refreshed');
  }
} 
