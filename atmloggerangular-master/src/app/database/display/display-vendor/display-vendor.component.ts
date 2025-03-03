import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/model/vendor';
import { VendorService } from 'src/app/shared/vendor.service';

@Component({
  selector: 'app-display-vendor',
  templateUrl: './display-vendor.component.html',
  styleUrls: ['./display-vendor.component.css'],
})
export class DisplayVendorComponent implements OnInit {
  vendors: Vendor[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(
      private fb: FormBuilder,
      protected router: Router,
      private vendorService: VendorService
    ) {}

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(): void {
    this.loading = true;
    this.vendorService.getAllVendors().subscribe({
      next: (data) => {
        this.vendors = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading vendors' + error;
        this.loading = false;
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Finished with fetching all vendors.');
      },
    });
  }
}
