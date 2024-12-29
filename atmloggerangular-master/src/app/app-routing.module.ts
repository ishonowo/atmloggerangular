import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailIssueComponent } from './email-issue/email-issue.component';
import { IssueLoggedComponent } from './issue-logged/issue-logged.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';
import { MsalGuard } from './shared/msal.guard';
import { DatabaseComponent } from './database/database.component';
import { DbInsertComponent } from './database/insert/db-insert.component';
import { DbUpdateComponent } from './database/update/db-update/db-update.component';
import { InsertBranchComponent } from './database/insert/insert-branch/insert-branch.component';
import { InsertVendorComponent } from './database/insert/insert-vendor/insert-vendor.component';
import { InsertRegionComponent } from './database/insert/insert-region/insert-region.component';
import { InsertTerminalComponent } from './database/insert/insert-terminal/insert-terminal.component';
import { InsertContactComponent } from './database/insert/insert-contact/insert-contact.component';

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
    path: 'database',
    component: DatabaseComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'db-insert',
    component: DbInsertComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'insert-branch',
    component: InsertBranchComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'insert-vendor',
    component: InsertVendorComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'insert-region',
    component: InsertRegionComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'insert-terminal',
    component: InsertTerminalComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'insert-contact',
    component: InsertContactComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'db-update',
    component: DbUpdateComponent,
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
