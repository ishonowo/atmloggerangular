import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BranchObj } from '../model/branchObj';
import { BranchWithName } from '../model/branchWithName';
import { BranchObject } from '../model/branchObject';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private baseUrl: string = 'http://localhost:9442/api/branches';

  constructor(private http: HttpClient) {}

  findAllBranchesWithNames(): Observable<BranchWithName[]> {
    return this.http.get<BranchWithName[]>(this.baseUrl);
  }

  getAllNames() {
    return this.http.get<BranchWithName[]>(this.baseUrl);
  }

  insertBranch(branchObj: BranchObj): Observable<any> {
    return this.http.post<any>(this.baseUrl, branchObj);
  }

  updateBranch(branch: BranchWithName): Observable<any> {
        return this.http.put<BranchWithName>(this.baseUrl, branch);
  }

}
