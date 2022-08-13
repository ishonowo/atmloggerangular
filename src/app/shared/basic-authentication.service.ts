import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class BasicAuthenticationService {
  //private BASE_URL=window["cfgAtmBaseUrl"];
  private BASE_URL = "http://localhost:9443";
  public AUTH_URL = `${this.BASE_URL}\\basicauth\\`;
  //public AUTH_URL = `${this.BASE_URL}\\atm\\`;
  public OUT_URL = `${this.BASE_URL}\\logout\\`;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  /*public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.host}/user/login`, user, { observe: 'response' });
  }*/

  getJWTAuthService(username: string, password: string) {
    return this.http.post<any>(this.AUTH_URL, { username, password }).pipe(
      map(
        (res) => {
          sessionStorage.setItem("authenticateUser", username);
          sessionStorage.setItem("token", `Bearer ${res.token}`);
          return res;
        },
        (error) => {
          console.log(error);
        }
      )
    );
  }

  getJWTMessageAuthService(
    username: string,
    password: string
  ): Observable<string> {
    return this.http.post<string>(this.AUTH_URL, { username, password }).pipe(
      map(
        (res: string) => {
          sessionStorage.setItem("authenticateUser", username);
          sessionStorage.setItem("token", `Bearer ${res}`);
          return res;
        },
        (error: any) => {
          console.log(error);
        }
      )
    );
  }

  getAuthenticatedUser(): string {
    return sessionStorage.getItem("authenticateUser");
  }

  getAuthenticatedToken(): string {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem("token");
    }
  }

  isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem("authenticateUser");
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    //this.http.get(this.OUT_URL);
    sessionStorage.removeItem("authenticateUser");
    sessionStorage.removeItem("token");
  }
}

export class AuthenticationBean {
  constructor(public message: string) {}
}
