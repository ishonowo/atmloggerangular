import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtmFault } from '../model/atmfault';
import { AtmFaultObj } from '../model/atmfaultObj';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AtmFaultService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = 'https://localhost:9442/atm';

  getAllFaults(): Observable<AtmFault[]> {
    return this.http.get<AtmFault[]>(`${this.baseUrl}/atm-faults`);
  }

  insertFault(fault: AtmFaultObj): Observable<any> {
    return this.http.post(`${this.baseUrl}/atm-faults`, fault);
  }

  updateFault(fault: AtmFault): Observable<any> {
    return this.http.put(`${this.baseUrl}/atm-faults`, fault);
  }

}
