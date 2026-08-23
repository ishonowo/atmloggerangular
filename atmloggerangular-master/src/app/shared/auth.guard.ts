// src/app/shared/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload.exp) {
      // No expiry claim present — treat as non-expiring rather than guessing.
      return false;
    }
    const expiryMs = payload.exp * 1000; // JWT 'exp' is in seconds since epoch
    return Date.now() >= expiryMs;
  } catch {
    // Malformed token — treat as expired/invalid.
    return true;
  }
}

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (token && !isTokenExpired(token)) {
    return true;
  }

  // Token missing or expired — clear stale session data and redirect.
  authService.logout();
  router.navigate(['/auth']);
  return false;
};