
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs'; // Add this import
import { VendorContact } from 'src/app/model/vendorContact';
import { VNameOption } from 'src/app/model/vNameOption';
import { VendorContactService } from 'src/app/shared/vendor-contact.service';
import { VendorService } from 'src/app/shared/vendor.service';

@Component({
  selector: 'app-up-display-contact',
  templateUrl: './up-display-contact.component.html',
  styleUrls: ['./up-display-contact.component.css'],
})
export class UpDisplayContactComponent implements OnInit {
  contacts: VendorContact[] = [];
  vNameOptions: VNameOption[] = [];
  loading: boolean = true;
  error: string = '';
  selectedContact: VendorContact | null = null;

  constructor(
    private vendorContactService: VendorContactService,
    private vendorService: VendorService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.loading = true;
      // Wait for both requests to complete
      await Promise.all([
        this.loadVNameOptions(),
        this.loadContacts()
      ]);

      this.contacts = await this.vendorContactService.updateVendorNames(
        this.contacts,
        this.vNameOptions
      );
      console.log(this.contacts);
      
    } catch (error) {
      this.error = 'Error initializing component';
      console.error('Error:', error);
    } finally {
      this.loading = false;
    }
  }

  protected async loadContacts(): Promise<void> {
    try {
      this.contacts = await firstValueFrom(
        this.vendorContactService.getAllContacts()
      );
      console.log('Finished fetching contacts');
    } catch (error) {
      this.error = 'Error loading contacts';
      console.error('Error:', error);
      throw error;
    }
  }

  private async loadVNameOptions(): Promise<void> {
    try {
      this.vNameOptions = await firstValueFrom(
        this.vendorService.getAllNames()
      );
      console.log('Finished fetching name options');
    } catch (error) {
      this.error = 'Error loading names';
      console.error('Error loading names:', error);
      throw error;
    }
  }

  onSelect(contact: VendorContact): void {
    this.selectedContact = contact;
  }
}
