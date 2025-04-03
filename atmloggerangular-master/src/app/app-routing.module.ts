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
import { DisplayContactComponent } from './database/display/display-contact/display-contact.component';
import { DisplayTerminalComponent } from './database/display/display-terminal/display-terminal.component';
import { DisplayRegionComponent } from './database/display/display-region/display-region.component';
import { DisplayVendorComponent } from './database/display/display-vendor/display-vendor.component';
import { DisplayBranchInfoComponent } from './database/display/display-branch-info/display-branch-info.component';
import { DisplayComponent } from './database/display/display.component';
import { UpDisplayRegionComponent } from './database/update/up-display-region/up-display-region.component';
import { UpDisplayVendorComponent } from './database/update/up-display-vendor/up-display-vendor.component';
import { UpDisplayContactComponent } from './database/update/up-display-contact/up-display-contact.component';
import { UpDisplayTerminalComponent } from './database/update/up-display-terminal/up-display-terminal.component';
import { UpDisplayBranchComponent } from './database/update/up-display-branch/up-display-branch.component';
import { LoggedCallComponent } from './logged-call/logged-call.component';

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
    path: 'db-display',
    component: DisplayComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'display-branch',
    component: DisplayBranchInfoComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'display-contact',
    component: DisplayContactComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'display-region',
    component: DisplayRegionComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'display-terminal',
    component: DisplayTerminalComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'display-vendor',
    component: DisplayVendorComponent,
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
    path: 'insert-contact',
    component: InsertContactComponent,
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
    path: 'insert-vendor',
    component: InsertVendorComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'db-update',
    component: DbUpdateComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'update-branch',
    component: UpDisplayBranchComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'update-contact',
    component: UpDisplayContactComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'update-region',
    component: UpDisplayRegionComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'update-terminal',
    component: UpDisplayTerminalComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'update-vendor',
    component: UpDisplayVendorComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'logged-call',
    component: LoggedCallComponent,
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
