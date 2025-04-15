import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoggedCallObj } from '../model/loggedCallObj';
import { Router } from '@angular/router';
import { LoggedCallService } from '../shared/logged-call.service';

@Component({
  selector: 'app-logged-call',
  templateUrl: './logged-call.component.html',
  styleUrls: ['./logged-call.component.css'],
})
export class LoggedCallComponent implements OnInit {
  public loggedCallDisplayForm!: FormGroup;
  protected isClicked: boolean = false;
  public loading: boolean = true;
  public error: string = '';
  public calls: LoggedCallObj[] = [];

  selectedCall: LoggedCallObj | null = null;

  constructor(
    private fb: FormBuilder,
    protected router: Router,
    private loggedCallService: LoggedCallService
  ) {}

  ngOnInit(): void {
    this.loadLoggedCallObjs();
  }

  loadLoggedCallObjs(): void {
    this.loading = true;
    this.loggedCallService.findAllLoggedCalls().subscribe({
      next: (data) => {
        this.calls = data;
        //console.log(this.calls);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading calls.';
        this.loading = false;
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Finished with all logged calls with complete data.');
      },
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

  formatDate(dateString: Date): string {
    if (dateString) {
      const date = new Date(dateString);

      // Create options for West African format
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        //hour: '2-digit',
        //minute: '2-digit',
        timeZone: 'Africa/Lagos', // Lagos uses West African Time (WAT/UTC+1)
      };

      return date.toLocaleDateString('en-NG', options);
      // This will format the date according to Nigerian English format in WAT timezone
    } else return '';
  }

  formatDateTime(dateString: Date): string {
    if (dateString) {
      const date = new Date(dateString);

      // Create options for West African format
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Africa/Lagos', // Lagos uses West African Time (WAT/UTC+1)
      };

      return date.toLocaleDateString('en-NG', options);
      // This will format the date according to Nigerian English format in WAT timezone
    } else return '';
  }
}
