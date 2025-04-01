import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailIssue } from '../model/emailissue';
import { AtmIssue } from '../model/atmissue';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { EmailIssueMessage } from '../model/emailIssueMessage';

@Injectable({
  providedIn: 'root',
})
export class EmailIssueService {
  //private BASE_URL = window["cfgAtmBaseUrl"];
  private BASE_URL = 'http:\\localhost:9442';
  //private VIEW_EMAIL_URL=`${this.BASE_URL}\\atm\\email`;
  private SEND_EMAIL_URL = 'http://localhost:9442/email/sendEmail';
  private groupSupportEmail: string = 'ATMSupport@fidelitybank.ng';

  
  constructor(private http: HttpClient) {}

  postSendEmail(emailIssueMessage: EmailIssueMessage): Observable<any> {
    return this.http.post(this.SEND_EMAIL_URL, emailIssueMessage);
  }



  
  generateEmailIssue(atmIssue: AtmIssue): EmailIssue {
    let emailIssue: EmailIssue = {
      fromEmail: atmIssue?.userEmail,
      toEmail: atmIssue?.contact,//.split(';').map(String),
      cc: 
        atmIssue.supportEmail +';'+
        atmIssue.loggerEmail + ';'+
        atmIssue.branchEmail ,
      subject:
        'FIDELITY BANK: ' +
        atmIssue?.terminalId + ' ' + atmIssue?.atmName +
        ': ' +
        atmIssue.issueDesc,
      mIntro: 'Dear all, kindly attend to this request.',
      message: {
        physicalAddress: atmIssue?.physicalAddress ,
        branchName:atmIssue?.branchName,
        vendorName:atmIssue?.vendorName,
        issueDesc: atmIssue?.issueDesc,
        branchLogger: atmIssue?.branchLogger,
        loggerPhone: atmIssue?.loggerPhoneNo,
        dateLogged: atmIssue?.logDate,
      },
      mEnd: 'Thanks.',
    };
    return emailIssue;
  }
}
