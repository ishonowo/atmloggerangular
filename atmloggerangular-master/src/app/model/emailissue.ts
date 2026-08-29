import { AtmFault } from './atmfault';

export interface EmailIssueMessageInfo {
  physicalAddress: string;
  branchName: string;
  vendorName: string;
  atmFaults: AtmFault[];
  otherFaultDesc?: string;
  branchLogger: string;
  loggerPhone: string;
  dateLogged: Date;
}

export interface EmailIssue {
  fromEmail: string;
  toEmail: string;
  cc: string;
  subject: string;
  mIntro: string;
  message: EmailIssueMessageInfo;
  mEnd: string;
}