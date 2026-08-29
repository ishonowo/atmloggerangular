export interface IssueLogged {
  userEmail: string;
  terminalId: string;
  // ids of every AtmFault the user selected (multi-select buttons)
  atmFaultIds: number[];
  // included only when the "Others" fault is among the selected ids -
  // omitted entirely from the payload otherwise
  otherFaultDesc?: string;
  branchLogger: string;
  loggerEmail: string;
  loggerPhoneNo: string;
}