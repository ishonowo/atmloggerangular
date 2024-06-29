import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailIssue } from '../model/emailissue';
import { AtmIssue } from '../model/atmissue';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailIssueService {
  //private BASE_URL = window["cfgAtmBaseUrl"];
  private BASE_URL = 'http:\\localhost:9442';
  //private VIEW_EMAIL_URL=`${this.BASE_URL}\\atm\\email`;
  private SEND_EMAIL_URL = 'http:\\\\localhost:9442\\email\\sendEmail';
  private groupSupportEmail: string = 'ATMSupport@fidelitybank.ng';

  private username: any = sessionStorage.getItem('authenticateUser');

  constructor(private http: HttpClient) {}

  postSendEmail(emailIssue: EmailIssue): Observable<any> {
    return this.http.post(this.SEND_EMAIL_URL, emailIssue);
  }

  generateEmailIssue(atmIssue: AtmIssue): EmailIssue {
    let emailIssue: EmailIssue = {
      fromEmail: atmIssue?.supportEmail || this.groupSupportEmail,
      toEmail: atmIssue?.contact,//.split(';').map(String),
      cc: 
        atmIssue.supportEmail || this.groupSupportEmail +';'+
        atmIssue.loggerEmail + ';'+
        atmIssue.branchEmail ,
      subject:
        'FIDELITY BANK: ' +
        atmIssue.physicalAddress +
        ': ' +
        atmIssue.issueDesc,
      mIntro: 'Dear all, kindly attend to this request.',
      mHeader: [
        'ATM LOCATION',
        'BRANCH IN CHARGE',
        'VENDOR',
        'ISSUE(S)',
        'CONTACT',
        'CONTACT PHONE NUMBER',
        'DATE LOGGED',
      ],
      mBody: [
        atmIssue.terminalId + ' ' + atmIssue?.atmName,
        atmIssue.physicalAddress + '',
        atmIssue.vendorName + '',
        atmIssue.issueDesc + '',
        atmIssue.branchLogger + '',
        atmIssue.loggerPhoneNo + '',
        formatDate(atmIssue?.logDate + '', 'medium', 'en_UK'),
      ],
      mEnd: 'Thanks.',
    };
    return emailIssue;
  }
}
