export interface EmailIssue {
  fromEmail: string;
  toEmail: string[];
  cc: string[];
  subject: string;
  mIntro: string;
  mHeader: string[];
  mBody: string[];
  mEnd: string;
}
