export interface LoggedCall {
  //id: number;
  branchId: number; 
  tId: number; 
  vendorId: number;
  messageId: number;
  dateLogged: Date;
  startingDate: Date;
  dateCompleted: Date;
  statusId: number;
}