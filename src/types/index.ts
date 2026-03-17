// ============================================================
// WRPS ESCO Online Reporting Platform — Core Type Definitions
// ============================================================

export type ReportStatus =
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected"
  | "info_requested"
  | "closed";

export type UserRole =
  | "citizen"
  | "reviewer"
  | "supervisor"
  | "agency_admin"
  | "esco_super_admin";

export interface Agency {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  subdomain: string;
  phone: string;
  email: string;
  address: string;
}

export interface ReportType {
  id: string;
  name: string;
  nameFr: string;
  description: string;
  descriptionFr: string;
  icon: string;
  enabled: boolean;
  agencyId: string;
  eligibilityQuestions: EligibilityQuestion[];
  fields: FormField[];
  evidenceMode: "always" | "by_request" | "disabled";
  propertyValueThreshold?: number;
}

export interface EligibilityQuestion {
  id: string;
  question: string;
  questionFr: string;
  disqualifyOnYes: boolean;
  redirectMessage: string;
  redirectMessageFr: string;
}

export interface FormField {
  id: string;
  label: string;
  labelFr: string;
  type: "text" | "textarea" | "date" | "time" | "select" | "number" | "email" | "phone" | "address";
  required: boolean;
  placeholder?: string;
  placeholderFr?: string;
  options?: { value: string; label: string; labelFr: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  step: number;
  group: string;
}

export interface Report {
  id: string;
  trackingNumber: string;
  type: ReportType;
  status: ReportStatus;
  agencyId: string;
  citizenName: string;
  citizenEmail: string;
  citizenPhone?: string;
  submittedAt: string;
  updatedAt: string;
  assignedOfficerId?: string;
  assignedOfficerName?: string;
  occurrenceNumber?: string;
  data: Record<string, string | number | boolean>;
  evidenceFiles: EvidenceFile[];
  notes: ReportNote[];
  auditLog: AuditEntry[];
  statusHistory: StatusChange[];
}

export interface EvidenceFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  url: string;
}

export interface ReportNote {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
  isInternal: boolean;
}

export interface AuditEntry {
  id: string;
  action: string;
  userId: string;
  userName: string;
  timestamp: string;
  details: string;
  ipAddress: string;
}

export interface StatusChange {
  status: ReportStatus;
  changedAt: string;
  changedBy: string;
  reason?: string;
}

export interface Officer {
  id: string;
  name: string;
  badgeNumber: string;
  rank: string;
  email: string;
  agencyId: string;
  role: UserRole;
  avatar?: string;
  reportsAssigned: number;
}

export interface DashboardMetrics {
  totalReports: number;
  pendingReview: number;
  approvedToday: number;
  rejectedToday: number;
  avgProcessingTime: string;
  reportsByType: { type: string; count: number }[];
  reportsByStatus: { status: ReportStatus; count: number }[];
  reportsTrend: { date: string; count: number }[];
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  agencyId: string;
  type: "approval" | "rejection" | "info_request" | "status_update";
}

export type Locale = "en" | "fr";
