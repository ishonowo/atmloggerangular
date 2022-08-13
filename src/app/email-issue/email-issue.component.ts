import { Component, OnInit } from '@angular/core';
import { EmailService } from '../shared/email.service';
import { AtmService } from '../shared/atm.service';
import { AtmIssue } from '../model/atmissue';
import { EmailIssue } from '../model/emailissue';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-issue',
  templateUrl: './email-issue.component.html',
  styleUrls: ['./email-issue.component.css']
})
export class EmailIssueComponent implements OnInit {

  
  private emailIssue: EmailIssue={
    fromEmail: '',
    toEmail: [],
    cc: [],
    subject: '',
    mIntro: '',
    mHeader: [],
    mBody: [],
    mEnd:''
  };

 
  private atmIssue: AtmIssue;
  private groupSupportEmail: string='ATMSupport@fidelitybank.ng';
  private username:string=sessionStorage.getItem('authenticateUser');
  private isClicked = false;
  
  constructor(private atmService: AtmService,
              private emailService: EmailService,
              public router: Router
              ) {}

  ngOnInit() {
    this.atmIssue= this.atmService.atmIssue;
    this.emailIssue.fromEmail = this.atmIssue.supportEmail;
    this.emailIssue.toEmail= this.atmIssue.contact.split(";").map(String);
    this.emailIssue.cc= [this.groupSupportEmail, this.atmIssue.loggerEmail, this.atmIssue.branchEmail];
    this.emailIssue.subject= 'FIDELITY BANK: '+this.atmIssue.physicalAddress+': '+this.atmIssue.issueDesc; 
    this.emailIssue.mIntro= 'Dear all, kindly attend to this request.';
    this.emailIssue.mHeader= ['ATM LOCATION', 'BRANCH IN CHARGE', 'VENDOR', 'ISSUE(S)',
                              'CONTACT','CONTACT PHONE NUMBER', 'DATE LOGGED'];
    this.emailIssue.mBody= [ this.atmIssue.terminalId + ' ' + this.atmIssue.atmName, 
                            this.atmIssue.physicalAddress,this.atmIssue.vendorName,
                            this.atmIssue.issueDesc, this.atmIssue.branchLogger,
                            this.atmIssue.loggerPhoneNo, formatDate(this.atmIssue.logDate,'medium','en_UK')];
    this.emailIssue.mEnd= 'Thanks.';
    console.log(this.emailIssue);
  }



  sendFeedback(){
    this.isClicked=true;
    this.username=sessionStorage.getItem('authenticateUser');
    this.emailService.postSendEmail(this.emailIssue).subscribe(
      async res=>{
        alert("The issue has been emailed successfully.");
        await this.router.navigate(['atm', this.username]);
      },
      err=>{
        alert("An error has occurred while sending issue by email.");
        this.isClicked=false;
      }
    );
  }

  deleteIssueLogged(){
    if (confirm("Confirm that you will like to delete this logged issue.")){
      this.atmService.deleteIssueLogged(this.atmIssue.id).subscribe(
        async res=>{
          alert("The issue has been deleted.");
          await this.router.navigate(['atm',this.username]);
        },
        err=>{alert("The issue has not been deleted.");}
      )
    }

  }


}


