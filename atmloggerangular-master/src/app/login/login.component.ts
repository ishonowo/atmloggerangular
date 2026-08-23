import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public errorMessage: string = 'this user is not logged in';
  public isUserLoggedIn: boolean=false;
  public sName: string|undefined;

  constructor(private router: Router,private authService:AuthService
  ) {}

  ngOnInit() { }

  ngOnDestroy() {}  
  
  getName(): string|undefined {
  const token = this.authService.getToken();
  if (!token) {
    this.isUserLoggedIn = false;
    return this.errorMessage;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const email = payload.email;

    if (email) {
      this.isUserLoggedIn = true;
      this.sName = email;
      return this.sName;
    } else {
      this.isUserLoggedIn = false;
      return this.errorMessage;
    }
  } catch {
    this.isUserLoggedIn = false;
    return this.errorMessage;
  }
  }
}
