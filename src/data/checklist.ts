export type ChecklistStatus =
  | "ui_complete"
  | "needs_backend"
  | "not_started"
  | "partial"
  | "out_of_scope";

export type Priority = "MUST" | "SHOULD" | "MAY";

export interface ChecklistItem {
  id: string;
  requirement: string;
  section: string;
  prdRef: string;
  priority: Priority;
  status: ChecklistStatus;
  notes: string;
}

export interface ChecklistSection {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export const statusLabels: Record<ChecklistStatus, { label: string; color: string; bg: string }> = {
  ui_complete: { label: "UI Complete", color: "text-green-700", bg: "bg-green-50 border-green-200" },
  needs_backend: { label: "Needs Backend", color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  partial: { label: "Partial", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200" },
  not_started: { label: "Not Started", color: "text-gray-700", bg: "bg-gray-50 border-gray-200" },
  out_of_scope: { label: "Out of Scope (UI Only)", color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
};

export const checklistSections: ChecklistSection[] = [
  {
    id: "4.1.1",
    title: "4.1.1 — Report Type Selection",
    items: [
      { id: "4.1.1-1", requirement: "Categorized menu of reportable incident types (Theft, Shoplifting, Mischief, Fraud, Traffic, Lost Property)", section: "4.1.1", prdRef: "4.1.1", priority: "MUST", status: "ui_complete", notes: "6 report types with icons and descriptions on /report" },
      { id: "4.1.1-2", requirement: "Each incident type includes plain-language description", section: "4.1.1", prdRef: "4.1.1", priority: "MUST", status: "ui_complete", notes: "EN + FR descriptions for each type in mock data" },
      { id: "4.1.1-3", requirement: "Smart routing logic — detect ineligible incidents and redirect to emergency", section: "4.1.1", prdRef: "4.1.1", priority: "MUST", status: "ui_complete", notes: "Eligibility quiz on wizard disqualifies and shows redirect message" },
      { id: "4.1.1-4", requirement: "Incident type list configurable per agency", section: "4.1.1", prdRef: "4.1.1", priority: "MUST", status: "partial", notes: "Report types have agencyId field; admin UI has enable/disable toggles. Backend needed for persistence" },
      { id: "4.1.1-5", requirement: "Short eligibility quiz prior to report type selection", section: "4.1.1", prdRef: "4.1.1", priority: "SHOULD", status: "ui_complete", notes: "Eligibility phase in wizard with Yes/No questions per type" },
    ],
  },
  {
    id: "4.1.2",
    title: "4.1.2 — Guided Form Filling",
    items: [
      { id: "4.1.2-1", requirement: "Multi-step wizard-style form with progress indicator", section: "4.1.2", prdRef: "4.1.2", priority: "MUST", status: "ui_complete", notes: "Phase-based wizard with progress bar and step pills" },
      { id: "4.1.2-2", requirement: "Intuitive forms with real-time inline validation and error messages", section: "4.1.2", prdRef: "4.1.2", priority: "MUST", status: "ui_complete", notes: "Inline validation on step navigation with error icons" },
      { id: "4.1.2-3", requirement: "Date/time entry with calendar and time picker (not manual text entry)", section: "4.1.2", prdRef: "4.1.2", priority: "MUST", status: "partial", notes: "Uses native date/time HTML inputs. Could be enhanced with calendar component" },
      { id: "4.1.2-4", requirement: "Customizable field-level validation rules per agency and incident type", section: "4.1.2", prdRef: "4.1.2", priority: "MUST", status: "partial", notes: "Validation rules in mock data (min/max/pattern). Admin UI for editing fields exists but not wired to persistence" },
      { id: "4.1.2-5", requirement: "AI/chatbot assistance throughout the form", section: "4.1.2", prdRef: "4.1.2", priority: "MUST", status: "not_started", notes: "Requires AI integration (e.g. Claude API)" },
      { id: "4.1.2-6", requirement: "Automatic cross-validation (e.g. Theft Under $5,000 threshold)", section: "4.1.2", prdRef: "4.1.2", priority: "MUST", status: "ui_complete", notes: "Total value validated against propertyValueThreshold per report type" },
      { id: "4.1.2-7", requirement: "Property/goods itemized lists with descriptions and auto-tally", section: "4.1.2", prdRef: "4.1.2", priority: "MUST", status: "partial", notes: "Textarea for items list + total value field. Could be enhanced with dynamic item rows" },
      { id: "4.1.2-8", requirement: "Contradictory/invalid responses flagged before progression", section: "4.1.2", prdRef: "4.1.2", priority: "MUST", status: "ui_complete", notes: "Validation runs on Next click; errors block progression" },
      { id: "4.1.2-9", requirement: "Real-time translation (EN/FR at launch)", section: "4.1.2", prdRef: "4.1.2", priority: "SHOULD", status: "ui_complete", notes: "Full EN/FR dictionary for UI. Field labels translated in mock data" },
      { id: "4.1.2-10", requirement: "Save-and-resume for partially completed reports", section: "4.1.2", prdRef: "4.1.2", priority: "SHOULD", status: "not_started", notes: "Requires backend persistence (localStorage could be interim)" },
      { id: "4.1.2-11", requirement: "Voice-to-text field entry for accessibility", section: "4.1.2", prdRef: "4.1.2", priority: "MAY", status: "not_started", notes: "Requires Web Speech API integration" },
    ],
  },
  {
    id: "4.1.3",
    title: "4.1.3 — Digital Evidence Upload",
    items: [
      { id: "4.1.3-1", requirement: "Secure upload of photos, videos, and documents", section: "4.1.3", prdRef: "4.1.3", priority: "MUST", status: "ui_complete", notes: "Upload UI with drag-and-drop on evidence phase. Files shown with icons/sizes" },
      { id: "4.1.3-2", requirement: "Supported file types: JPEG, PNG, MP4, MOV, PDF, DOCX", section: "4.1.3", prdRef: "4.1.3", priority: "MUST", status: "ui_complete", notes: "Accept attribute set on file input" },
      { id: "4.1.3-3", requirement: "File size limits configurable per agency (min 25 MB/file, 100 MB/report)", section: "4.1.3", prdRef: "4.1.3", priority: "MUST", status: "needs_backend", notes: "UI shows file sizes. Backend needed for actual upload + limit enforcement" },
      { id: "4.1.3-4", requirement: "Evidence upload modes per report type: Always, By Request, Disabled", section: "4.1.3", prdRef: "4.1.3", priority: "MUST", status: "ui_complete", notes: "evidenceMode field on report types controls wizard phase visibility" },
      { id: "4.1.3-5", requirement: "Virus scanning before acceptance", section: "4.1.3", prdRef: "4.1.3", priority: "MUST", status: "out_of_scope", notes: "Server-side requirement — needs ClamAV or similar" },
      { id: "4.1.3-6", requirement: "Files encrypted at rest and in transit", section: "4.1.3", prdRef: "4.1.3", priority: "MUST", status: "out_of_scope", notes: "Infrastructure requirement — TLS + storage encryption" },
    ],
  },
  {
    id: "4.1.4",
    title: "4.1.4 — Report Confirmation & Tracking",
    items: [
      { id: "4.1.4-1", requirement: "Confirmation with unique tracking number and PDF copy via email", section: "4.1.4", prdRef: "4.1.4", priority: "MUST", status: "partial", notes: "Tracking number generated and shown on confirmation page. Email/PDF requires backend" },
      { id: "4.1.4-2", requirement: "Citizens can check status by tracking number", section: "4.1.4", prdRef: "4.1.4", priority: "MUST", status: "ui_complete", notes: "/track and /track/[id] pages with status timeline" },
      { id: "4.1.4-3", requirement: "Email/SMS notification on every status change", section: "4.1.4", prdRef: "4.1.4", priority: "MUST", status: "needs_backend", notes: "Email templates defined in mock data. Needs SMTP/SMS integration" },
      { id: "4.1.4-4", requirement: "Citizen can add supplemental info when requested by reviewer", section: "4.1.4", prdRef: "4.1.4", priority: "MUST", status: "not_started", notes: "Need supplemental report form accessible from tracking page" },
      { id: "4.1.4-5", requirement: "Supplemental reports validate original report exists and matches", section: "4.1.4", prdRef: "4.1.4", priority: "MUST", status: "not_started", notes: "Requires backend validation logic" },
    ],
  },
  {
    id: "4.1.5",
    title: "4.1.5 — Accessibility & Multilingual",
    items: [
      { id: "4.1.5-1", requirement: "Full WCAG 2.1 Level AA compliance", section: "4.1.5", prdRef: "4.1.5", priority: "MUST", status: "partial", notes: "Semantic HTML, ARIA labels, 44px touch targets, focus management. Needs formal audit" },
      { id: "4.1.5-2", requirement: "English and French language support at launch", section: "4.1.5", prdRef: "4.1.5", priority: "MUST", status: "ui_complete", notes: "Full EN/FR dictionary, locale toggle in header, cookie persistence" },
      { id: "4.1.5-3", requirement: "Language selection persistent across session", section: "4.1.5", prdRef: "4.1.5", priority: "MUST", status: "ui_complete", notes: "Cookie-based locale with 1-year expiry" },
      { id: "4.1.5-4", requirement: "Architecture supports additional languages without code changes", section: "4.1.5", prdRef: "4.1.5", priority: "SHOULD", status: "ui_complete", notes: "Dictionary-based i18n system — add new locale object to extend" },
      { id: "4.1.5-5", requirement: "Real-time translation engine (DeepL or similar)", section: "4.1.5", prdRef: "4.1.5", priority: "SHOULD", status: "not_started", notes: "Requires third-party translation API integration" },
    ],
  },
  {
    id: "4.2.1",
    title: "4.2.1 — Report Queue & Search",
    items: [
      { id: "4.2.1-1", requirement: "Dashboard with report queue filtered by status, type, date, officer, agency", section: "4.2.1", prdRef: "4.2.1", priority: "MUST", status: "ui_complete", notes: "/officer/dashboard with status and type filters + search" },
      { id: "4.2.1-2", requirement: "Full-text search across all report fields", section: "4.2.1", prdRef: "4.2.1", priority: "MUST", status: "partial", notes: "Client-side search on tracking#, name, email, description. Needs backend full-text" },
      { id: "4.2.1-3", requirement: "Sortable and filterable queue columns", section: "4.2.1", prdRef: "4.2.1", priority: "MUST", status: "partial", notes: "Filters work. Column sorting not yet implemented" },
      { id: "4.2.1-4", requirement: "Reports assignable to individual reviewers or queues", section: "4.2.1", prdRef: "4.2.1", priority: "MUST", status: "ui_complete", notes: "Assignment dropdown on report detail page" },
      { id: "4.2.1-5", requirement: "Bulk actions — bulk assign, bulk status change", section: "4.2.1", prdRef: "4.2.1", priority: "MUST", status: "not_started", notes: "Need checkbox selection on table + bulk action bar" },
    ],
  },
  {
    id: "4.2.2",
    title: "4.2.2 — Report Review Actions",
    items: [
      { id: "4.2.2-1", requirement: "APPROVE — generate occurrence number, push to RMS, notify citizen", section: "4.2.2", prdRef: "4.2.2", priority: "MUST", status: "partial", notes: "Approve dialog with generated occurrence number. RMS push needs backend" },
      { id: "4.2.2-2", requirement: "REJECT — with reason, notify citizen, customizable email template", section: "4.2.2", prdRef: "4.2.2", priority: "MUST", status: "ui_complete", notes: "Reject dialog with reason textarea" },
      { id: "4.2.2-3", requirement: "REQUEST MORE INFO — structured request sent to citizen", section: "4.2.2", prdRef: "4.2.2", priority: "MUST", status: "ui_complete", notes: "Request Info dialog with message textarea" },
      { id: "4.2.2-4", requirement: "TRANSFER — transfer report to another agency or officer", section: "4.2.2", prdRef: "4.2.2", priority: "MUST", status: "partial", notes: "Transfer button exists but dialog not yet wired" },
      { id: "4.2.2-5", requirement: "INTERNAL NOTES — private notes not visible to citizen", section: "4.2.2", prdRef: "4.2.2", priority: "MUST", status: "ui_complete", notes: "Notes panel on report detail with add-note form" },
      { id: "4.2.2-6", requirement: "All reviewer actions timestamped and in audit log", section: "4.2.2", prdRef: "4.2.2", priority: "MUST", status: "ui_complete", notes: "Audit log tab on report detail with user, action, timestamp, IP" },
    ],
  },
  {
    id: "4.2.3",
    title: "4.2.3 — Communication Tools",
    items: [
      { id: "4.2.3-1", requirement: "Email notifications to citizens on all status transitions", section: "4.2.3", prdRef: "4.2.3", priority: "MUST", status: "needs_backend", notes: "Email templates defined. Needs SMTP integration" },
      { id: "4.2.3-2", requirement: "SMS notifications (where citizen provides mobile number)", section: "4.2.3", prdRef: "4.2.3", priority: "MUST", status: "needs_backend", notes: "Phone field captured. Needs SMS gateway integration" },
      { id: "4.2.3-3", requirement: "Reviewers can initiate live video call with citizen", section: "4.2.3", prdRef: "4.2.3", priority: "MUST", status: "ui_complete", notes: "/officer/video-call/[id] with full call UI" },
      { id: "4.2.3-4", requirement: "Email templates editable by reviewers before sending", section: "4.2.3", prdRef: "4.2.3", priority: "MUST", status: "ui_complete", notes: "/admin/templates with variable-aware editor" },
      { id: "4.2.3-5", requirement: "In-platform messaging thread between reviewer and citizen", section: "4.2.3", prdRef: "4.2.3", priority: "SHOULD", status: "not_started", notes: "Need chat/messaging component" },
    ],
  },
  {
    id: "4.3.1",
    title: "4.3.1 — Report Type Management",
    items: [
      { id: "4.3.1-1", requirement: "Admins can create, edit, disable, and delete report types", section: "4.3.1", prdRef: "4.3.1", priority: "MUST", status: "ui_complete", notes: "/admin/report-types with create dialog, toggle switches, edit/delete buttons" },
      { id: "4.3.1-2", requirement: "Configure required/optional fields, validation, thresholds, evidence per type", section: "4.3.1", prdRef: "4.3.1", priority: "MUST", status: "partial", notes: "Config displayed. Edit Fields button exists but form builder not yet built" },
      { id: "4.3.1-3", requirement: "Configure pre-filing eligibility questions per report type", section: "4.3.1", prdRef: "4.3.1", priority: "MUST", status: "partial", notes: "Edit Questions button exists. Question editor not yet built" },
      { id: "4.3.1-4", requirement: "Define sequence and grouping of form data elements", section: "4.3.1", prdRef: "4.3.1", priority: "MUST", status: "partial", notes: "Step + group fields in data model. Drag-and-drop reordering not yet built" },
      { id: "4.3.1-5", requirement: "Manage email notification templates for each status transition", section: "4.3.1", prdRef: "4.3.1", priority: "MUST", status: "ui_complete", notes: "/admin/templates with 4 template types" },
    ],
  },
  {
    id: "4.3.2",
    title: "4.3.2 — User & Access Management",
    items: [
      { id: "4.3.2-1", requirement: "RBAC: Citizen, Reviewer, Supervisor, Agency Admin, ESCO Super Admin", section: "4.3.2", prdRef: "4.3.2", priority: "MUST", status: "ui_complete", notes: "Role types defined. User table shows roles with badges" },
      { id: "4.3.2-2", requirement: "Supervisors can view all reports under their command", section: "4.3.2", prdRef: "4.3.2", priority: "MUST", status: "not_started", notes: "Needs role-based filtering on dashboard" },
      { id: "4.3.2-3", requirement: "Admins can create, modify, deactivate user accounts", section: "4.3.2", prdRef: "4.3.2", priority: "MUST", status: "ui_complete", notes: "/admin/users with add user dialog, edit/key buttons" },
      { id: "4.3.2-4", requirement: "Agency data fully isolated — users only see own agency data", section: "4.3.2", prdRef: "4.3.2", priority: "MUST", status: "needs_backend", notes: "agencyId on all data. Needs DB-level row security" },
      { id: "4.3.2-5", requirement: "SSO integration (Microsoft AD/Azure AD, SAML 2.0)", section: "4.3.2", prdRef: "4.3.2", priority: "MUST", status: "not_started", notes: "Requires auth provider integration (NextAuth/Auth.js)" },
      { id: "4.3.2-6", requirement: "MFA enforcement configurable at role level", section: "4.3.2", prdRef: "4.3.2", priority: "MUST", status: "partial", notes: "MFA toggle shown in user management. Needs actual MFA implementation" },
    ],
  },
  {
    id: "4.3.3",
    title: "4.3.3 — Branding & Configuration",
    items: [
      { id: "4.3.3-1", requirement: "Agency-specific branding: logo, colours, agency name", section: "4.3.3", prdRef: "4.3.3", priority: "MUST", status: "ui_complete", notes: "/admin/branding with live preview. Agency colors used throughout citizen portal" },
      { id: "4.3.3-2", requirement: "Custom agency subdomain or URL path", section: "4.3.3", prdRef: "4.3.3", priority: "MUST", status: "partial", notes: "Subdomain field in branding config. Needs DNS/routing setup" },
      { id: "4.3.3-3", requirement: "Custom email sender name and reply-to per agency", section: "4.3.3", prdRef: "4.3.3", priority: "SHOULD", status: "not_started", notes: "Needs email service configuration" },
    ],
  },
  {
    id: "4.3.4",
    title: "4.3.4 — Analytics & Reporting",
    items: [
      { id: "4.3.4-1", requirement: "Dashboard with operational metrics: total reports, avg time, approval/rejection rates, type distribution", section: "4.3.4", prdRef: "4.3.4", priority: "MUST", status: "ui_complete", notes: "/admin/dashboard with stats cards, bar charts, status breakdown" },
      { id: "4.3.4-2", requirement: "Trend analysis over configurable date ranges", section: "4.3.4", prdRef: "4.3.4", priority: "MUST", status: "ui_complete", notes: "Date range selector + daily volume chart" },
      { id: "4.3.4-3", requirement: "Geospatial hotspot mapping of incident locations", section: "4.3.4", prdRef: "4.3.4", priority: "SHOULD", status: "not_started", notes: "Needs map integration (Mapbox/Leaflet) with location data" },
      { id: "4.3.4-4", requirement: "Customizable report exports (CSV, Excel, PDF)", section: "4.3.4", prdRef: "4.3.4", priority: "SHOULD", status: "not_started", notes: "Needs export functionality" },
      { id: "4.3.4-5", requirement: "Community feedback module — post-interaction satisfaction surveys", section: "4.3.4", prdRef: "4.3.4", priority: "SHOULD", status: "not_started", notes: "Need survey component + results dashboard" },
      { id: "4.3.4-6", requirement: "Predictive analytics on report volume trends", section: "4.3.4", prdRef: "4.3.4", priority: "MAY", status: "not_started", notes: "Needs ML model or statistical analysis" },
    ],
  },
  {
    id: "4.4",
    title: "4.4 — Live Virtual Interaction (Video Call)",
    items: [
      { id: "4.4-1", requirement: "Secure browser-based video conferencing — no install for citizens", section: "4.4", prdRef: "4.4", priority: "MUST", status: "ui_complete", notes: "Video call UI at /officer/video-call/[id]. Needs WebRTC backend" },
      { id: "4.4-2", requirement: "Officer initiates call; citizen joins via email/SMS link", section: "4.4", prdRef: "4.4", priority: "MUST", status: "partial", notes: "UI shows invitation sent. Needs actual email/link generation" },
      { id: "4.4-3", requirement: "All calls recorded automatically", section: "4.4", prdRef: "4.4", priority: "MUST", status: "partial", notes: "Recording indicator shown in UI. Needs actual recording implementation" },
      { id: "4.4-4", requirement: "Recording auto-uploaded to DEMS with metadata", section: "4.4", prdRef: "4.4", priority: "MUST", status: "needs_backend", notes: "Requires DEMS API integration" },
      { id: "4.4-5", requirement: "End-to-end encrypted transmission", section: "4.4", prdRef: "4.4", priority: "MUST", status: "out_of_scope", notes: "Infrastructure requirement — WebRTC + SRTP" },
      { id: "4.4-6", requirement: "Screen sharing capability for officers", section: "4.4", prdRef: "4.4", priority: "MUST", status: "ui_complete", notes: "Screen share toggle button in call controls" },
      { id: "4.4-7", requirement: "Waiting room with agency branding", section: "4.4", prdRef: "4.4", priority: "SHOULD", status: "ui_complete", notes: "Waiting state shown with agency branding before citizen joins" },
      { id: "4.4-8", requirement: "AI-generated call summary/transcript", section: "4.4", prdRef: "4.4", priority: "SHOULD", status: "not_started", notes: "Requires speech-to-text + AI summarization" },
    ],
  },
  {
    id: "8",
    title: "8 — User Experience & Design",
    items: [
      { id: "8.2-1", requirement: "Agency branding (logo, colours) on all citizen pages", section: "8.2", prdRef: "8.2", priority: "MUST", status: "ui_complete", notes: "Agency primaryColor and name used in header, hero, buttons, footer" },
      { id: "8.2-2", requirement: "Clear header/footer with agency name, privacy, help, contact", section: "8.2", prdRef: "8.2", priority: "MUST", status: "ui_complete", notes: "Shared header + footer components with all links" },
      { id: "8.2-3", requirement: "Multi-step report wizard with visual step progress indicator", section: "8.2", prdRef: "8.2", priority: "MUST", status: "ui_complete", notes: "Progress bar + step pill indicators" },
      { id: "8.2-4", requirement: "Inline real-time validation with plain-language error messages", section: "8.2", prdRef: "8.2", priority: "MUST", status: "ui_complete", notes: "Validation on step navigation with AlertCircle icon" },
      { id: "8.2-5", requirement: "Summary/review screen before final submission", section: "8.2", prdRef: "8.2", priority: "MUST", status: "ui_complete", notes: "Review phase shows all entered data + evidence files" },
      { id: "8.2-6", requirement: "Mobile-responsive layout — no horizontal scrolling", section: "8.2", prdRef: "8.2", priority: "MUST", status: "ui_complete", notes: "Tailwind responsive classes throughout. Mobile-first design" },
      { id: "8.2-7", requirement: "Touch-friendly UI — minimum 44×44px tap targets", section: "8.2", prdRef: "8.2", priority: "MUST", status: "ui_complete", notes: "All buttons use min h-10/h-11/h-12 sizing" },
      { id: "8.2-8", requirement: "Dark mode support", section: "8.2", prdRef: "8.2", priority: "SHOULD", status: "partial", notes: "CSS variables defined for dark mode. Toggle not yet added" },
      { id: "8.2-9", requirement: "Font size adjustment controls", section: "8.2", prdRef: "8.2", priority: "SHOULD", status: "not_started", notes: "Need font size toggle in header" },
      { id: "8.3-1", requirement: "Officer dashboard with sortable, filterable columns", section: "8.3", prdRef: "8.3", priority: "MUST", status: "partial", notes: "Filters work. Column header sort not yet implemented" },
      { id: "8.3-2", requirement: "Report detail with all info, evidence previews, audit timeline", section: "8.3", prdRef: "8.3", priority: "MUST", status: "ui_complete", notes: "Tabs: Details, Evidence, Audit Log + sidebar with reporter info, notes, status history" },
      { id: "8.3-3", requirement: "One-click action buttons for Approve, Reject, Request Info, Transfer", section: "8.3", prdRef: "8.3", priority: "MUST", status: "ui_complete", notes: "Action button bar on report detail header" },
      { id: "8.3-4", requirement: "In-line note-taking linked to reports", section: "8.3", prdRef: "8.3", priority: "MUST", status: "ui_complete", notes: "Notes panel in report detail sidebar" },
      { id: "8.3-5", requirement: "Email template editor with variable insertion", section: "8.3", prdRef: "8.3", priority: "MUST", status: "ui_complete", notes: "/admin/templates with {{variable}} syntax" },
      { id: "8.3-6", requirement: "Keyboard shortcut support for power users", section: "8.3", prdRef: "8.3", priority: "SHOULD", status: "not_started", notes: "Need keyboard event listeners for common actions" },
    ],
  },
  {
    id: "6",
    title: "6 — Technical Requirements",
    items: [
      { id: "6.1.2-1", requirement: "Multi-tenant with complete data isolation at DB level", section: "6.1.2", prdRef: "6.1.2", priority: "MUST", status: "needs_backend", notes: "agencyId on all models. Needs DB-level RLS or separate schemas" },
      { id: "6.1.2-2", requirement: "New agencies onboarded without downtime or code deploys", section: "6.1.2", prdRef: "6.1.2", priority: "MUST", status: "partial", notes: "Agency config is data-driven. Needs admin UI for agency creation" },
      { id: "6.1.3-1", requirement: "Browser support: Chrome, Edge, Firefox, Safari on all platforms", section: "6.1.3", prdRef: "6.1.3", priority: "MUST", status: "ui_complete", notes: "Standard web stack. No browser-specific APIs used" },
      { id: "6.1.3-2", requirement: "iOS 16+ Safari/Chrome, Android 12+ Chrome support", section: "6.1.3", prdRef: "6.1.3", priority: "MUST", status: "ui_complete", notes: "Responsive mobile-first design" },
      { id: "6.2.2-1", requirement: "RMS integration — push approved reports with retry logic", section: "6.2.2", prdRef: "6.2.2", priority: "MUST", status: "out_of_scope", notes: "Backend integration requirement" },
      { id: "6.2.3-1", requirement: "DEMS integration — auto-upload recordings and evidence", section: "6.2.3", prdRef: "6.2.3", priority: "MUST", status: "out_of_scope", notes: "Backend integration requirement" },
      { id: "6.3-1", requirement: "RESTful API with OpenAPI 3.0 docs, OAuth 2.0, rate limiting", section: "6.3", prdRef: "6.3", priority: "MUST", status: "out_of_scope", notes: "Backend API design requirement" },
    ],
  },
  {
    id: "7",
    title: "7 — Security Requirements",
    items: [
      { id: "7.2-1", requirement: "All data stored exclusively in Canada", section: "7.2", prdRef: "7.2", priority: "MUST", status: "out_of_scope", notes: "Infrastructure/hosting decision" },
      { id: "7.3-1", requirement: "Citizen auth: passwordless or password-based with email verification", section: "7.3", prdRef: "7.3", priority: "MUST", status: "not_started", notes: "Need auth system (NextAuth/Auth.js)" },
      { id: "7.3-2", requirement: "Officer/Admin auth: AD integration via SAML 2.0 / OAuth 2.0 OIDC", section: "7.3", prdRef: "7.3", priority: "MUST", status: "not_started", notes: "Need SSO provider configuration" },
      { id: "7.3-3", requirement: "MFA required for all officer and admin accounts", section: "7.3", prdRef: "7.3", priority: "MUST", status: "partial", notes: "MFA toggle in user management UI. Implementation needed" },
      { id: "7.3-4", requirement: "RBAC enforced at API level, not just UI", section: "7.3", prdRef: "7.3", priority: "MUST", status: "out_of_scope", notes: "Backend middleware requirement" },
      { id: "7.3-5", requirement: "Session timeout configurable per agency", section: "7.3", prdRef: "7.3", priority: "MUST", status: "not_started", notes: "Needs session management" },
      { id: "7.4-1", requirement: "TLS 1.2+ in transit, AES-256 at rest", section: "7.4", prdRef: "7.4", priority: "MUST", status: "out_of_scope", notes: "Infrastructure requirement" },
      { id: "7.5-1", requirement: "Tamper-evident audit log with user, action, timestamp, IP, session", section: "7.5", prdRef: "7.5", priority: "MUST", status: "partial", notes: "Audit log UI complete. Backend needs immutable log storage" },
      { id: "7.6-1", requirement: "Report data purged after confirmed RMS ingestion", section: "7.6", prdRef: "7.6", priority: "MUST", status: "out_of_scope", notes: "Backend data lifecycle management" },
    ],
  },
  {
    id: "5",
    title: "5 — Performance Requirements",
    items: [
      { id: "5-1", requirement: "99.9% uptime excluding scheduled maintenance", section: "5", prdRef: "5", priority: "MUST", status: "out_of_scope", notes: "Infrastructure SLA" },
      { id: "5-2", requirement: "Page load time ≤ 2 seconds (P95)", section: "5", prdRef: "5", priority: "MUST", status: "ui_complete", notes: "Next.js SSR + code splitting. Build output shows good bundle sizes" },
      { id: "5-3", requirement: "Video call latency ≤ 150ms end-to-end", section: "5", prdRef: "5", priority: "MUST", status: "out_of_scope", notes: "WebRTC infrastructure requirement" },
      { id: "5-4", requirement: "File upload up to 100 MB per report with progress and resumable", section: "5", prdRef: "5", priority: "MUST", status: "needs_backend", notes: "UI supports file selection. Needs chunked upload backend" },
      { id: "5-5", requirement: "500 concurrent users without degradation, scalable to 2,000+", section: "5", prdRef: "5", priority: "MUST", status: "out_of_scope", notes: "Load testing and infrastructure scaling" },
    ],
  },
];
