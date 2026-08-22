import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  username: string = '';
  password: string = '';
  errorMessage: string | null = null;
  isSubmitting: boolean = false;

  onSubmit() {
    this.errorMessage = null;
    this.isSubmitting = true;

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.isSubmitting = false;
        // Token is stored by AuthService; redirect into the app
        this.router.navigate(['/issue-log']);
      },
      error: (err: HttpErrorResponse) => {
        this.isSubmitting = false;

        console.error('Login failed:', err);

        const backendMessage =
          err.error?.error ||
          err.error?.message ||
          (typeof err.error === 'string' ? err.error : null);

        this.errorMessage = backendMessage
          ? backendMessage
          : `Login failed (HTTP ${err.status}): ${err.statusText || 'Unknown error'}`;
      },
    });
  }
}