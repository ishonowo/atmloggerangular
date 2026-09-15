import { Component, OnInit } from '@angular/core';
import { SlaLog } from '../model/sla-log.model';
import { SlaLogService } from '../shared/sla-log.service';

@Component({
  selector: 'app-sla-log-list',
  templateUrl: './sla-log-list.component.html',
  styleUrls: ['./sla-log-list.component.css']
})
export class SlaLogListComponent implements OnInit {

  logs: SlaLog[] = [];
  loading = false;
  error = '';

  // Tracks which log row currently has its hold/resume date-time picker open,
  // and holds the value the user picked before it's submitted.
  activeHoldLogId: number | null = null;
  holdDateTimeValue = '';

  activeResumeLogId: number | null = null;
  resumeDateTimeValue = '';

  constructor(private slaLogService: SlaLogService) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.loading = true;
    this.error = '';
    this.slaLogService.getAll().subscribe({
      next: (data) => {
        this.logs = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading SLA logs';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  openHoldPicker(log: SlaLog): void {
    this.activeHoldLogId = log.id;
    this.holdDateTimeValue = '';
  }

  cancelHoldPicker(): void {
    this.activeHoldLogId = null;
    this.holdDateTimeValue = '';
  }

  confirmHold(log: SlaLog): void {
    if (!this.holdDateTimeValue) {
      return;
    }
    this.slaLogService
      .putOnHold(log.id, { holdStartedAt: this.holdDateTimeValue })
      .subscribe({
        next: () => {
          this.activeHoldLogId = null;
          this.loadLogs();
        },
        error: (err) => {
          this.error = err?.error?.message || 'Error putting log on hold';
          console.error('Error:', err);
        }
      });
  }

  openResumePicker(log: SlaLog): void {
    this.activeResumeLogId = log.id;
    this.resumeDateTimeValue = '';
  }

  cancelResumePicker(): void {
    this.activeResumeLogId = null;
    this.resumeDateTimeValue = '';
  }

  confirmResume(log: SlaLog): void {
    if (!this.resumeDateTimeValue) {
      return;
    }
    this.slaLogService
      .resume(log.id, { holdEndedAt: this.resumeDateTimeValue })
      .subscribe({
        next: () => {
          this.activeResumeLogId = null;
          this.loadLogs();
        },
        error: (err) => {
          this.error = err?.error?.message || 'Error resuming log from hold';
          console.error('Error:', err);
        }
      });
  }

  resolveLog(log: SlaLog): void {
    this.slaLogService.resolve(log.id).subscribe({
      next: () => this.loadLogs(),
      error: (err) => {
        this.error = err?.error?.message || 'Error resolving log';
        console.error('Error:', err);
      }
    });
  }

  reopenLog(log: SlaLog): void {
    this.slaLogService.reopen(log.id).subscribe({
      next: () => this.loadLogs(),
      error: (err) => {
        this.error = err?.error?.message || 'Error reopening log';
        console.error('Error:', err);
      }
    });
  }
}
