import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailIssue } from '../model/emailissue';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  //private BASE_URL = window["cfgAtmBaseUrl"];
  private BASE_URL = 'http:\\localhost:9442';
  //private VIEW_EMAIL_URL=`${this.BASE_URL}\\atm\\email`;
  private SEND_EMAIL_URL = `${this.BASE_URL}\\email\\sendEmail`;

  constructor(private http: HttpClient) {}

  postSendEmail(emailIssue: EmailIssue): Observable<any> {
    return this.http.post(this.SEND_EMAIL_URL, emailIssue);
  }
}
