import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Terminal } from 'src/app/model/terminal';
import { TerminalObj } from 'src/app/model/terminalObj';
import { TerminalObject } from 'src/app/model/terminalObject';
import { VNameOption } from 'src/app/model/vNameOption';
import { TerminalService } from 'src/app/shared/terminal.service';
import { VendorService } from 'src/app/shared/vendor.service';

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
  private terminalObj: TerminalObj = {
    vendorId: 0,
    terminalId: '',
    atmName: '',
    offsite: false,
  };

  loading: boolean = true;
  error: string = '';

  vNameOptions: VNameOption[] = [];
  // selectedId: number|null = null;

  constructor(
    private fb: FormBuilder,
    protected router: Router,
    private terminalService: TerminalService,
    private vendorService: VendorService
  ) {
    this.terminalInsertForm = this.fb.group({
      // id: [
      //   '',
      //   [Validators.required, CustomValidators.noSpaceAllowed],
      //   [CustomValidators.verifyRegionID(this.regionService)],
      // ],
      vendorId: ['', Validators.required],
      terminalId: ['', [Validators.required]],
      atmName: ['', [Validators.required]],
      offsite: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadVNameOptions();
  }

  loadVNameOptions() {
    this.loading = true;
    this.vendorService.getAllNames().subscribe({
      next: (vNameOptions) => {
        this.vNameOptions = vNameOptions;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading names '+error;
        this.loading = false;
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Finished fetching name options');
      },
    });
  }
  
  terminalInsert(): void {
    console.log(this.terminalInsertForm);
    if (this.terminalInsertForm.valid) {
      this.terminalObj = {
        vendorId: this.terminalInsertForm.get('vendorId')?.value,
        terminalId: this.terminalInsertForm.get('terminalId')?.value,
        atmName: this.terminalInsertForm.get('atmName')?.value,
        offsite: this.terminalInsertForm.get('offsite')?.value,
      };
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
