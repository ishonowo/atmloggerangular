import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../../validators/custom.validators';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-db-update',
  templateUrl: './db-update.component.html',
  styleUrls: ['./db-update.component.css'],
})
export class DbUpdateComponent implements OnInit {
  public dbUpdateForm!: FormGroup;
  //protected emailIssue!: EmailIssue;
  //private atmIssue!: AtmIssue;
  protected isClicked: boolean = false;

  constructor(
    private fb: FormBuilder,
    protected router: Router,
    protected authService: AuthService
  ) {
    this.dbUpdateForm = this.fb.group({
      branchInfo: this.fb.group({
        solId: [
          '',
          [
            Validators.required,
            CustomValidators.noSpaceAllowed,
            CustomValidators.solID,
          ],
        ],
        branchEmail: ['', [Validators.required, Validators.email]],
        physicalAddress: ['', Validators.required],
        branchName: ['', Validators.required],
        regionId: ['', Validators.required],
      }),
    });
  }

  ngOnInit() {}
  //this.control = this.emailIssue?.mBody as FormControl;

  UpdateDatabase() {
    throw new Error('Method not implemented.');
  }
}
