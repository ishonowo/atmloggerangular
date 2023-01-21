import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IssueLoggedComponent } from './issue-logged/issue-logged.component';
import { Router, Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmailIssueComponent } from './email-issue/email-issue.component';
import { ReportComponent } from './report/report.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '630cbdbe-7cd3-4715-816f-5b780eed3d90',
      redirectUri: 'http://localhost:4200',
    },
  });
}

const appRoutes: Routes = [
  {
    path: 'issue-log',
    component: IssueLoggedComponent,
  },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    IssueLoggedComponent,
    NotFoundComponent,
    EmailIssueComponent,
    ReportComponent,
    LoginComponent,
    LogoutComponent,
    ErrorComponent,
    MenuComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    FormsModule,
    HttpClientModule,
    MsalModule,
  ],
  providers: [
    {
      /*provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,*/
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    MsalService,
  ],
  bootstrap: [AppComponent, BrowserModule, AppRoutingModule],
})
export class AppModule {}
