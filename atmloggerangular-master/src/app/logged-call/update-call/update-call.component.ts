import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CallStatus } from 'src/app/model/callStatus';
import { LoggedCallObj } from 'src/app/model/loggedCallObj';
import { LogStatusService } from 'src/app/shared/log-status.service';
import { LoggedCallService } from 'src/app/shared/logged-call.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-update-call',
  templateUrl: './update-call.component.html',
  styleUrls: ['./update-call.component.css'],
})
export class UpdateCallComponent implements OnInit, OnChanges {
  @Input() call!: LoggedCallObj;
  @Output() updateComplete = new EventEmitter<void>();
  @Output() closeForm = new EventEmitter<void>();

  public statusObjs: CallStatus[] = [];
  //public currentStatus: CallStatus | undefined;
  callForm: FormGroup;
  loading: boolean = false;
  error: string = '';
  success: string = '';

  constructor(
    private fb: FormBuilder,
    private loggedCallService: LoggedCallService,
    private callStatusService: LogStatusService
  ) {
    this.callForm = this.createForm();
  }

  async ngOnInit(): Promise<void> {
    if (this.call) {
      await this.loadLogStatus(); // sets currentStatus & populates form
    }
  }

  async loadLogStatus(): Promise<void> {
    this.loading = true;
    try {
      this.statusObjs = await firstValueFrom(
        this.callStatusService.findAllLogStatus()
      );
      console.log(this.statusObjs);
      /*/ Set currentStatus once statusObjs is available
      this.currentStatus = this.statusObjs.find(
        (status) => status.statusId === this.call.statusId
      );
      console.log(this.currentStatus);*/

      // Now that currentStatus is available, populate the form
      this.populateForm();
    } catch (error) {
      this.error = 'Error loading all status.';
      console.error('Error:', error);
    } finally {
      this.loading = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['call'] && this.call) {
      this.populateForm();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      status: [null, Validators.required],
      dateCompleted: ['', Validators.required],
    });
  }

  populateForm(): void {
    //console.log(this.currentStatus);
    this.callForm.patchValue({
      logId: this.call.logId,
      branchName: this.call.branchName,
      terminalId: this.call.terminalId,
      terminalName: this.call.terminalName,
      vendorName: this.call.vendorName,
      issueDesc: this.call.issueDesc,
      dateLogged: this.call.dateLogged,
      branchLogger: this.call.branchLogger,
      loggerPhone: this.call.loggerPhone,
      startingDate: this.call.startingDate,
      dateCompleted: this.call.dateCompleted,
      statusDesc: this.call.statusDesc,
      statusId: this.call.statusId,
    });
  }

  onSubmit(): void {
    if (this.callForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      const selectedStatus = this.callForm.get('status')?.value;
      console.log('Selected status from form:', selectedStatus);

      const updatedCall: LoggedCallObj = {
        logId: this.call.logId,
        branchName: this.call.branchName,
        terminalId: this.call.terminalId,
        terminalName: this.call.terminalName,
        vendorName: this.call.vendorName,
        issueDesc: this.call.issueDesc,
        dateLogged: this.call.dateLogged,
        branchLogger: this.call.branchLogger,
        loggerPhone: this.call.loggerPhone,
        startingDate: this.call.startingDate,
        dateCompleted: this.callForm.get('dateCompleted')?.value,
        statusDesc: selectedStatus?.statusDesc as string,
        statusId: selectedStatus?.id as number,
      };

      console.log(updatedCall);

      this.loggedCallService.updateLoggedCall(updatedCall).subscribe({
        next: () => {
          this.success = 'Call updated successfully';
          this.loading = false;
          this.updateComplete.emit();
          this.closeForm.emit();
        },
        error: (error) => {
          this.error = 'Error updating call';
          this.loading = false;
          console.error('Error:', error);
        },
      });
    }
  }
}
