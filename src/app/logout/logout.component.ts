import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../shared/basic-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authenticationService: BasicAuthenticationService,
    private router: Router) {

  }

  ngOnInit() {
    this.authenticationService.logOut();
    this.router.navigate(['logout']);
  }

}