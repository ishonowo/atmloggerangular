import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../../validators/custom.validators';
import { SolValidationService } from '../../../shared/sol-validation.service';
import { RNameOption } from 'src/app/model/rNameOption';
import { BranchService } from 'src/app/shared/branch.service';
import { RegionService } from 'src/app/shared/region.service';
import { BranchObj } from 'src/app/model/branchObj';

@Component({
  selector: 'app-insert-branch',
  templateUrl: './insert-branch.component.html',
  styleUrls: ['./insert-branch.component.css']
})
export class InsertBranchComponent {

  public branchInsertForm!: FormGroup;
  protected isClicked: boolean = false;

  protected branchObj?: BranchObj;

  protected rNameOptions: RNameOption[] = [];
  protected loading: boolean = false;
error: any;

  constructor(
    private fb: FormBuilder,
    protected router: Router,
    private solValidationService: SolValidationService,
    private branchService: BranchService,
    private regionService: RegionService
  ) {
    this.branchInsertForm = this.fb.group({
        solId: [
          '',
          [
            Validators.required,
            CustomValidators.noSpaceAllowed,
            CustomValidators.solID, 
          ],[CustomValidators.verifySolID(this.solValidationService),]
        ],
        branchEmail: ['', [Validators.required, Validators.email]],
        physicalAddress: ['', Validators.required],
        branchName: ['', Validators.required],// CustomValidators.verifyBranch],
        regionId: ['', [Validators.required]]//,CustomValidators.verifyRegionID]],
    });
  }


  ngOnInit(): void {
    this.loadRNameOptions();
  }

  loadRNameOptions() {
    this.loading = true;
    this.regionService.getAllRegions().subscribe({
      next: (rNameOptions) => {
        this.rNameOptions = rNameOptions;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.error('Error loading regions:', error);
      },
      complete: () => {
        console.log('Finished fetching region options');
      },
    });
  }

  branchInsert() {
    console.log(this.branchInsertForm);
    if (this.branchInsertForm.valid) {
      this.branchObj = {
        regionId: this.branchInsertForm.get('regionId')?.value,
        branchEmail: this.branchInsertForm.get('branchEmail')?.value,
        branchName: this.branchInsertForm.get('branchName')?.value,
        physicalAddress: this.branchInsertForm.get('physicalAddress')?.value,
        solId: this.branchInsertForm.get('solId')?.value,
      };
      this.branchService.insertBranch(this.branchObj).subscribe({
        next: (response) => {
          console.log('New Branch info inserted successfully', response);
          // Reset form after successful submission
          this.branchInsertForm.reset();
          // You can add success message here
        },
        error: (error) => {
          console.error('Error inserting branch', error);
          // Handle error (show error message to user)
        },
        complete: () => {
          console.log('Done with branch insert.');
          this.router.navigate(['/insert-branch']);
        },
      });
    } else {
      // Mark all fields as touched to trigger validation display
      Object.keys(this.branchInsertForm.controls).forEach((key) => {
        const control = this.branchInsertForm.get(key);
        control?.markAsTouched();
      });
    }
    }
    

}
