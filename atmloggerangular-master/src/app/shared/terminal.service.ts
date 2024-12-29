import { Injectable } from '@angular/core';
import { Terminal } from '../model/terminal';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TerminalObject } from '../model/terminalObject';
import { TerminalObj } from '../model/terminalObj';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  private baseUrl: string = 'http://localhost:9442/api/terminals';

  constructor(private http: HttpClient) {}

  getAllTerminals(): Observable<Terminal[]> {
    return this.http.get<Terminal[]>(this.baseUrl);
  }

  getAllTerminalwNames(): Observable<TerminalObject[]> {
    return this.http.get<TerminalObject[]>(this.baseUrl);
  }

  insertTerminal(terminalObj: TerminalObj):
   Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, terminalObj);
  }
}


