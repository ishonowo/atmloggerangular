import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Region } from 'src/app/model/region';
import { RegionService } from 'src/app/shared/region.service';
import { CustomValidators } from 'src/app/validators/custom.validators';
//import { CustomValidators } from 'src/app/validators/custom.validators';

@Component({
  selector: 'app-insert-region',
  templateUrl: './insert-region.component.html',
  styleUrls: ['./insert-region.component.css'],
})
export class InsertRegionComponent{
  public regionInsertForm!: FormGroup;
  public regionName: string = '';
  error: string = '';

  constructor(
    private fb: FormBuilder,
    protected router: Router,
    private regionService: RegionService
  ) {
    this.regionInsertForm = this.fb.group({
  
      regionName: ['', [Validators.required]],
    });
  }

  
  regionInsert(): void {
    console.log(this.regionInsertForm);
    if (this.regionInsertForm.valid) {
      // this.region = {
      //   id: this.regionInsertForm.get('id')?.value,
      this.regionName = this.regionInsertForm.get('regionName')?.value;
        //};
        //console.log(this.region);
        this.regionService.insertRegion(this.regionName).subscribe({
          next: (response) => {
            console.log('Region inserted successfully', response);
            // Reset form after successful submission
            this.regionInsertForm.reset();
            // You can add success message here
          },
          error: (error) => {
            console.error('Error inserting region', error);
            // Handle error (show error message to user)
          },
          complete: () => {
            console.log('Done with region insert.');
          },
        });
    } else {
      // Mark all fields as touched to trigger validation display
      Object.keys(this.regionInsertForm.controls).forEach((key) => {
        const control = this.regionInsertForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
