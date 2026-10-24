import { Injectable } from '@angular/core';
import { Role } from '../model/role';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../model/user';
import { UserObj } from '../model/userObj';
import { Page, RoleAuditObj } from '../model/roleAuditObj';

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

  getAllUsers(): Observable<UserObj[]> {
    return this.http.get<[UserObj]>(this.baseUrl);
  }

  addRoleToUser(userId: number, roleId: number): Observable<UserObj> {
    return this.http.put<UserObj>(
      `${this.baseUrl}/${userId}/roles/${roleId}`,
      null,
    );
  }

  removeRoleFromUser(userId: number, roleId: number): Observable<UserObj> {
    return this.http.delete<UserObj>(
      `${this.baseUrl}/${userId}/roles/${roleId}`,
    );
  }

  getRoleAudit(
    userId: number | null,
    page = 0,
    size = 20,
  ): Observable<Page<RoleAuditObj>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (userId !== null) params = params.set('userId', userId);
    return this.http.get<Page<RoleAuditObj>>(`${this.baseUrl}/audit`, {
      params,
    });
  }
}
