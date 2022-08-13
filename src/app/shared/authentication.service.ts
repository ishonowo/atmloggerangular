import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor() {}

  authenticate(username, password): boolean {
    if (username === "ikenna" && password === "password") {
      sessionStorage.setItem("username", username);
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem("username");
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("username");
  }
}
