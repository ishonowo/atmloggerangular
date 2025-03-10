// update-vendor-contact.component.ts
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorContactService } from '../../../../shared/vendor-contact.service';
import { VendorService } from '../../../../shared/vendor.service';
import { VendorContact } from '../../../../model/vendorContact';
import { Vendor } from '../../../../model/vendor';

@Component({
  selector: 'app-update-vendor-contact',
  templateUrl: './update-vendor-contact.component.html'
})
export class UpdateVendorContactComponent implements OnInit, OnChanges {
  @Input() vendorContact!: VendorContact;
  @Output() updateComplete = new EventEmitter<void>();
  @Output() closeForm = new EventEmitter<void>(); // Add this new event emitter

  contactForm: FormGroup;
  loading = false;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private vendorContactService: VendorContactService,
    private vendorService: VendorService
  ) {
    this.contactForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [''],
      vendorId: ['', Validators.required],
      contact: ['', [Validators.required, Validators.maxLength(200), Validators.email]],
      status: [true]
    });
  }

  ngOnInit(): void {
    if (this.vendorContact) {
      this.populateForm();
    }
  }


  populateForm(): void {
    this.contactForm.patchValue({
      id: this.vendorContact.id,
      vendorId: this.vendorContact.vendorId,
      contact: this.vendorContact.contact,
      status: this.vendorContact.status
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vendorContact'] && this.vendorContact) {
      this.populateForm();
    }
  }


  onSubmit(): void {
    if (this.contactForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      const updatedContact: VendorContact = {
        id: this.contactForm.get('id')?.value,
        vendorId: this.contactForm.get('vendorId')?.value,
        contact: this.contactForm.get('contact')?.value,
        status: this.contactForm.get('status')?.value,
        vendorName: this.contactForm.get('vendorName')?.value
      };

      this.vendorContactService.updateVendorContact(updatedContact).subscribe({
        next: () => {
          this.success = 'Vendor contact updated successfully';
          this.loading = false;
          this.updateComplete.emit();
          this.closeForm.emit();
        },
        error: (error) => {
          this.error = 'Error updating vendor contact';
          this.loading = false;
          console.error('Error:', error);
        }
      });
    }
  }
}