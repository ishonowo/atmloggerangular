import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AtmService } from '../shared/atm.service';
import { EmailIssueService } from '../shared/email-issue.service';
import { AtmIssue } from '../model/atmissue';
import { AtmFault } from '../model/atmfault';
import { EmailIssue } from '../model/emailissue';
import { EmailIssueMessage } from '../model/emailIssueMessage';

type EmailKind = 'Power' | 'General';

@Component({
  selector: 'app-email-issue',
  templateUrl: './email-issue.component.html',
  styleUrls: ['./email-issue.component.css'],
})
export class EmailIssueComponent implements OnInit {
  // One independent form per email. All arrays below are index-aligned.
  protected emailForms: FormGroup[] = [];
  protected emailKinds: EmailKind[] = [];
  protected sent: boolean[] = [];
  protected sending: boolean[] = [];
  protected isLoading: boolean = true;

  private atmIssues: AtmIssue[] = [];
  private emailIssues: EmailIssue[] = [];

  constructor(
    private fb: FormBuilder,
    private atmService: AtmService,
    private emailIssueService: EmailIssueService,
    protected router: Router,
  ) {}

  ngOnInit() {
    this.atmIssues = this.atmService.atmIssues ?? [];
    if (!this.atmIssues.length) {
      // Page refreshed or visited directly - nothing to email.
      this.router.navigate(['issue-log']);
      return;
    }

    // Split BEFORE generating the emails so each email's subject only lists
    // the faults that email actually contains.
    const splitIssues = this.splitByFaultType(this.atmIssues);
    this.emailKinds = splitIssues.map((s) => s.kind);
    this.emailIssues = this.emailIssueService.generateEmailIssue(
      splitIssues.map((s) => s.issue),
    );

    this.emailForms = this.emailIssues.map((issue) =>
      this.buildEmailForm(issue),
    );
    this.sent = this.emailForms.map(() => false);
    this.sending = this.emailForms.map(() => false);
    this.isLoading = false;
  }

  // ---------- Splitting ----------

  private isPowerFault(fault: AtmFault): boolean {
    return (fault.faultType ?? '').toUpperCase() === 'POWER';
  }

  // Each AtmIssue becomes at most two: one email holding EVERY power fault
  // and one holding EVERY other fault. An issue with only one kind of fault
  // stays a single email. Non-power comes first, matching the backend order.
  private splitByFaultType(
    issues: AtmIssue[],
  ): { issue: AtmIssue; kind: EmailKind }[] {
    const result: { issue: AtmIssue; kind: EmailKind }[] = [];

    for (const issue of issues) {
      const faults = issue.atmFaults ?? [];
      const powerFaults = faults.filter((f) => this.isPowerFault(f));
      const otherFaults = faults.filter((f) => !this.isPowerFault(f));

      // The second condition keeps an issue that has no faults at all.
      if (otherFaults.length || !powerFaults.length) {
        result.push({
          issue: { ...issue, atmFaults: otherFaults },
          kind: 'General',
        });
      }
      if (powerFaults.length) {
        // "Others" is never a power fault, so its free text stays with the
        // general email only.
        result.push({
          issue: { ...issue, atmFaults: powerFaults, otherFaultDesc: undefined },
          kind: 'Power',
        });
      }
    }
    return result;
  }

  // ---------- Template helpers ----------

  // The faults FormArray inside a given email's form.
  protected faultsOf(form: FormGroup): FormArray {
    return form.get('message.faults') as FormArray;
  }

  // True when the control at `path` is invalid and has been touched.
  protected showError(form: FormGroup, path: string): boolean {
    const control = form.get(path);
    return !!control && control.invalid && control.touched;
  }

  protected get sentCount(): number {
    return this.sent.filter(Boolean).length;
  }

  // ---------- Form construction ----------

