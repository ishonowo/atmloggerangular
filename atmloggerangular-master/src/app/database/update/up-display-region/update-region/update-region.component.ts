import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegionService } from '../../../../shared/region.service';
import { Region } from '../../../../model/region';

@Component({
  selector: 'app-update-region',
  templateUrl: './update-region.component.html',
  styleUrls: ['./update-region.component.css']
})
export class UpdateRegionComponent implements OnInit, OnChanges {
  @Input() region!: Region;
  @Output() updateComplete = new EventEmitter<void>();
  @Output() closeForm = new EventEmitter<void>(); // Add this new event emitter

  regionForm: FormGroup;
  loading = false;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private regionService: RegionService
  ) {
    this.regionForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.region) {
      this.populateForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['region'] && this.region) {
      this.populateForm();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [''],
      regionName: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  populateForm(): void {
    this.regionForm.patchValue({
      id: this.region.id,
      regionName: this.region.regionName
    });
  }

  onSubmit(): void {
    if (this.regionForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      const updatedRegion: Region = {
        id: this.regionForm.get('id')?.value,
        regionName: this.regionForm.get('regionName')?.value
      };

      this.regionService.updateRegion(updatedRegion).subscribe({
        next: () => {
          this.success = 'Region updated successfully';
          this.loading = false;
          this.updateComplete.emit();
          this.closeForm.emit();
        },
        error: (error) => {
          this.error = 'Error updating region';
          this.loading = false;
          console.error('Error:', error);
        }
      });
    }
  }
}