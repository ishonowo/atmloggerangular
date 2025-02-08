import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactObject } from 'src/app/model/contactObject';
import { VNameOption } from 'src/app/model/vNameOption';
import { VendorContactService } from 'src/app/shared/vendor-contact.service';
import { VendorService } from 'src/app/shared/vendor.service';

@Component({
  selector: 'app-insert-contact',
  templateUrl: './insert-contact.component.html',
  styleUrls: ['./insert-contact.component.css']
})

export class InsertContactComponent implements OnInit{
  public contactInsertForm!: FormGroup;
  protected isClicked: boolean = false;
  private contactObject: ContactObject = {
    vendorId : 0,
    contact : '',
    status : false
  }
  vNameOptions: VNameOption[] = [];
  protected loading: boolean= true;

  constructor(
    private fb: FormBuilder,
    protected router: Router,
    private vendorContactService: VendorContactService,
    private vendorService: VendorService
  ){
    this.contactInsertForm = this.fb.group({
      vendorId: [null, Validators.required],
      contact: ['', [Validators.required,Validators.email]],
      status: [true, Validators.required]
    })
  }
    
  ngOnInit(): void {
    this.loadVNameOptions();
  }

  loadVNameOptions() {
    this.loading = true;
    this.vendorService.getAllNames().subscribe({
      next: (vNameOptions) => {
        this.vNameOptions = vNameOptions;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.error('Error loading names:', error);
      },
      complete: () => {
        console.log('Finished fetching name options');
      },
    });
  }

  contactInsert(): void{
    console.log(this.contactInsertForm);
    if (this.contactInsertForm.valid){
      this.contactObject = {
        vendorId: this.contactInsertForm.get('vendorId')?.value,
        contact: this.contactInsertForm.get('contact')?.value,
        status: this.contactInsertForm.get('status')?.value
      };
      this.vendorContactService.insertContact(this.contactObject).subscribe({
        next: (response) => {
          console.log('Contact inserted successfully ', response);
          this.contactInsertForm.reset();
        },
        error: (error) => {
          console.error('Error inserting contact ',error);
        },
        complete: () => {
          console.log('Done with contact inserting.');
          this.router.navigate(['/insert-contact']);
        }
      });
    } else {
      Object.keys(this.contactInsertForm.controls).forEach((key) =>{
        const control =this.contactInsertForm.get(key);
        control?.markAsTouched();
      });
    }
  }

}
