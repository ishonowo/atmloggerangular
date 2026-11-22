import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegionObj } from 'src/app/model/regionObj';
import { Region } from 'src/app/model/region'
import { RegionService } from 'src/app/shared/region.service';
import { CustomValidators } from 'src/app/validators/custom.validators';

@Component({
  selector: 'app-insert-region',
  templateUrl: './insert-region.component.html',
  styleUrls: ['./insert-region.component.css'],
})
export class InsertRegionComponent implements OnInit {
  public regionInsertForm!: FormGroup;
  protected regionObj?: RegionObj={
    regionName:'',
    directoriate:''
  } ;
  protected error: string = '';
  loading: boolean=false;
  protected regions: Region[]=[];

  constructor(
    private fb: FormBuilder,
    protected router: Router,
    private regionService: RegionService
  ) {
    this.regionInsertForm = this.fb.group({
      regionName: ['', [Validators.required]],
      directoriate: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadRegions();
  }

  loadRegions(): void {
    this.loading = true;
    this.regionService.getAllRegions().subscribe({
      next: (data) => {
        this.regions = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading regions';
        this.loading = false;
        console.error('Error:', error);
      },
      complete:() => {
        console.log('Finished with fetching all regions.');
      }
    });
  }

  regionInsert(): void {
    console.log(this.regionInsertForm);
    if (this.regionInsertForm.valid) {
      this.regionObj = {
      regionName : this.regionInsertForm.get('regionName')?.value,
      directoriate: this.regionInsertForm.get('directoriate')?.value
      };
      //console.log(this.region);
      this.regionService.insertRegion(this.regionObj).subscribe({
        next: (response) => {
          console.log('Region inserted successfully', response);
          // Reset form after successful submission
          this.regionInsertForm.reset();
          // You can add success message here
        },
        error: (error) => {
          console.error('Error inserting region', error);
          // Handle error (show error message to user)
        },
        complete: async () => {
          console.log('Done with region insert.');
          this.loadRegions();
          await this.router.navigate(['/insert-region']);
        },
      });
    } else {
      // Mark all fields as touched to trigger validation display
      Object.keys(this.regionInsertForm.controls).forEach((key) => {
        const control = this.regionInsertForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
