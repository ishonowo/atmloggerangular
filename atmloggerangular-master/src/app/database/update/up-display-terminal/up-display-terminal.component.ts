import { Component, OnInit } from '@angular/core';
import { Terminal } from 'src/app/model/terminal';
import { VNameOption } from 'src/app/model/vNameOption';
import { InsertTerminalComponent } from '../../insert/insert-terminal/insert-terminal.component';
import { TerminalService } from 'src/app/shared/terminal.service';
import { VendorService } from 'src/app/shared/vendor.service';
import { TerminalWName } from 'src/app/model/terminalWName';

@Component({
  selector: 'app-up-display-terminal',
  templateUrl: './up-display-terminal.component.html',
  styleUrls: ['./up-display-terminal.component.css']
})

export class UpDisplayTerminalComponent implements OnInit {
  terminals: TerminalWName[] = [];
  loading: boolean = true;
  error: string = '';
  selectedTerminal: TerminalWName | null = null;

  constructor(
    private terminalService: TerminalService
  ) {}

  ngOnInit(){
    this.loadTerminals();
  }


  loadTerminals(): void {
    this.loading = true;
    this.terminalService.getAllTerminalwNames().subscribe({
      next: (data) => {
        this.terminals = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading regions';
        this.loading = false;
        console.error('Error:', error);
      },
    });
  }

  onSelect(terminal: TerminalWName): void {
    this.selectedTerminal = terminal;
  }

  onUpdateComplete(): void {
    this.loadTerminals();
    this.selectedTerminal = null; // Close the form
    console.log('Update complete and terminals refreshed');
  }
} 
