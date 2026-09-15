import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateSlaLogRequest,
  HoldRequest,
  ResolveRequest,
  ResumeRequest,
  SlaLog
} from '../model/sla-log.model';

@Injectable({
  providedIn: 'root'
})
export class SlaLogService {
  private baseUrl = 'https://localhost:9442/api/sla-logs';

  constructor(private http: HttpClient) {}

  getAll(): Observable<SlaLog[]> {
    return this.http.get<SlaLog[]>(this.baseUrl);
  }

  getById(id: number): Observable<SlaLog> {
    return this.http.get<SlaLog>(`${this.baseUrl}/${id}`);
  }

  create(request: CreateSlaLogRequest): Observable<SlaLog> {
    return this.http.post<SlaLog>(this.baseUrl, request);
  }

  putOnHold(id: number, request: HoldRequest): Observable<SlaLog> {
    return this.http.put<SlaLog>(`${this.baseUrl}/${id}/hold`, request);
  }

  resume(id: number, request: ResumeRequest): Observable<SlaLog> {
    return this.http.put<SlaLog>(`${this.baseUrl}/${id}/resume`, request);
  }

  resolve(id: number, request: ResolveRequest = {}): Observable<SlaLog> {
    return this.http.put<SlaLog>(`${this.baseUrl}/${id}/resolve`, request);
  }

  reopen(id: number, request: ResolveRequest = {}): Observable<SlaLog> {
    return this.http.put<SlaLog>(`${this.baseUrl}/${id}/reopen`, request);
  }
}
