import { Component, OnInit } from '@angular/core';
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
  loading: boolean = false;
  error: string = '';
  selectedContact: VendorContact | null = null;

  constructor(
    private vendorContactService: VendorContactService,
    private vendorService: VendorService
  ) {}

  ngOnInit() {
    this.loadContactsWithNames();
  }

  loadContactsWithNames(): void {
    this.loading = true;
    this.vendorContactService.getAllContactsWithNames().subscribe({
      next: (data) => {
        this.contacts = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading contacts with names';
        this.loading = false;
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Finished with all contacts with names.');
      },
    });
  }

  /* New method to handle component initialization and refreshes
  private async initializeComponent(): Promise<void> {
    try {
      this.loading = true;
      await Promise.all([
        this.loadVNameOptions(),
        this.loadContacts()
      ]);
      await this.updateContactsWithVendorNames();
    } catch (error) {
      this.error = 'Error initializing component';
      console.error('Error:', error);
    } finally {
      this.loading = false;
    }
  }

    // Enhanced refresh method that handles the complete refresh cycle
    async refreshContacts(): Promise<void> {
      try {
        // Show loading state while refreshing
        this.loading = true;
        
        // Clear any previous errors
        this.error = '';
        
        // Reload all necessary data
        await this.initializeComponent();
        
        console.log('Contacts list refreshed successfully');
      } catch (error) {
        this.error = 'Error refreshing contacts';
        console.error('Error during refresh:', error);
      } finally {
        this.loading = false;
      }
    }

  // New function to handle updating contacts with vendor names
  protected async updateContactsWithVendorNames(): Promise<void> {
    try {
      // Update contacts array with vendor names from the options
      this.contacts = await this.vendorContactService.updateVendorNames(
        this.contacts,
        this.vNameOptions
      );
      console.log('Successfully updated contacts with vendor names');
    } catch (error) {
      this.error = 'Error updating vendor names';
      console.error('Error updating vendor names:', error);
      throw error;
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
  }*/

  onSelect(contact: VendorContact): void {
    this.selectedContact = contact;
  }

  // Handler for when update is complete
  onUpdateComplete(){
    this.loadContactsWithNames();
    this.selectedContact = null; // Close the form
    console.log('Update complete and contacts refreshed');
  }
  
}