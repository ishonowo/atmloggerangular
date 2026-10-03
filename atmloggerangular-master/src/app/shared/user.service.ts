import { Injectable } from '@angular/core';
import { Role } from '../model/role';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = 'https://localhost:9442/atm/user';
  private roleUrl: string = '/role';

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}${this.roleUrl}`);
  }

  postCreateUser(createdUser: User): Observable<any> {
    return this.http.post(`${this.baseUrl}`, createdUser);
  }
}
