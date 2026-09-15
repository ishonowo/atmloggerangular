export type SlaStatus = 'PENDING' | 'ON_HOLD' | 'RESOLVED' | 'REOPENED';

export interface SlaLog {
  id: number;
  faultId: number;
  category: string;
  allowedHours: number;
  status: SlaStatus;
  openedAt: string;
  closedAt?: string;
  holdStartedAt?: string;
  totalHoldSeconds: number;
  reopenedCount: number;
  lastUpdatedAt: string;
  deadline: string;
  breached: boolean;
}

export interface CreateSlaLogRequest {
  faultId: number;
  category: string;
}

export interface HoldRequest {
  holdStartedAt: string;
  changedBy?: string;
  notes?: string;
}

export interface ResumeRequest {
  holdEndedAt: string;
  changedBy?: string;
  notes?: string;
}

export interface ResolveRequest {
  closedAt?: string;
  changedBy?: string;
  notes?: string;
}
