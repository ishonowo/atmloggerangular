import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Only attach the token to requests going to our own API
  const isApiUrl = req.url.startsWith(environment.apiBaseUrl);

  // Never attach the token to auth endpoints (login/register/refresh)
  const isAuthEndpoint = /\/auth\/(login|register|refresh)/.test(req.url);

  const token = authService.getToken();

  const authReq = token && isApiUrl && !isAuthEndpoint
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login'], {
          queryParams: { sessionExpired: true },
        });
      }
      return throwError(() => error);
    })
  );
};