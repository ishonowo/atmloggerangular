import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IssueLoggedComponent } from './issue-logged/issue-logged.component';
import { DbUpdateComponent } from './database/update/db-update/db-update.component';
import { Router, Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { DbInsertComponent } from './database/insert/db-insert.component';
import { DatabaseComponent } from './database/database.component';
import { InsertBranchComponent } from './database/insert/insert-branch/insert-branch.component';
import { InsertVendorComponent } from './database/insert/insert-vendor/insert-vendor.component';
import { InsertRegionComponent } from './database/insert/insert-region/insert-region.component';
import { InsertTerminalComponent } from './database/insert/insert-terminal/insert-terminal.component';
import { InsertContactComponent } from './database/insert/insert-contact/insert-contact.component';
import { DisplayContactComponent } from './database/display/display-contact/display-contact.component';
import { DisplayVendorComponent } from './database/display/display-vendor/display-vendor.component';
import { DisplayTerminalComponent } from './database/display/display-terminal/display-terminal.component';
import { DisplayBranchInfoComponent } from './database/display/display-branch-info/display-branch-info.component';
import { DisplayRegionComponent } from './database/display/display-region/display-region.component';
import { DisplayComponent } from './database/display/display.component';
import { RegionItemComponent } from './database/display/display-region/region-item/region-item.component';
import { UpDisplayRegionComponent } from './database/update/up-display-region/up-display-region.component';
import { UpdateRegionComponent } from './database/update/up-display-region/update-region/update-region.component';
import { UpDisplayVendorComponent } from './database/update/up-display-vendor/up-display-vendor.component';
import { UpdateVendorComponent } from './database/update/up-display-vendor/update-vendor/update-vendor.component';
import { UpDisplayContactComponent } from './database/update/up-display-contact/up-display-contact.component';
import { UpdateVendorContactComponent } from './database/update/up-display-contact/update-vendor-contact/update-vendor-contact.component';
import { UpDisplayTerminalComponent } from './database/update/up-display-terminal/up-display-terminal.component';
import { UpdateTerminalComponent } from './database/update/up-display-terminal/update-terminal/update-terminal.component';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      //clientId: '630cbdbe-7cd3-4715-816f-5b780eed3d90',
      clientId: '05d02707-b643-4f22-8e61-391484cb9733',
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
    DbUpdateComponent,
    DbInsertComponent,
    DatabaseComponent,
    InsertBranchComponent,
    InsertVendorComponent,
    InsertRegionComponent,
    InsertTerminalComponent,
    InsertContactComponent,
    DisplayContactComponent,
    DisplayVendorComponent,
    DisplayTerminalComponent,
    DisplayBranchInfoComponent,
    DisplayRegionComponent,
    DisplayComponent,
    RegionItemComponent,
    DbUpdateComponent,
    UpDisplayRegionComponent,
    UpdateRegionComponent,
    UpDisplayVendorComponent,
    UpdateVendorComponent,
    UpDisplayContactComponent,
    UpdateVendorContactComponent,
    UpdateVendorContactComponent,
    UpDisplayTerminalComponent,
    UpdateTerminalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    FormsModule,
    HttpClientModule,
    MsalModule,
    ReactiveFormsModule
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
