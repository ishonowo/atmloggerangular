import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailIssue } from '../model/emailissue';
import { AtmIssue } from '../model/atmissue';
import { Observable } from 'rxjs';
import { EmailIssueMessage } from '../model/emailIssueMessage';
//import { AtmFault } from '../model/atmfault';

@Injectable({
  providedIn: 'root',
})
export class EmailIssueService {
  private BASE_URL = 'https:\\localhost:9442';
  private SEND_EMAIL_URL = 'https://localhost:9442/email/sendEmail';
  private emailIssues: EmailIssue[] = [];
  //private groupSupportEmail: string = 'ATMSupport@fidelitybank.ng';

  constructor(private http: HttpClient) {}

  postSendEmail(emailIssueMessage: EmailIssueMessage): Observable<any> {
    return this.http.post(this.SEND_EMAIL_URL, emailIssueMessage);
  }

  /*generateEmailIssue(atmIssues: AtmIssue[]): EmailIssue[] {
    for (const issue of atmIssues) {
      // Build a readable summary of the selected faults for the subject line,
      // e.g. "Cash Jam, Network Issue" - replaces the old single issueDesc string.

      const faultSummary = (issue.atmFaults || [])
        .map((f: { natureOfFault: string }) => f.natureOfFault)
        .join(', ');

      let emailIssue: EmailIssue = {
        fromEmail: issue?.userEmail,
        toEmail: issue?.contact,
        cc:
          issue.supportEmail +
          ';' +
          issue.loggerEmail +
          ';' +
          issue.branchEmail,
        subject:
          'FIDELITY BANK: ' +
          issue?.terminalId +
          ' ' +
          issue?.atmName +
          (faultSummary ? ': ' + faultSummary : ''),
        mIntro: 'Dear all, kindly attend to this request.',
        message: {
          physicalAddress: issue?.physicalAddress,
          branchName: issue?.branchName,
          vendorName: issue?.vendorName,
          atmFaults: issue?.atmFaults ?? [],
          branchLogger: issue?.branchLogger,
          loggerPhone: issue?.loggerPhoneNo,
          dateLogged: issue?.logDate,
          otherFaultDesc: issue?.otherFaultDesc,
        },
        mEnd: 'Thanks.',
      };
      this.emailIssues.push(emailIssue);
    }
    return this.emailIssues;
  }*/
  generateEmailIssue(atmIssues: AtmIssue[]): EmailIssue[] {
  return atmIssues.map((issue) => {
    const faultSummary = (issue.atmFaults ?? [])
      .map((f) => f.natureOfFault)
      .join(', ');

    return {
      fromEmail: issue.userEmail,
      toEmail: issue.contact,
      cc: [issue.supportEmail, issue.loggerEmail, issue.branchEmail]
        .filter(Boolean)
        .join(';'),
      subject:
        `FIDELITY BANK: ${issue.terminalId} ${issue.atmName}` +
        (faultSummary ? `: ${faultSummary}` : ''),
      mIntro: 'Dear all, kindly attend to this request.',
      message: {
        physicalAddress: issue.physicalAddress,
        branchName: issue.branchName,
        vendorName: issue.vendorName,
        atmFaults: issue.atmFaults ?? [],
        otherFaultDesc: issue.otherFaultDesc,
        branchLogger: issue.branchLogger,
        loggerPhone: issue.loggerPhoneNo,
        dateLogged: issue.logDate,
      },
      mEnd: 'Thanks.',
    };
  });
}
}
