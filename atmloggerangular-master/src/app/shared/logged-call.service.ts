import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggedCall } from '../model/loggedCall';
import { Observable } from 'rxjs';
import { LoggedCallObj } from '../model/loggedCallObj';

@Injectable({
  providedIn: 'root',
})
export class LoggedCallService {
  private baseUrl: string = 'https://localhost:9442/api/calls';

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

  exportToExcel(): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.baseUrl}/export`, {
      responseType: 'blob',
      observe: 'response',
    });
  }
}
