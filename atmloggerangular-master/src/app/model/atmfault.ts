export interface AtmFault {
  id: number;
  natureOfFault: string;
  description: string;
  faultType: string;
  otherFaultDesc?: string;
}
