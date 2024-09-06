import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public errorMessage: string = 'this user is not logged in';
  public isUserLoggedIn: boolean=false;
  public sName: string|undefined='';

  constructor(private router: Router, private msalService: MsalService
  ) {}

  ngOnInit() { }

  ngOnDestroy() {}  
  
  getName(): string {
    this.sName = this.msalService.instance.getActiveAccount()?.username;
    if (this.sName) {
      this.isUserLoggedIn=true;
      return this.sName;
    } else {
      this.isUserLoggedIn=false;
      return this.errorMessage;
    }
  }
}
