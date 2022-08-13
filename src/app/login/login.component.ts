import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BasicAuthenticationService } from "../shared/basic-authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public username: string = "ben";
  public password: string = "";
  public errorMessage: string = "Invalid Credentials";
  public invalidLogin: boolean = false;

  constructor(
    private router: Router,
    private loginservice: BasicAuthenticationService
  ) {}

  ngOnInit() {}

  checkLogin() {
    this.loginservice.getJWTAuthService(this.username, this.password).subscribe(
      (res) => {
        console.log(res);
        //this.router.navigate(["atm", this.username]);
        this.router.navigate(["basicauth"]);
        this.invalidLogin = false;
      },
      (err) => {
        console.log(err);
        this.invalidLogin = true;
      }
    );
  }

  checkLoginTest(): void {
    this.loginservice
      .getJWTMessageAuthService(this.username, this.password)
      .subscribe(
        (res) => {
          console.log(res);
          //this.router.navigate(["atm", this.username]);
          this.router.navigate(["basicauth"]);
          this.invalidLogin = false;
        },
        (err) => {
          console.log(err);
          this.invalidLogin = true;
        }
      );
  }
}
