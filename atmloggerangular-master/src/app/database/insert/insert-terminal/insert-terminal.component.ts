import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Terminal } from 'src/app/model/terminal';
import { TerminalObj } from 'src/app/model/terminalObj';
import { TerminalObject } from 'src/app/model/terminalObject';
import { TerminalService } from 'src/app/shared/terminal.service';

@Component({
  selector: 'app-insert-terminal',
  templateUrl: './insert-terminal.component.html',
  styleUrls: ['./insert-terminal.component.css'],
})
export class InsertTerminalComponent implements OnInit {
  public terminalInsertForm!: FormGroup;
  protected isClicked: boolean = false;
  public vendorName: string = '';
  public shortName: string = '';
  private terminal: Terminal = {
    id: 0,
    vendorId: 0,
    terminalId: '',
    atmName: '',
    offsite: false,
  };
  private terminalObject: TerminalObject = {
    vendorName: '',
    id: 0,
    terminalId: '',
    atmName: '',
    offsite: false,
  };
  private terminalObj: TerminalObj = {
    vendorId: 0,
    terminalId: '',
    atmName: '',
    offsite: false,
  };

  terminals: Terminal[] = [];
  terminalObjects: TerminalObject[]=[];
  loading: boolean = true;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    protected router: Router,
    private terminalService: TerminalService
  ) {
    this.terminalInsertForm = this.fb.group({
      // id: [
      //   '',
      //   [Validators.required, CustomValidators.noSpaceAllowed],
      //   [CustomValidators.verifyRegionID(this.regionService)],
      // ],
      vendorName:['',Validators.required],
      terminalId: ['', [Validators.required]],
      atmName: ['', [Validators.required]],
      offsite:[false,Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTerminalswNames();
  }

/*  loadTerminals(): void {
    this.loading = true;
    this.terminalService.getAllTerminals().subscribe({
      next: (data) => {
        this.terminals = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading terminals';
        this.loading = false;
        console.error('Error:', error);
      },
      complete:() => {
        console.log('Finished with all terminals.');
      }
    });
  }*/

  loadTerminalswNames(): void {
    this.loading = true;
    this.terminalService.getAllTerminalwNames().subscribe({
      next: (data) => {
        this.terminalObjects = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading terminals with names';
        this.loading = false;
        console.error('Error:', error);
      },
      complete:() => {
        console.log('Finished with all terminals with names.');
      }
    });
  }

  terminalInsert(): void {
    console.log(this.terminalInsertForm);
    if (this.terminalInsertForm.valid) {
      this.terminalObj = {
      vendorId : this.terminalInsertForm.get('vendorId')?.value,
      terminalId : this.terminalInsertForm.get('terminalId')?.value, 
      atmName : this.terminalInsertForm.get('atmName')?.value,  
      offsite : this.terminalInsertForm.get('offsite')?.value,
      }  

        this.terminalService.insertTerminal(this.terminalObj).subscribe({
          next: (response) => {
            console.log('Terminal inserted successfully', response);
            // Reset form after successful submission
            this.terminalInsertForm.reset();
            // You can add success message here
          },
          error: (error) => {
            console.error('Error inserting terminal', error);
            // Handle error (show error message to user)
          },
          complete: () => {
            console.log('Done with terminal insert.');
          },
        });
    } else {
      // Mark all fields as touched to trigger validation display
      Object.keys(this.terminalInsertForm.controls).forEach((key) => {
        const control = this.terminalInsertForm.get(key);
        control?.markAsTouched();
      });
    }
  }

}
