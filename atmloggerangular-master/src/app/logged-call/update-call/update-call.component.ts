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
import { LoggedCallObj } from 'src/app/model/loggedCallObj';
import { LoggedCallService } from 'src/app/shared/logged-call.service';


@Component({
  selector: 'app-update-call',
  templateUrl: './update-call.component.html',
  styleUrls: ['./update-call.component.css'],
})
export class UpdateCallComponent implements OnInit, OnChanges {

  @Input() call!: LoggedCallObj;
  @Output() updateComplete = new EventEmitter<void>();
  @Output() closeForm = new EventEmitter<void>(); // Add this new event emitter


  callForm: FormGroup;
  loading: boolean = false;
  error: string = '';
  success: string = '';

  constructor(
    private fb: FormBuilder,
    private loggedCallService: LoggedCallService
  ) {
    this.callForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.call) {
      this.populateForm();
    }
  }

  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['call'] && this.call) {
      this.populateForm();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
    logId: ['', Validators.required],
    statusId: ['', Validators.required],
    statusDesc: ['', Validators.required],
    dateCompleted: ['', Validators.required],
    });
  }

  populateForm(): void {
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
      statusId: this.call.statusId
    });
  }

  onSubmit(): void {
    if (this.callForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      const updatedCall: LoggedCallObj = {
        logId: this.callForm.get('logId')?.value,
        branchName: this.callForm.get('branchName')?.value,
        terminalId: this.callForm.get('terminalId')?.value,
        terminalName: this.callForm.get('terminalName')?.value,
        vendorName: this.callForm.get('vendorName')?.value,
        issueDesc: this.callForm.get('issueDesc')?.value,
        dateLogged: this.callForm.get('dateLogged')?.value,
        branchLogger: this.callForm.get('branchLogger')?.value,
        loggerPhone: this.callForm.get('loggerPhone')?.value,
        startingDate: this.callForm.get('startingDate')?.value,
        dateCompleted: this.callForm.get('dateCompleted')?.value,
        statusDesc: this.callForm.get('statusDesc')?.value,
        statusId: this.callForm.get('statusId')?.value
      };
      
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
