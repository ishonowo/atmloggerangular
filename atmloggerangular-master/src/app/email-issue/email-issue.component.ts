import { Component, OnInit } from '@angular/core';
import { AtmService } from '../shared/atm.service';
import { AtmIssue } from '../model/atmissue';
import { EmailIssue } from '../model/emailissue';
import { Router } from '@angular/router';
import { EmailIssueService } from '../shared/email-issue.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

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
  //public control!: FormControl;

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
      mHeader: ['', Validators.required],
      mBody: this.fb.array([]), // Initialize as FormArray
      mEnd: ['', Validators.required],
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
    if (emailIssue) {
      this.emailForm.patchValue({
        fromEmail: emailIssue.fromEmail,
        toEmail: emailIssue.toEmail,
        cc: emailIssue.cc,
        subject: emailIssue.subject,
        mIntro: emailIssue.mIntro,
        mHeader: emailIssue.mHeader,
        mEnd: emailIssue.mEnd,
      });
      this.setMBody(emailIssue.mBody); // Set mBody FormArray
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

  sendFeedback() {
    this.isClicked = true;
    if (this.emailForm.valid) {
      const formData = this.emailForm.value as EmailIssue;
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
