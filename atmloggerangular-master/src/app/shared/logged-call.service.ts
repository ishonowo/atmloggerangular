import { HttpClient, HttpResponse } from '@angular/common/http';
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

  findAllLoggedCalls(): Observable<LoggedCallObj[]> {
    return this.http.get<LoggedCallObj[]>(this.baseUrl);
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

  exportToExcel(): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.baseUrl}/export`, {
      responseType: 'blob',
      observe: 'response',
    });
  }
}
