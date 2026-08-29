import { AtmFault } from './atmfault';

export interface EmailIssueMessage {
  fromEmail: string;
  toEmail: string;
  cc: string;
  subject: string;
  mIntro: string;
  physicalAddress: string;
  branchName: string;
  vendorName: string;
  atmFaults: AtmFault[];
  otherFaultDesc?: string;
  branchLogger: string;
  loggerPhone: string;
  dateLogged: Date;
  mEnd: string;
}