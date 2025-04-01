import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoggedCallObj } from '../model/loggedCallObj';
import { Router } from '@angular/router';
import { LoggedCallService } from '../shared/logged-call.service';
import { LogStatusService } from '../shared/log-status.service';


@Component({
  selector: 'app-logged-call',
  templateUrl: './logged-call.component.html',
  styleUrls: ['./logged-call.component.css']
})
export class LoggedCallComponent implements OnInit{
  
  public loggedCallDisplayForm!: FormGroup;
  protected isClicked: boolean = false;
  public loading: boolean = true;
  public error: string = '';
  public calls: LoggedCallObj[] = [];
  //public statusObjs: LogStatus[]=[];

  selectedCall: LoggedCallObj | null = null;

 constructor( 
   private fb: FormBuilder,
   protected router: Router,
   private loggedCallService: LoggedCallService
 ){}
  
 ngOnInit(): void {
  this.loadLoggedCallObjs();
}

loadLoggedCallObjs(): void {
  this.loading = true;
  this.loggedCallService.findAllLoggedCalls().subscribe({
    next: (data) => {
      this.calls = data;
      this.loading = false;
    },
    error: (error) => {
      this.error = 'Error loading branches with region names.';
      this.loading = false;
      console.error('Error:', error);
    },
    complete: () => {
      console.log('Finished with all logged calls with complete data.');
    }
  });
}



  onSelect(call: LoggedCallObj): void {
    this.selectedCall = call;
  }

  onUpdateComplete(): void {
    this.loadLoggedCallObjs();
    this.selectedCall = null; // Close the form
    console.log('Update complete and calls refreshed');
  }

}
