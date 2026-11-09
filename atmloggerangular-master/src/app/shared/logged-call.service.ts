import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggedCall } from '../model/loggedCall';
import { Observable } from 'rxjs';
import { LoggedCallObj } from '../model/loggedCallObj';

export interface LoggedCallFilters {
  terminalId?: string;
  startDateTimeLogged?: string; // YYYY-MM-DDTHH:mm
  endDateTimeLogged?: string; // YYYY-MM-DDTHH:mm
  startDateTimeCompleted?: string; // YYYY-MM-DDTHH:mm
  endDateTimeCompleted?: string; // YYYY-MM-DDTHH:mm
}

@Injectable({
  providedIn: 'root',
})
export class LoggedCallService {
  private baseUrl: string = 'https://localhost:9442/atm/logged-calls';

  constructor(private http: HttpClient) {}

  private buildParams(filters?: LoggedCallFilters): HttpParams {
    let params = new HttpParams();
    const terminalId = filters?.terminalId?.trim();
    const startDateTimeLogged = filters?.startDateTimeLogged?.trim();
    const endDateTimeLogged = filters?.endDateTimeLogged?.trim();
    const startDateTimeCompleted = filters?.startDateTimeCompleted?.trim();
    const endDateTimeCompleted = filters?.endDateTimeCompleted?.trim();

    if (terminalId) params = params.set('terminalId', terminalId);
    if (startDateTimeLogged)
      params = params.set('startDateTimeLogged', startDateTimeLogged);
    if (endDateTimeLogged)
      params = params.set('endDateTimeLogged', endDateTimeLogged);
    if (startDateTimeCompleted)
      params = params.set('startDateTimeCompleted', startDateTimeCompleted);
    if (endDateTimeCompleted)
      params = params.set('endDateTimeCompleted', endDateTimeCompleted);
    return params;
  }

  findAllLoggedCalls(filters?: LoggedCallFilters): Observable<LoggedCallObj[]> {
    return this.http.get<LoggedCallObj[]>(this.baseUrl, {
      params: this.buildParams(filters),
    });
  }

  insertLoggedCall(loggedCall: LoggedCall): Observable<any> {
    return this.http.post<LoggedCall>(this.baseUrl, loggedCall);
  }

  updateLoggedCall(
    updatedCall: LoggedCallObj  ): Observable<any> {
    return this.http.put<void>(this.baseUrl, updatedCall);
  }

  putOnHold(logId: number, holdStart: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${logId}/hold`, { holdStart });
  }

  resumeFromHold(logId: number, holdEnd: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${logId}/resume`, { holdEnd });
  }

  exportToExcel(filters?: LoggedCallFilters): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.baseUrl}/export`, {
      params: this.buildParams(filters),
      responseType: 'blob',
      observe: 'response',
    });
  }
}
