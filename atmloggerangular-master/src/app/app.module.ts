import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IssueLoggedComponent } from './issue-logged/issue-logged.component';
import { DbUpdateComponent } from './database/update/db-update/db-update.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmailIssueComponent } from './email-issue/email-issue.component';
import { ReportComponent } from './report/report.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ErrorComponent } from './error/error.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
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
import { UpDisplayBranchComponent } from './database/update/up-display-branch/up-display-branch.component';
import { UpdateBranchComponent } from './database/update/up-display-branch/update-branch/update-branch.component';
import { LoggedCallComponent } from './logged-call/logged-call.component';
import { UpdateCallComponent } from './logged-call/update-call/update-call.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';

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
    UpDisplayRegionComponent,
    UpdateRegionComponent,
    UpDisplayVendorComponent,
    UpdateVendorComponent,
    UpDisplayContactComponent,
    UpdateVendorContactComponent,
    UpDisplayTerminalComponent,
    UpdateTerminalComponent,
    UpDisplayBranchComponent,
    UpdateBranchComponent,
    LoggedCallComponent,
    UpdateCallComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Handles all application routing
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideHttpClient(withInterceptors([AuthInterceptor]))],
  bootstrap: [AppComponent], // ONLY AppComponent belongs here
})
export class AppModule {}