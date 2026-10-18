import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoggedCallObj } from '../model/loggedCallObj';
import { Router } from '@angular/router';
import {
  LoggedCallFilters,
  LoggedCallService,
} from '../shared/logged-call.service';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from '../shared/auth.service';
import { combineLatest, of, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-logged-call',
  templateUrl: './logged-call.component.html',
  styleUrls: ['./logged-call.component.css'],
})
export class LoggedCallComponent implements OnInit, OnDestroy {
  public loggedCallDisplayForm!: FormGroup;
  protected isClicked: boolean = false;
  public loading: boolean = true;
  public error: string = '';
  public calls: LoggedCallObj[] = [];
  protected exporting = false;

  protected selectedCall: LoggedCallObj | null = null;

  // Inline hold/resume date-time pickers, keyed by logId
  protected activeHoldLogId: number | null = null;
  protected holdDateTimeValue = '';

  protected activeResumeLogId: number | null = null;
  protected resumeDateTimeValue = '';
  protected loggedCalls!: LoggedCallObj[];

  protected searchByTerminalId = new FormControl('', { nonNullable: true });
  protected startDateLogged = new FormControl('', { nonNullable: true });
  protected endDateLogged = new FormControl('', { nonNullable: true });
  protected startDateCompleted = new FormControl('', { nonNullable: true });
  protected endDateCompleted = new FormControl('', { nonNullable: true });
  
  private destroy$ = new Subject<void>();

  constructor(
    protected router: Router,
    private loggedCallService: LoggedCallService,
    protected authService: AuthService,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    combineLatest([
      this.searchByTerminalId.valueChanges.pipe(
        startWith(this.searchByTerminalId.value),
      ),
      this.startDateLogged.valueChanges.pipe(
        startWith(this.startDateLogged.value),
      ),
      this.endDateLogged.valueChanges.pipe(startWith(this.endDateLogged.value)),
      this.startDateCompleted.valueChanges.pipe(
        startWith(this.startDateCompleted.value),
      ),
      this.endDateCompleted.valueChanges.pipe(startWith(this.endDateCompleted.value)),
    ])
      .pipe(
        debounceTime(400),
        map(
          ([terminalId, startDateTimeLogged, endDateTimeLogged, startDateTimeCompleted, endDateTimeCompleted])
          : LoggedCallFilters => ({
            terminalId: (terminalId ?? '').trim(),
            startDateTimeLogged: (startDateTimeLogged ?? '').trim(),
            endDateTimeLogged: (endDateTimeLogged ?? '').trim(),
            startDateTimeCompleted: (startDateTimeCompleted ?? '').trim(),
            endDateTimeCompleted: (endDateTimeCompleted ?? '').trim(),
          }),
        ),
        distinctUntilChanged(
          (a, b) =>
            a.terminalId === b.terminalId &&
            a.startDateTimeLogged === b.startDateTimeLogged &&
            a.endDateTimeLogged === b.endDateTimeLogged &&
            a.startDateTimeCompleted === b.startDateTimeCompleted &&
            a.endDateTimeCompleted === b.endDateTimeCompleted,
        ),
        // Block requests with an invalid date range
        filter((filters) => {
          if (
            filters.startDateTimeLogged &&
            filters.endDateTimeLogged &&
            filters.startDateTimeLogged > filters.endDateTimeLogged &&
            filters.startDateTimeCompleted &&
            filters.endDateTimeCompleted &&
            filters.startDateTimeCompleted > filters.endDateTimeCompleted
          ) {
            this.error = 'Start date cannot be after end date.';
            this.loading = false;
            return false;
          }
          return true;
        }),
        tap(() => {
          this.loading = true;
          this.error = '';
        }),
        switchMap((filters) =>
          this.loggedCallService.findAllLoggedCalls(filters).pipe(
            catchError((err) => {
              console.error('Error:', err);
              this.error = 'Error loading calls.';
              return of([] as LoggedCallObj[]);
            }),
          ),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe((data) => {
        this.calls = data;
        this.loading = false;
      });
  }

  /** The filters currently entered in the form. */
  private currentFilters(): LoggedCallFilters {
    return {
      terminalId: this.searchByTerminalId.value.trim(),
      startDateTimeLogged: this.startDateLogged.value.trim(),
      endDateTimeLogged: this.endDateLogged.value.trim(),
    };
  }

  /** Re-fetches using the current filters (used after update/hold/resume). */
  loadLoggedCallObjs(): void {
    this.loading = true;
    this.error = '';
    this.loggedCallService
      .findAllLoggedCalls(this.currentFilters())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.calls = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Error loading calls.';
          this.loading = false;
          console.error('Error:', error);
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
    this.loggedCallService
      .putOnHold(call.logId, this.holdDateTimeValue)
      .subscribe({
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
    this.loggedCallService
      .resumeFromHold(call.logId, this.resumeDateTimeValue)
      .subscribe({
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

  formatDate(dateString: Date | undefined | null): string {
    if (dateString) {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'Africa/Lagos', // West African Time (WAT/UTC+1)
      };
      return date.toLocaleDateString('en-NG', options);
    } else return '';
  }

  formatDateTime(dateString: Date | undefined | null): string {
    if (dateString) {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Africa/Lagos', // West African Time (WAT/UTC+1)
      };
      return date.toLocaleDateString('en-NG', options);
    } else return '';
  }

  exportToExcel(): void {
    this.exporting = true;
    this.loggedCallService.exportToExcel(this.currentFilters()).subscribe({
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

  /** Clears every filter; the stream then reloads all calls. */
  clear(): void {
    this.searchByTerminalId.setValue('');
    this.startDateLogged.setValue('');
    this.endDateLogged.setValue('');
    this.startDateCompleted.setValue('');
    this.endDateCompleted.setValue('');
  }

  protected get hasFilters(): boolean {
    return !!(
      this.searchByTerminalId.value ||
      this.startDateLogged.value ||
      this.endDateLogged.value ||
      this.startDateCompleted.value ||
      this.endDateCompleted.value
    );
  }
}
