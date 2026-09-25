import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AtmService } from './atm.service';

interface LoginResponse {
  token: string;
  email: string;
  fullName: string;
  roles: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // AuthController is @RequestMapping("/atm/login/auth") with the endpoint
  // itself at @PostMapping("/login") - the previous apiUrl was missing the
  // "/login" segment, so every request 404'd before it ever reached LDAP.
  private apiUrl: string = 'https://localhost:9442/atm/auth';

  private roles: string[] = JSON.parse(localStorage.getItem('auth_roles') ?? '[]');


  constructor(private http: HttpClient,
    private atmService: AtmService) {}

  // "cn" rather than "username": this directory's person entries only have
  // a cn attribute (e.g. "lola"), not uid - see AuthComponent/template.
  // The JSON key sent is "uid" because that's the field name on the
  // backend's LoginRequest DTO (a generic login-identifier field, not tied
  // to an LDAP attribute literally called uid).
  login(cn: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { cn: cn, password }).pipe(
      tap((res) => {
        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('auth_email', res.email);
        localStorage.setItem('auth_full_name', res.fullName);
        localStorage.setItem('auth_roles', JSON.stringify(res.roles));
        this.roles = res.roles;
      }),
    );
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getEmail(): string | null {
    return localStorage.getItem('auth_email');
  }

  getFullName(): string | null {
    return localStorage.getItem('auth_full_name');
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some((r) => this.roles.includes(r));
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_email');
    localStorage.removeItem('auth_full_name');
    localStorage.removeItem('auth_roles');
    this.roles = [];
    if (this.atmService.atmIssues?.length){this.atmService.atmIssues = [];}
  }
}