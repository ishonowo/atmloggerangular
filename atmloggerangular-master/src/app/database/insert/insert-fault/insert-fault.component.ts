import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AtmFault } from 'src/app/model/atmfault';
import { AtmFaultObj } from 'src/app/model/atmfaultObj';
import { AtmFaultService } from 'src/app/shared/atm-fault.service';

@Component({
  selector: 'app-insert-fault',
  templateUrl: './insert-fault.component.html',
  styleUrls: ['./insert-fault.component.css']
})
export class InsertFaultComponent implements OnInit  {
  public faultInsertForm!: FormGroup;
  protected faultToInsert: AtmFaultObj = {
    natureOfFault: '',
    description: '',
    faultType: '',
  };
  protected error: string = '';
  loading: boolean=false;
  protected faults: AtmFault[]=[];

  constructor(
    private fb: FormBuilder,
    protected router: Router,
    private faultService: AtmFaultService
  ) {
    this.faultInsertForm = this.fb.group({
      natureOfFault: ['', [Validators.required]],
      description: ['', [Validators.required]],
      faultType: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadFaults();
  }

  loadFaults(): void{
    this.loading=true;
    this.faultService.getAllFaults().subscribe({
      next: (data) => {
        this.faults=data;
        this.loading=false;
      },
      error: (error) =>{
        this.error='Error loading ATM fault list.';
        this.loading=false;
        console.error('Error:', error);
      },
      complete:() => {
        console.log('Finished with fetching all ATM faults.');
      }
    })
  }

  faultInsert(): void{
    console.log(this.faultInsertForm);
    if(this.faultInsertForm.valid){
      this.faultToInsert = {
        natureOfFault: this.faultInsertForm.get('natureOfFault')?.value,
        description: this.faultInsertForm.get('description')?.value,
        faultType: this.faultInsertForm.get('faultType')?.value,
      };
      this.faultService.insertFault(this.faultToInsert).subscribe({
        next: (response) => {
          console.log('Fault inserted successfully', response);
          // Reset form after successful submission
          this.faultInsertForm.reset();
          // You can add success message here
        },
        error: (error) => {
          console.error('Error inserting fault', error);
          // Handle error (show error message to user)
        },
        complete: () => {
          console.log('Done with ATM fault insert.');
          this.loadFaults();
        },
      });
    } else {
      // Mark all fields as touched to trigger validation display
      Object.keys(this.faultInsertForm.controls).forEach((key) => {
        const control = this.faultInsertForm.get(key);
        control?.markAsTouched();
      });
    }
  }
  
}
