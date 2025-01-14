import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/model/vendor';
import { VendorObj } from 'src/app/model/vendorObj';
import { VendorService } from 'src/app/shared/vendor.service';

@Component({
  selector: 'app-insert-vendor',
  templateUrl: './insert-vendor.component.html',
  styleUrls: ['./insert-vendor.component.css'],
})
export class InsertVendorComponent {
  public vendorInsertForm!: FormGroup;
  protected isClicked: boolean = false;
  public vendorObj: VendorObj={
    vendorName:'',
    shortName:''
  };
  

  constructor(
    private fb: FormBuilder,
    protected router: Router,
    private vendorService: VendorService
  ) {
    this.vendorInsertForm = this.fb.group({
      // id: [
      //   '',
      //   [Validators.required, CustomValidators.noSpaceAllowed],
      //   [CustomValidators.verifyRegionID(this.regionService)],
      // ],
      vendorName: ['', [Validators.required]],
      shortName: ['', [Validators.required]],
    });
  }

  

  
  
  
  vendorInsert(): void {
    console.log(this.vendorInsertForm);
    if (this.vendorInsertForm.valid) {
      this.vendorObj = {
        vendorName: this.vendorInsertForm.get('vendorName')?.value,
        shortName: this.vendorInsertForm.get('shortName')?.value,
      };

      //};
      //console.log(this.region);
      this.vendorService
        .insertVendor(this.vendorObj)
        .subscribe({
          next: (response) => {
            console.log('Vendor inserted successfully', response);
            // Reset form after successful submission
            this.vendorInsertForm.reset();
            // You can add success message here
          },
          error: (error) => {
            console.error('Error inserting vendor', error);
            // Handle error (show error message to user)
          },
          complete: () => {
            console.log('Done with vendor insert.');
          },
        });
    } else {
      // Mark all fields as touched to trigger validation display
      Object.keys(this.vendorInsertForm.controls).forEach((key) => {
        const control = this.vendorInsertForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
