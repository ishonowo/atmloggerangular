import { Component, OnInit } from '@angular/core';
import { AtmService } from '../shared/atm.service';
import { AtmIssue } from '../model/atmissue';
import { EmailIssue } from '../model/emailissue';
import { Router } from '@angular/router';
import { EmailIssueService } from '../shared/email-issue.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
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
        atmLocation: ['', Validators.required],
        branchName: ['', Validators.required],
        vendorName: ['', Validators.required],
        issueDesc: ['', Validators.required],
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

  ngOnInit() {
    this.atmIssue = this.atmService.atmIssue as AtmIssue;
    if (this.atmIssue) {
      this.emailIssue = this.emailIssueService.generateEmailIssue(this.atmIssue);
      this.populateForm(this.emailIssue); // Populate form with initial values
      this.isLoading = false;
    }
    //this.control = this.emailIssue?.mBody as FormControl;
  }

  // Helper method to populate form with initial values
  private populateForm(emailIssue: EmailIssue | undefined) {
    //console.log(emailIssue);
    if (emailIssue) {
      this.emailForm.patchValue({
        fromEmail: emailIssue.fromEmail,
        toEmail: emailIssue.toEmail,
        cc: emailIssue.cc,
        subject: emailIssue.subject,
        mIntro: emailIssue.mIntro,
        message: {
          atmLocation: emailIssue.message.atmLocation,
          branchName: emailIssue.message.branchName,
          vendorName: emailIssue.message.vendorName,
          issueDesc: emailIssue.message.issueDesc,
          branchLogger: emailIssue.message.branchLogger,
          loggerPhone: emailIssue.message.loggerPhone,
          dateLogged: emailIssue.message.dateLogged
        },
        mEnd: emailIssue.mEnd,
      });
    }
  }

  get mBody(): FormArray {
    return this.emailForm.get('mBody') as FormArray;
  }
  
  private setMBody(mBody: string[]) {
    const mBodyArray = this.emailForm.get('mBody') as FormArray;
    mBody.forEach(message => {
      mBodyArray.push(new FormControl(message, Validators.required));
    });
  }

  onMessageChange(index: number, newValue: string) {
    const mBodyArray = this.emailForm.get('mBody') as FormArray;
    mBodyArray.at(index).setValue(newValue);
  }

  sendEmailMessage() {
    this.isClicked = true;
    if (this.emailForm.valid) {
      //const formData = this.emailForm.value as EmailIssue;
      const formData: EmailIssueMessage = {
        fromEmail: this.emailForm.get('fromEmail')?.value,
        toEmail: this.emailForm.get('toEmail')?.value,
        cc: this.emailForm.get('cc')?.value,
        subject: this.emailForm.get('subject')?.value,
        mIntro: this.emailForm.get('mIntro')?.value,
        atmLocation: this.emailForm.get('message.atmLocation')?.value,
        branchName: this.emailForm.get('message.branchName')?.value,
        vendorName: this.emailForm.get('message.vendorName')?.value,
        issueDesc: this.emailForm.get('message.issueDesc')?.value,
        branchLogger: this.emailForm.get('message.branchLogger')?.value,
        loggerPhone: this.emailForm.get('message.loggerPhone')?.value,
        dateLogged: this.emailForm.get('message.dateLogged')?.value,
        mEnd: this.emailForm.get('mEnd')?.value
            };
      this.emailIssueService.postSendEmail(formData).subscribe(
        async (res) => {
          alert('The issue has been emailed successfully.');
          await this.router.navigate(['issue-log']);
        },
        (err) => {
          alert('An error has occurred while sending issue by email.');
          this.isClicked = false;
        }
      );
    }
  }
}
