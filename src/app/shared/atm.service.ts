import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, InteropObservable } from "rxjs";
import { IssueLogged } from "../model/issuelogged";
import { AtmIssue } from "../model/atmissue";

@Injectable({
  providedIn: "root",
})
export class AtmService {
  //private BASE_URL = window["cfgAtmBaseUrl"];
  private BASE_URL = "";
  public INDEX_URL = `${this.BASE_URL}\\atm\\`;
  private LOG_ISSUE_URL = `${this.BASE_URL}\\atm\\issue`;
  private DELETE_ISSUE_URL = `${this.BASE_URL}\\atm\\delete\\`;
  public atmIssue: AtmIssue;

  constructor(private http: HttpClient) {}

  postIssueLogged(issueLogged: IssueLogged): Observable<any> {
    return this.http.post(this.LOG_ISSUE_URL, issueLogged);
  }

  deleteIssueLogged(id: number): Observable<any> {
    return this.http.delete(this.DELETE_ISSUE_URL + id);
  }
}
