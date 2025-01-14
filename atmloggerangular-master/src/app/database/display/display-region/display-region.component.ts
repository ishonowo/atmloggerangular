import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Region } from 'src/app/model/region';
import { RegionService } from 'src/app/shared/region.service';

@Component({
  selector: 'app-display-region',
  templateUrl: './display-region.component.html',
  styleUrls: ['./display-region.component.css']
})
export class DisplayRegionComponent implements OnInit {

  protected isClicked: boolean = false;

  regions: Region[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(
      private fb: FormBuilder,
      protected router: Router,
      private regionService: RegionService
    ) {}

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

}
