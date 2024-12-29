import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../../validators/custom.validators';
import { SolValidationService } from '../../../shared/sol-validation.service';

@Component({
  selector: 'app-insert-branch',
  templateUrl: './insert-branch.component.html',
  styleUrls: ['./insert-branch.component.css']
})
export class InsertBranchComponent {

  public branchInsertForm!: FormGroup;
  protected isClicked: boolean = false;

  constructor(
    private fb: FormBuilder,
    protected router: Router,
    private solValidationService: SolValidationService,
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

  branchInsert() {
    console.log(this.branchInsertForm);
    }
    

}
