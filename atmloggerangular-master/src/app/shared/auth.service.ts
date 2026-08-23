import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl: string = 'https://localhost:9442/atm/login/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string; email: string  }> {
    return this.http.post<{ token: string; email:string }>(`${this.apiUrl}`, { username, password }).pipe(
      tap(res =>  {
        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('auth_email', res.email);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getEmail(): string | null {
    return localStorage.getItem('auth_email');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }
}
