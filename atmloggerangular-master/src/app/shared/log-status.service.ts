import { Injectable } from '@angular/core';
import { CallStatus } from '../model/callStatus';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogStatusService {

  private baseUrl: string = 'http://localhost:9442/api/status';

  constructor(private http: HttpClient) {}

  findAllLogStatus(): Observable<CallStatus[]> {
      return this.http.get<CallStatus[]>(this.baseUrl);
    }
  
    
}
