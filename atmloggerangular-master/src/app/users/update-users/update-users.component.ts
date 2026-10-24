import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { AuthService } from '../../shared/auth.service';
import { UserObj } from '../../model/userObj';
import { Role } from '../../model/role';
import { Page, RoleAuditObj } from '../../model/roleAuditObj';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css'],
})
export class UpdateUsersComponent implements OnInit {
  protected users: UserObj[] = [];
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
    this.userService.getAllRoles().subscribe({
      next: (roles) => (this.roles = roles),
      error: () => (this.error = 'Unable to load roles.'),
    });
    this.loadUsers();
    this.loadAudit();
  }

  protected get selectedUser(): UserObj | undefined {
    return this.users.find((u) => u.id === this.selectedUserId);
  }

  protected hasRole(role: Role): boolean {
    return !!this.selectedUser?.roles.some((r) => r.id === role.id);
  }

  protected onUserChange(userId: number | null): void {
    this.selectedUserId = userId;
    this.loadAudit(0);
  }

  private loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: () => {
        this.error = 'Unable to load users.';
        this.loading = false;
      },
    });
  }

  protected toggleRole(role: Role): void {
    const user = this.selectedUser;
    if (!user || this.busyRoleId !== null) return;

    this.busyRoleId = role.id;
    this.error = '';

    const request$ = this.hasRole(role)
      ? this.userService.removeRoleFromUser(user.id, role.id)
      : this.userService.addRoleToUser(user.id, role.id);

    request$.subscribe({
      next: (updated) => {
        // Replace the user with the server's authoritative copy
        this.users = this.users.map((u) => (u.id === updated.id ? updated : u));
        this.busyRoleId = null;
        this.loadAudit(0); // show the new entry immediately
      },
      error: (err) => {
        this.error = err?.error?.message || 'Could not update the role.';
        this.busyRoleId = null;
        this.loadAudit(0); // denied attempts are logged too
      },
    });
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