  private buildEmailForm(emailIssue: EmailIssue): FormGroup {
    const m = emailIssue.message;
    const faultGroups = (m.atmFaults ?? []).map((fault) =>
      this.buildFaultGroup(fault, m.otherFaultDesc),
    );

    return this.fb.group({
      fromEmail: [emailIssue.fromEmail, [Validators.required, Validators.email]],
      toEmail: [emailIssue.toEmail, Validators.required],
      cc: [emailIssue.cc, Validators.required],
      subject: [emailIssue.subject, Validators.required],
      mIntro: [emailIssue.mIntro, Validators.required],
      message: this.fb.group({
        physicalAddress: [m.physicalAddress, Validators.required],
        branchName: [m.branchName, Validators.required],
        vendorName: [m.vendorName, Validators.required],
        faults: this.fb.array(faultGroups),
        branchLogger: [m.branchLogger, Validators.required],
        loggerPhone: [
          m.loggerPhone,
          [
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(14),
          ],
        ],
        dateLogged: [m.dateLogged, Validators.required],
      }),
      mEnd: [emailIssue.mEnd, Validators.required],
    });
  }

  // One editable group per fault. id/natureOfFault/faultType are carried
  // along unedited so the payload still matches AtmFault's shape.
  // For an "Others" fault, the heading and description are seeded from the
  // issue-level otherFaultDesc (what the user typed when logging).
  private buildFaultGroup(fault: AtmFault, otherFaultDesc?: string): FormGroup {
    const isOthers = fault.natureOfFault === 'Others' && !!otherFaultDesc;
    return this.fb.group({
      id: [fault.id],
      natureOfFault: [fault.natureOfFault],
      displayLabel: [isOthers ? otherFaultDesc! : fault.natureOfFault],
      faultType: [fault.faultType],
      description: [
        isOthers ? otherFaultDesc! : fault.description,
        [Validators.required, Validators.minLength(5)],
      ],
    });
  }

  // ---------- Sending ----------

  sendEmailMessage(index: number) {
    const form = this.emailForms[index];
    if (!form || this.sent[index] || this.sending[index]) return;

    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    const faultValues: any[] = this.faultsOf(form).value;

    const editedFaults: AtmFault[] = faultValues.map((f) => ({
      id: f.id,
      natureOfFault: f.natureOfFault,
      description: f.description,
      faultType: f.faultType,
    }));

    const othersEntry = faultValues.find((f) => f.natureOfFault === 'Others');
    const otherFaultDesc = othersEntry ? othersEntry.description : undefined;

    const v = form.value;
    const formData: EmailIssueMessage = {
      fromEmail: v.fromEmail,
      toEmail: v.toEmail,
      cc: v.cc,
      subject: v.subject,
      mIntro: v.mIntro,
      physicalAddress: v.message.physicalAddress,
      branchName: v.message.branchName,
      vendorName: v.message.vendorName,
      atmFaults: editedFaults,
      otherFaultDesc: otherFaultDesc,
      branchLogger: v.message.branchLogger,
      loggerPhone: v.message.loggerPhone,
      dateLogged: v.message.dateLogged,
      mEnd: v.mEnd,
    };

    this.sending[index] = true;
    this.emailIssueService.postSendEmail(formData).subscribe({
      next: async () => {
        this.sending[index] = false;
        this.sent[index] = true;
        form.disable(); // lock the form so it can't be sent twice

        if (this.sent.every(Boolean)) {
          this.atmService.atmIssues = []; // don't leave stale data behind
          alert('All issues have been emailed successfully.');
          await this.router.navigate(['issue-log']);
        }
      },
      error: () => {
        this.sending[index] = false;
        alert(
          `An error has occurred while sending email ${index + 1} of ${
            this.emailForms.length
          }.`,
        );
      },
    });
  }

  // ---------- Navigation ----------

  async relogIssue() {
    /*if (
      this.sentCount < this.emailForms.length &&
      !confirm('Some emails have not been sent. Discard them and re-log?')
    ) {
      return;
    }*/
    this.atmService.atmIssues = []; // discard the unsent issues
    this.atmIssues=[];
    this.emailIssues=[];
    await this.router.navigate(['issue-log']);
  }
}