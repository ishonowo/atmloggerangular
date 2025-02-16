// update-vendor.component.ts
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorService } from '../../../../shared/vendor.service';
import { Vendor } from '../../../../model/vendor';

@Component({
  selector: 'app-update-vendor',
  templateUrl: './update-vendor.component.html',
  styleUrls: ['./update-vendor.component.css']
})
export class UpdateVendorComponent implements OnInit, OnChanges {
  @Input() vendor!: Vendor;
  @Output() updateComplete = new EventEmitter<void>();

  vendorForm: FormGroup;
  loading = false;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService
  ) {
    this.vendorForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.vendor) {
      this.populateForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vendor'] && this.vendor) {
      this.populateForm();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [''],
      vendorName: ['', [Validators.required, Validators.minLength(2)]],
      shortName: ['', [Validators.required, Validators.maxLength(10)]]
    });
  }

  populateForm(): void {
    this.vendorForm.patchValue({
      id: this.vendor.id,
      vendorName: this.vendor.vendorName,
      shortName: this.vendor.shortName
    });
  }

  onSubmit(): void {
    if (this.vendorForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      const updatedVendor: Vendor = {
        id: this.vendorForm.get('id')?.value,
        vendorName: this.vendorForm.get('vendorName')?.value,
        shortName: this.vendorForm.get('shortName')?.value
      };

      this.vendorService.updateVendor(updatedVendor).subscribe({
        next: () => {
          this.success = 'Vendor updated successfully';
          this.loading = false;
          this.updateComplete.emit();
        },
        error: (error) => {
          this.error = 'Error updating vendor';
          this.loading = false;
          console.error('Error:', error);
        }
      });
    }
  }
}
