import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TerminalObject } from 'src/app/model/terminalObject';
import { TerminalService } from 'src/app/shared/terminal.service';
import { VendorService } from 'src/app/shared/vendor.service';

@Component({
  selector: 'app-display-terminal',
  templateUrl: './display-terminal.component.html',
  styleUrls: ['./display-terminal.component.css']
})
export class DisplayTerminalComponent implements OnInit{

  terminalObjects: TerminalObject[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(
      private fb: FormBuilder,
      protected router: Router,
      private terminalService: TerminalService,
    ) {}



  ngOnInit(): void {
    this.loadTerminalswNames();
  }

  loadTerminalswNames(): void {
    this.loading = true;
    this.terminalService.getAllTerminalWithNames().subscribe({
      next: (data) => {
        this.terminalObjects = data;
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

}
