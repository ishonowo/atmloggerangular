import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchObject } from '../model/BranchObject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private baseUrl: string = 'http://localhost:9442/api/branches';
  
  constructor(private http: HttpClient) { }
  
  
  findAllBrancheswNames(): Observable<BranchObject[]> {
    return this.http.get<BranchObject[]>(this.baseUrl);
  }


}
