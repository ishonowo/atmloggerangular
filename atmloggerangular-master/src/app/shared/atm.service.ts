import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, InteropObservable } from 'rxjs';
import { IssueLogged } from '../model/issuelogged';
import { AtmIssue } from '../model/atmissue';

@Injectable({
  providedIn: 'root',
})
export class AtmService {
  //private BASE_URL = window['cfgAtmBaseUrl'];
  private baseUrl: string = 'http://localhost:9442/atm';
  private log: string = '/issue';
  private DELETE_ISSUE_URL = '\\atm\\delete\\';
  public atmIssue: AtmIssue | undefined;

  constructor(private http: HttpClient) {}

  postIssueLogged(issueLogged: IssueLogged): Observable<any> {
    //postIssueLogged(issueLogged: IssueLogged): Observable<AtmIssue> {
    //return this.http.post(this.LOG_ISSUE_URL, issueLogged);
    return this.http.post(this.baseUrl+this.log, issueLogged);
  }

  deleteIssueLogged(id: number | undefined): Observable<any> {
    return this.http.delete(this.DELETE_ISSUE_URL + id);
  }
}
