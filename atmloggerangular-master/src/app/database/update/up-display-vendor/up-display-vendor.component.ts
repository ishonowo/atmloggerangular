import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../../../shared/vendor.service';
import { Vendor } from '../../../model/vendor';

@Component({
  selector: 'app-up-display-vendor',
  templateUrl: './up-display-vendor.component.html',
  styleUrls: ['./up-display-vendor.component.css']
})
export class UpDisplayVendorComponent implements OnInit{
  vendors: Vendor[] = [];
  loading: boolean = true;
  error: string = '';
  selectedVendor: Vendor | null = null;

  constructor(private vendorService: VendorService,
    protected router: Router
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
        this.error = 'Error loading vendors';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onSelect(vendor: Vendor): void {
    this.selectedVendor = vendor;
  }

  async onUpdateComplete(): Promise<void> {
    this.loadVendors();
    this.selectedVendor = null; // Close the form
    await this.router.navigate(['/update-vendor']);
    console.log('Update complete and vendors refreshed');
  }

}
