import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { EmailIssueComponent } from './email-issue/email-issue.component';
import { IssueLoggedComponent } from './issue-logged/issue-logged.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';
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
    path: 'auth',
    component: AuthComponent,
    
  },
  {
    path: 'issue-log',
    component: IssueLoggedComponent,
    
  },
  {
    path: 'database',
    component: DatabaseComponent,
    
  },
  {
    path: 'db-display',
    component: DisplayComponent,
    
  },
  {
    path: 'display-branch',
    component: DisplayBranchInfoComponent,
    
  },
  {
    path: 'display-contact',
    component: DisplayContactComponent,
    
  },
  {
    path: 'display-region',
    component: DisplayRegionComponent,
    
  },
  {
    path: 'display-terminal',
    component: DisplayTerminalComponent,
    
  },
  {
    path: 'display-vendor',
    component: DisplayVendorComponent,
    
  },
  {
    path: 'db-insert',
    component: DbInsertComponent,
    
  },
  {
    path: 'insert-branch',
    component: InsertBranchComponent,
    
  },
  {
    path: 'insert-contact',
    component: InsertContactComponent,
    
  },
  {
    path: 'insert-region',
    component: InsertRegionComponent,
    
  },
  {
    path: 'insert-terminal',
    component: InsertTerminalComponent,
    
  },
  {
    path: 'insert-vendor',
    component: InsertVendorComponent,
    
  },
  {
    path: 'db-update',
    component: DbUpdateComponent,
    
  },
  {
    path: 'update-branch',
    component: UpDisplayBranchComponent,
    
  },
  {
    path: 'update-contact',
    component: UpDisplayContactComponent,
    
  },
  {
    path: 'update-region',
    component: UpDisplayRegionComponent,
    
  },
  {
    path: 'update-terminal',
    component: UpDisplayTerminalComponent,
    
  },
  {
    path: 'update-vendor',
    component: UpDisplayVendorComponent,
    
  },
  {
    path: 'logged-call',
    component: LoggedCallComponent,
    
  },
  {
    path: 'email',
    component: EmailIssueComponent,
    
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'logout',
    component: LogoutComponent,
    
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
