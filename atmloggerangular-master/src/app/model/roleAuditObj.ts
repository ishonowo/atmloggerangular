export interface RoleAuditObj {
  id: number;
  performedAt: string;
  performedBy: string;
  action: 'ADDED' | 'REMOVED' | 'REMOVE_DENIED';
  targetUserId: number;
  targetLdapCn: string;
  roleId: number;
  roleName: string;
  detail: string | null;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // current page, 0-based
  size: number;
}