import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AtmFault } from 'src/app/model/atmfault';
import { AtmFaultObj } from 'src/app/model/atmfaultObj';
import { AtmFaultService } from 'src/app/shared/atm-fault.service';

@Component({
  selector: 'app-up-display-fault',
  templateUrl: './up-display-fault.component.html',
  styleUrls: ['./up-display-fault.component.css']
})
export class UpDisplayFaultComponent implements OnInit{

  faults: AtmFault[] = [];
  faultOptions: AtmFaultObj[] = [];
  loading: boolean = false;
  error: string = '';
  selectedFault: AtmFault | null = null;

  constructor(
    private faultService: AtmFaultService,
    protected router: Router
  ) {}

  ngOnInit() {
    this.loadFaults();
  }

  loadFaults(){
    this.loading=true;
    this.faultService.getAllFaults().subscribe({
      next:(data) =>{
        this.faults=data;
        this.loading=false;
      },
      error: (error) =>{
        this.error='Error loading ATM faults';
        this.loading=false;
        console.error('Error:',error);
      },
      complete: () =>{
        console.log('Finished with all ATM faults');
      },
    });
  }

  onSelect(fault: AtmFault): void{
    this.selectedFault=fault;
  }

  async onUpdateComplete():Promise<void>{
    this.loadFaults();
    this.selectedFault=null;
    await this.router.navigate(['/update-contact']);
    console.log('Update complete and ATM faults have been refreshed.');
  }

}