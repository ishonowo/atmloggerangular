import { HttpClient,  HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggedCall } from '../model/loggedCall';
import { Observable } from 'rxjs';
import { LoggedCallObj } from '../model/loggedCallObj';

@Injectable({
  providedIn: 'root',
})
export class LoggedCallService {
  private baseUrl: string = 'https://localhost:9442/atm/logged-calls';

  constructor(private http: HttpClient) {}

  findAllLoggedCalls(terminalId?: string): Observable<LoggedCallObj[]> {
    let params = new HttpParams();
    if (terminalId && terminalId.trim()){
      params=params.set('terminalId',terminalId.trim());
    }
    return this.http.get<LoggedCallObj[]>(this.baseUrl,{params});
  }

  insertLoggedCall(loggedCall: LoggedCall): Observable<any> {
    return this.http.post<LoggedCall>(this.baseUrl, loggedCall);
  }

  updateLoggedCall(updatedCall: LoggedCallObj): Observable<any> {
    return this.http.put<void>(this.baseUrl, updatedCall);
  }

  putOnHold(logId: number, holdStart: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${logId}/hold`, { holdStart });
  }

  resumeFromHold(logId: number, holdEnd: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${logId}/resume`, { holdEnd });
  }

  exportToExcel(terminalId?: string): Observable<HttpResponse<Blob>> {
    let params= new HttpParams();
    if (terminalId && terminalId.trim()){
      params=params.set('terminalId',terminalId.trim());
    }
    return this.http.get(`${this.baseUrl}/export`, {
      params,
      responseType: 'blob',
      observe: 'response',
    });
  }
}
