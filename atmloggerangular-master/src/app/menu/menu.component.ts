import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(private msalService: MsalService
  ) {}

  ngOnInit() {
    this.msalService.instance.handleRedirectPromise().then((result) => {
      if (result != null && result.account != null) {
        this.msalService.instance.setActiveAccount(result.account);
      }
    });
  }

  login() {
    // Redirect to Microsoft
    this.msalService.loginRedirect();
  }

  logout() {
    this.msalService.logout();
  }

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }
}
