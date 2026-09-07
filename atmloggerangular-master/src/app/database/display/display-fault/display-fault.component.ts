import { Component, OnInit } from '@angular/core';
import { AtmFault } from 'src/app/model/atmfault';
import { AtmFaultService } from 'src/app/shared/atm-fault.service';

@Component({
  selector: 'app-display-fault',
  templateUrl: './display-fault.component.html',
  styleUrls: ['./display-fault.component.css'],
})
export class DisplayFaultComponent implements OnInit {
  protected isClicked: boolean = false;
  protected faults: AtmFault[] = [];
  protected loading: boolean = true;
  protected error: string = '';

  constructor(private faultService: AtmFaultService) {}

  ngOnInit(): void {
    this.loadFaults();
  }

  loadFaults(): void {
    this.loading = true;
    this.faultService.getAllFaults().subscribe({
      next: (data) => {
        this.faults = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading faults';
        this.loading = false;
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Finished with fetching all faults.');
      },
    });
  }
}
