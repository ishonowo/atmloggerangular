import { Message } from "./message";

export interface EmailIssue {
  fromEmail: string;
  toEmail: string; 
  cc: string; 
  subject: string;
  mIntro: string;
  message: Message;
  mEnd: string;
}
