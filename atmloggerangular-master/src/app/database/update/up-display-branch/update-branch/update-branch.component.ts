import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchWithName } from 'src/app/model/branchWithName';
import { BranchService } from 'src/app/shared/branch.service';

@Component({
  selector: 'app-update-branch',
  templateUrl: './update-branch.component.html',
  styleUrls: ['./update-branch.component.css'],
})
export class UpdateBranchComponent implements OnInit, OnChanges {
  @Input() branch!: BranchWithName;
  @Output() updateComplete = new EventEmitter<void>();
  @Output() closeForm = new EventEmitter<void>(); // Add this new event emitter

  branchForm: FormGroup;
  loading = false;
  error = '';
  success = '';

  constructor(private fb: FormBuilder, private branchService: BranchService) {
    this.branchForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.branch) {
      this.populateForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['branch'] && this.branch) {
      this.populateForm();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      solId: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      regionId: ['', [Validators.required]],
      branchName: ['', [Validators.required, Validators.minLength(5)]],
      branchEmail: ['', [Validators.required, Validators.email]],
      physicalAddress: ['', [Validators.required]],
    });
  }

  populateForm(): void {
    this.branchForm.patchValue({
      id: this.branch.id,
      solId: this.branch.solId,
      regionId: this.branch.regionId,
      regionName: this.branch.regionName,
      branchName: this.branch.branchName,
      branchEmail: this.branch.branchEmail,
      physicalAddress: this.branch.physicalAddress
    });
  }

  onSubmit(): void {
    if (this.branchForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      const updatedbranch: BranchWithName = {
        id: this.branchForm.get('id')?.value,
        solId: this.branchForm.get('solId')?.value,
        regionId: this.branchForm.get('regionId')?.value,
        regionName: this.branchForm.get('regionName')?.value,
        branchName: this.branchForm.get('branchName')?.value,
        branchEmail: this.branchForm.get('branchEmail')?.value,
        physicalAddress: this.branchForm.get('physicalAddress')?.value,
      };

      this.branchService.updateBranch(updatedbranch).subscribe({
        next: () => {
          this.success = 'Branch updated successfully';
          this.loading = false;
          this.updateComplete.emit();
          this.closeForm.emit();
        },
        error: (error) => {
          this.error = 'Error updating branch';
          this.loading = false;
          console.error('Error:', error);
        },
      });
    }
  }
}
