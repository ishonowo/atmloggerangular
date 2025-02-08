import { Component, OnInit } from '@angular/core';
import { RegionService } from '../../../shared/region.service';
import { Region } from '../../../model/region';


@Component({
  selector: 'app-up-display-region',
  templateUrl: './up-display-region.component.html',
  styleUrls: ['./up-display-region.component.css']
})
export class UpDisplayRegionComponent implements OnInit {
  regions: Region[] = [];
  loading: boolean = true;
  error: string = '';
  selectedRegion: Region | null = null;

  constructor(
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
      }
    });
  }

  onSelect(region: Region): void {
    this.selectedRegion = region;
  }
}