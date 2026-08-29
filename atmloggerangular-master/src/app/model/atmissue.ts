import { AtmFault } from './atmfault';

export interface AtmIssue {
  id: number;
  terminalId: string;
  atmFaults: AtmFault[];
  otherFaultDesc?: string;
  branchLogger: string;
  loggerEmail: string;
  loggerPhoneNo: string;
  logDate: Date;
  supportEmail: string;
  contact: string;
  branchEmail: string;
  branchName: string;
  atmName: string;
  physicalAddress: string;
  vendorName: string;
  userEmail: string;
}