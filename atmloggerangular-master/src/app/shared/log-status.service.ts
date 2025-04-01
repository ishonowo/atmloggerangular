import { Injectable } from '@angular/core';
import { LogStatus } from '../model/logStatus';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogStatusService {

  private baseUrl: string = 'http://localhost:9442/api/status';

  constructor(private http: HttpClient) {}

  findAllLogStatus(): Observable<LogStatus[]> {
      return this.http.get<LogStatus[]>(this.baseUrl);
    }
  
    
}
