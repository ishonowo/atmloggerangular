import { Component } from '@angular/core';
import { Role } from 'src/app/model/role';
import { Page, RoleAuditObj } from 'src/app/model/roleAuditObj';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-audit-users',
  templateUrl: './audit-users.component.html',
  styleUrls: ['./audit-users.component.css'],
})
export class AuditUsersComponent {
  protected roles: Role[] = [];
  protected selectedUserId: number | null = null;

  protected loading = true;
  protected error = '';
  protected busyRoleId: number | null = null; // role currently being saved

  // Audit history
  protected audit: RoleAuditObj[] = [];
  protected auditPage = 0;
  protected auditTotalPages = 0;
  protected isClicked = false;

  constructor(
    private userService: UserService,
    protected authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadAudit();
  }
  protected loadAudit(page = 0): void {
    this.userService.getRoleAudit(this.selectedUserId, page).subscribe({
      next: (p: Page<RoleAuditObj>) => {
        this.audit = p.content;
        this.auditPage = p.number;
        this.auditTotalPages = p.totalPages;
      },
      error: () => (this.error = 'Unable to load the audit history.'),
    });
  }

  protected formatDateTime(value: string): string {
    return new Date(value).toLocaleString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Africa/Lagos',
    });
  }
}
