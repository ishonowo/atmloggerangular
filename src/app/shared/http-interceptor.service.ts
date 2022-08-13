import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { BasicAuthenticationService } from './basic-authentication.service';

@Injectable({
  providedIn: 'root'
})

export class HttpInterceptorService implements HttpInterceptor{

  constructor(private auth: BasicAuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){

    // let username='ikenna';
    // let password='password';
    // let basicAuthHeaderString='Basic '+ window.btoa(username+':'+password);
    let basicAuthHeaderString= this.auth.getAuthenticatedToken();
    let username= this.auth.getAuthenticatedUser();

    if (basicAuthHeaderString && username){
      req= req.clone({
          setHeaders : {
          Authorization : basicAuthHeaderString
        }
      });
    }
    return next.handle(req);
  }
}

/*@Injectable()
export class HeaderInterceptor implements HttpInterceptor { 

   addAuthHeader(request) {
     const req: HttpRequest<any> = request.clone({
         headers: new HttpHeaders({
             'Content-Type': 'application/json',
             Authorization: 'Bearer ' + this.userService.getAccessToken()
         })
     });
     return req;
  }
}
*/