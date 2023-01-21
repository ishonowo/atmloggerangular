import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailIssueComponent } from './email-issue/email-issue.component';
import { IssueLoggedComponent } from './issue-logged/issue-logged.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';
import { MsalGuard } from './shared/msal.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'issue-log',
    component: IssueLoggedComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'email',
    component: EmailIssueComponent,
    canActivate: [MsalGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [MsalGuard],
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
