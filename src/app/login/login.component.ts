import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public errorMessage: string = 'the user has no name';
  public invalidLogin: boolean = false;

  constructor(private router: Router, private msalService: MsalService) {}

  ngOnInit() {}

  getName(): string {
    let sName = this.msalService.instance.getActiveAccount()?.username;
    if (sName) {
      return sName;
    } else {
      return this.errorMessage;
    }
  }
}
