import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoggedCallObj } from '../model/loggedCallObj';
import { Router } from '@angular/router';
import { LoggedCallService } from '../shared/logged-call.service';
import { HttpResponse } from '@angular/common/http';


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
  protected exporting = false;

  selectedCall: LoggedCallObj | null = null;

  // Inline hold/resume date-time pickers, keyed by logId (same pattern as
  // the SLA log tracker component)
  activeHoldLogId: number | null = null;
  holdDateTimeValue = '';

  activeResumeLogId: number | null = null;
  resumeDateTimeValue = '';

  constructor(
    protected router: Router,
    private loggedCallService: LoggedCallService,
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

  // --- SLA helpers ---

  isOnHold(call: LoggedCallObj): boolean {
    return !!call.holdStart && !call.holdEnd;
    //return call.holdStart && !call.holdEnd;
  }

  openHoldPicker(call: LoggedCallObj): void {
    this.activeHoldLogId = call.logId;
    this.holdDateTimeValue = '';
  }

  cancelHoldPicker(): void {
    this.activeHoldLogId = null;
    this.holdDateTimeValue = '';
  }

  confirmHold(call: LoggedCallObj): void {
    if (!this.holdDateTimeValue) {
      return;
    }
    this.loggedCallService.putOnHold(call.logId, this.holdDateTimeValue).subscribe({
      next: () => {
        this.activeHoldLogId = null;
        this.loadLoggedCallObjs();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Error putting call on hold';
        console.error('Error:', err);
      },
    });
  }

  openResumePicker(call: LoggedCallObj): void {
    this.activeResumeLogId = call.logId;
    this.resumeDateTimeValue = '';
  }

  cancelResumePicker(): void {
    this.activeResumeLogId = null;
    this.resumeDateTimeValue = '';
  }

  confirmResume(call: LoggedCallObj): void {
    if (!this.resumeDateTimeValue) {
      return;
    }
    this.loggedCallService.resumeFromHold(call.logId, this.resumeDateTimeValue).subscribe({
      next: () => {
        this.activeResumeLogId = null;
        this.loadLoggedCallObjs();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Error resuming call from hold';
        console.error('Error:', err);
      },
    });
  }

  formatDate(dateString: Date| undefined | null): string {
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

  formatDateTime(dateString: Date | undefined | null): string {
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
  exportToExcel(): void {
    this.exporting = true;
    this.loggedCallService.exportToExcel().subscribe({
      next: (response: HttpResponse<Blob>) => {
        const blob = response.body as Blob;
        const url = window.URL.createObjectURL(blob);

        const contentDisposition = response.headers.get('Content-Disposition');
        let filename = `logged-calls-${new Date().toISOString().slice(0, 10)}.xlsx`; // fallback

        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?([^"]+)"?/);
          if (match && match[1]) {
            filename = match[1];
          }
        }

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        this.exporting = false;
      },
      error: (err) => {
        console.error('Export failed', err);
        this.exporting = false;
      },
    });
  }
}
