import { Component, OnInit } from '@angular/core';
import { AtmService } from '../shared/atm.service';
import { AtmIssue } from '../model/atmissue';
import { EmailIssue } from '../model/emailissue';
import { Router } from '@angular/router';
import { EmailIssueService } from '../shared/email-issue.service';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-issue',
  templateUrl: './email-issue.component.html',
  styleUrls: ['./email-issue.component.css'],
})
export class EmailIssueComponent implements OnInit {
  public emailForm!: FormGroup;
  protected emailIssue: EmailIssue | undefined;
  private atmIssue: AtmIssue | undefined;
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
      mHeader: ['',Validators.required],
      mBody: ['',Validators.required],
      mEnd: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.atmIssue = this.atmService.atmIssue;
    console.log(this.atmIssue);

    if (this.atmIssue) {
      this.emailIssue = this.emailIssueService.generateEmailIssue(this.atmIssue);
      this.populateForm(this.emailIssue); // Populate form with initial values
      this.isLoading = false;
    }
    console.log(this.emailIssue);

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
          mHeader:emailIssue.mHeader,
          mBody: emailIssue.mBody,
          mEnd: emailIssue.mEnd,
        });
        
      }
    }

      /* Helper method to set values in FormArray
  private setEmails(controlName: string, emails: string[]) {
    const controlArray = this.emailForm.get(controlName) as FormArray;
    controlArray.clear(); // Clear existing values

    emails.forEach((email) => {
      controlArray.push(this.fb.control(email)); // Push each email into FormArray
    });
  }*/


  sendFeedback(){
    this.isClicked = true;
    console.log(this.emailForm);
    if (this.emailForm.valid) {
      const formData = this.emailForm.value as EmailIssue;
      this.emailIssueService.postSendEmail(formData).subscribe(
        async (res) => {
          alert('The issue has been emailed successfully.');
          await this.router.navigate(['atm']);
        },
        (err) => {
          alert('An error has occurred while sending issue by email.');
          this.isClicked = false;
        }
      );
    }
  }

}
