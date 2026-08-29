import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AtmService } from '../shared/atm.service';
import { EmailIssueService } from '../shared/email-issue.service';
import { AtmIssue } from '../model/atmissue';
import { AtmFault } from '../model/atmfault';
import { EmailIssue } from '../model/emailissue';
import { EmailIssueMessage } from '../model/emailIssueMessage';

@Component({
  selector: 'app-email-issue',
  templateUrl: './email-issue.component.html',
  styleUrls: ['./email-issue.component.css'],
})
export class EmailIssueComponent implements OnInit {
  public emailForm!: FormGroup;
  protected emailIssue!: EmailIssue;
  private atmIssue!: AtmIssue;
  protected isClicked: boolean = false;
  protected isLoading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private atmService: AtmService,
    private emailIssueService: EmailIssueService,
    protected router: Router
  ) {
    this.emailForm = this.fb.group({
      fromEmail: ['', [Validators.required, Validators.email]],
      toEmail: ['', Validators.required],
      cc: ['', Validators.required],
      subject: ['', Validators.required],
      mIntro: ['', Validators.required],
      message: this.fb.group({
        physicalAddress: ['', Validators.required],
        branchName: ['', Validators.required],
        vendorName: ['', Validators.required],
        faults: this.fb.array([]),
        branchLogger: ['', Validators.required],
        loggerPhone: ['', [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14)
        ]],
        dateLogged: ['', Validators.required],
      }),
      mEnd: ['', Validators.required]
    });
  }

  // Getter for the faults FormArray, nested under the message FormGroup
  get faultsArray(): FormArray {
    return this.emailForm.get('message')?.get('faults') as FormArray;
  }

  ngOnInit() {
    this.atmIssue = this.atmService.atmIssue as AtmIssue;
    if (this.atmIssue) {
      this.emailIssue = this.emailIssueService.generateEmailIssue(this.atmIssue);
      this.buildFaultsArray(this.emailIssue.message.atmFaults || []);
      this.populateForm(this.emailIssue); // Populate the rest of the form
      this.isLoading = false;
    }
  }

  // Builds one editable group per fault - id/natureOfFault/faultType stay
  // fixed (hidden controls, unedited) so the payload still matches AtmFault's
  // shape.
  //
  // For the "Others" fault, BOTH the header (displayLabel) and the editable
  // description are seeded from otherFaultDesc (from AtmIssue) instead of
  // the generic canned "others" text stored in the atm_faultes master row.
  // natureOfFault itself stays "Others" underneath so the payload sent back
  // stays correct.
  private buildFaultsArray(faults: AtmFault[]) {
    const groups = faults.map(fault => {
      const isOthers = fault.natureOfFault === 'Others' && !!this.atmIssue?.otherFaultDesc;
      const displayLabel = isOthers ? this.atmIssue.otherFaultDesc! : fault.natureOfFault;
      const initialDescription = isOthers ? this.atmIssue.otherFaultDesc! : fault.description;

      return this.fb.group({
        id: [fault.id],
        natureOfFault: [fault.natureOfFault],
        displayLabel: [displayLabel],
        faultType: [fault.faultType],
        description: [initialDescription, [Validators.required, Validators.minLength(5)]]
      });
    });
    (this.emailForm.get('message') as FormGroup).setControl('faults', this.fb.array(groups));
  }

  // Helper method to populate form with initial values
  private populateForm(emailIssue: EmailIssue | undefined) {
    if (emailIssue) {
      this.emailForm.patchValue({
        fromEmail: emailIssue.fromEmail,
        toEmail: emailIssue.toEmail,
        cc: emailIssue.cc,
        subject: emailIssue.subject,
        mIntro: emailIssue.mIntro,
        message: {
          physicalAddress: emailIssue.message.physicalAddress,
          branchName: emailIssue.message.branchName,
          vendorName: emailIssue.message.vendorName,
          branchLogger: emailIssue.message.branchLogger,
          loggerPhone: emailIssue.message.loggerPhone,
          dateLogged: emailIssue.message.dateLogged
        },
        mEnd: emailIssue.mEnd,
      });
    }
  }

  sendEmailMessage() {
    this.isClicked = true;
    if (this.emailForm.valid) {
      // Rebuild the AtmFault list from the (possibly edited) form values -
      // plain shape only, matching AtmFault.java (no otherFaultDesc field
      // on the entity itself).
      const editedFaults: AtmFault[] = this.faultsArray.value.map((f: any) => ({
        id: f.id,
        natureOfFault: f.natureOfFault,
        description: f.description,
        faultType: f.faultType
      }));

      // otherFaultDesc travels as its own top-level field, pulled from
      // whichever fault is "Others" (its description was seeded from
      // otherFaultDesc in buildFaultsArray and may have been edited here).
      const othersEntry = this.faultsArray.value.find((f: any) => f.natureOfFault === 'Others');
      const otherFaultDesc = othersEntry ? othersEntry.description : undefined;

      const formData: EmailIssueMessage = {
        fromEmail: this.emailForm.get('fromEmail')?.value,
        toEmail: this.emailForm.get('toEmail')?.value,
        cc: this.emailForm.get('cc')?.value,
        subject: this.emailForm.get('subject')?.value,
        mIntro: this.emailForm.get('mIntro')?.value,
        physicalAddress: this.emailForm.get('message')?.get('physicalAddress')?.value,
        branchName: this.emailForm.get('message')?.get('branchName')?.value,
        vendorName: this.emailForm.get('message')?.get('vendorName')?.value,
        atmFaults: editedFaults,
        otherFaultDesc: otherFaultDesc,
        branchLogger: this.emailForm.get('message')?.get('branchLogger')?.value,
        loggerPhone: this.emailForm.get('message')?.get('loggerPhone')?.value,
        dateLogged: new Date(this.emailForm.get('message')?.get('dateLogged')?.value),
        mEnd: this.emailForm.get('mEnd')?.value
      };

      this.emailIssueService.postSendEmail(formData).subscribe({
        next: async (res) => {
          alert('The issue has been emailed successfully.');
          await this.router.navigate(['issue-log']);
          this.isClicked = false;
        },
        error: (err) => {
          alert('An error has occurred while sending issue by email.');
          this.isClicked = false;
        }
      });
    }
  }
}