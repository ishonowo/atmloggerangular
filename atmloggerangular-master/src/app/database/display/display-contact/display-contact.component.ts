import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorContactObject } from 'src/app/model/vendorContactObject';
import { VendorContactService } from 'src/app/shared/vendor-contact.service';

@Component({
  selector: 'app-display-contact',
  templateUrl: './display-contact.component.html',
  styleUrls: ['./display-contact.component.css'],
})

export class DisplayContactComponent implements OnInit {
  public contactDisplayForm!: FormGroup;
  protected isClicked: boolean = false;
  public vendorName: string = '';
  public loading: boolean = true;
  public error: string='';
  public contacts: VendorContactObject[]=[];
  
  constructor(
    private fb: FormBuilder,
    protected router: Router,
    private vendorContactService: VendorContactService
  )
  { }

  ngOnInit(): void {
    this.loadVendorContactswNames();
  }



  loadVendorContactswNames(): void{
    this.loading = true;
    this.vendorContactService.getAllContactswNames().subscribe({
      next: (data) => {
        this.contacts = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading contacts with names';
        this.loading = false;
        console.error('Error: ', error)
      },
      complete: () => {
        console.log('Finished with all contacts with names.');
      }
    });
  }


}
