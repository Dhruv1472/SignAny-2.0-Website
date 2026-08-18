export interface FeatureCapability {
  title: string;
  desc: string;
}

export interface FeatureStep {
  stepNumber: number;
  title: string;
  desc: string;
}

export interface FeatureDetail {
  id: string;
  title: string;
  tagline: string;
  tag: string;
  icon: string;
  desc: string;
  overview: string;
  capabilities: FeatureCapability[];
  howItWorks: FeatureStep[];
  specs: { label: string; value: string }[];
  businessImpact: string;
}

export const signanyFeatures: FeatureDetail[] = [
  {
    id: "document-setup",
    title: "Document Setup & 10 Precision Smart Fields",
    tagline: "Upload multiple files, configure up to 5 signers, and place smart fields with custom rules",
    tag: "Document Setup",
    icon: "FileUp",
    desc: "Upload multiple files, reorder documents, assign up to 5 unique signers, import contacts from Salesforce, and drag-and-drop 10 precision smart field types.",
    overview: "SignAny 2.0 provides a comprehensive document setup workspace. Upload multiple files into a single envelope, re-arrange reading order, import signer records from Salesforce, and place 10 precision field types with custom aspect ratios, validation rules, required toggles, and typography settings.",
    capabilities: [
      {
        title: "Multi-File Upload & Reordering",
        desc: "Upload multiple document files into one envelope, rename documents, and drag-and-drop to arrange reading order.",
      },
      {
        title: "Up to 5 Unique Signers & Salesforce Import",
        desc: "Add up to 5 signers per document. Import recipient Name and Email directly from Salesforce objects and records.",
      },
      {
        title: "10 Precision Smart Field Types",
        desc: "Signature (with 1:1, 4:1, 8:5, 16:9 aspect ratios), Text, Date ('Today' default, past/future date rules), Number (currency, decimals), Email (force lowercase), Checkbox, Initials, Fullname, Radio group, and Dropdown (multi-select & custom text).",
      },
      {
        title: "Field Editing, Copying & Drag-and-Drop",
        desc: "Move fields anywhere on the document canvas, edit properties on double-click, copy fields with all validation settings, and paste across pages.",
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: "Upload & Reorder Files",
        desc: "Click 'New' to upload multiple files, rename document titles, and drag files into the required page sequence.",
      },
      {
        stepNumber: 2,
        title: "Add Signers or Import Salesforce Records",
        desc: "Add up to 5 signer emails & names, or select a Salesforce object to auto-fill recipient details.",
      },
      {
        stepNumber: 3,
        title: "Place & Configure Smart Fields",
        desc: "Drag fields onto the document. Double-click to set required rules, max lengths, default values, aspect ratios, and font formatting.",
      },
      {
        stepNumber: 4,
        title: "Send, Schedule, or Save Draft",
        desc: "Save as draft, dispatch immediately for signature, or set a future schedule date and time.",
      },
    ],
    specs: [
      { label: "Max Signers per Doc", value: "Up to 5 unique signers" },
      { label: "Smart Field Types", value: "10 core field types" },
      { label: "Signature Aspect Ratios", value: "1:1, 4:1, 8:5, 16:9" },
      { label: "Salesforce CRM Import", value: "Supported object & field mapping" },
    ],
    businessImpact: "Accelerates document preparation while guaranteeing zero missing initial boxes or incomplete fields.",
  },
  {
    id: "all-documents",
    title: "All Documents Workspace & Management",
    tagline: "Centralized document tracking, quick action management, CSV export, and signer resending",
    tag: "Workspace & Management",
    icon: "Table2",
    desc: "Search by Doc ID or email, filter by status, export CSV reports, update signer expiry up to 90 days, and resend links via SMS or WhatsApp.",
    overview: "The All Documents workspace centralizes your document pipeline. Perform 9 quick actions (View Details, Preview, Download, Manage Access, Transfer Ownership, Update Expiry up to 90 days, Send Now, Reschedule, Delete), deactivate documents at any time, search by Doc ID, and export filtered data to CSV.",
    capabilities: [
      {
        title: "9 Quick Action Controls",
        desc: "View Details, Preview, Download executed PDFs, Manage Access permissions, Transfer Ownership, Update Expiry up to 90 days, Send Now, Reschedule, and Delete.",
      },
      {
        title: "Active / Deactivate Toggle Switch",
        desc: "Instantly deactivate active documents to pause signer access or stop document execution at any time.",
      },
      {
        title: "Doc ID, Name & Email Search",
        desc: "Search documents instantaneously by Doc ID, Document Name, Sender Name, or Sender Email address.",
      },
      {
        title: "Signer Management & On-Site Link Copy",
        desc: "Resend email notifications, change signer email/name, or copy the direct signature URL to dispatch via SMS or WhatsApp for on-site signature.",
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: "Filter & Search Data Table",
        desc: "Filter documents by Status, Email Types, and Created Date or search by Doc ID and Sender Email.",
      },
      {
        stepNumber: 2,
        title: "Execute Quick Actions",
        desc: "Use the quick action list to preview signer fields, transfer ownership, or adjust expiry dates up to 90 days.",
      },
      {
        stepNumber: 3,
        title: "Manage Signer Details & Resend",
        desc: "Open Document Details to update signer names/emails or copy signature links for SMS/WhatsApp delivery.",
      },
      {
        stepNumber: 4,
        title: "Export Filtered CSV",
        desc: "Export complete document logs and metrics directly into CSV format for external reporting.",
      },
    ],
    specs: [
      { label: "Quick Actions Available", value: "9 management actions" },
      { label: "Expiry Adjustment", value: "Up to 90 days from send date" },
      { label: "Search Criteria", value: "Doc ID, Name, Sender, Email" },
      { label: "Delivery Channels", value: "Email link" },
    ],
    businessImpact: "Provides complete operational control over pending and completed documents with flexible delivery channels.",
  },
  {
    id: "dashboard-analytics",
    title: "Dashboard Metrics & Analytics",
    tagline: "Live document status overview, plan credit metrics, expiring soon alerts, and completion trends",
    tag: "Dashboard Metrics",
    icon: "LayoutDashboard",
    desc: "Document status charts, remaining vs. used credit tracking, 7-day expiration alerts, monthly sending trends, and average completion duration.",
    overview: "The Dashboard provides executive visibility into your organization's document performance. Track pending vs. completed template metrics, monitor plan credit consumption, catch documents expiring today or in the next 7 days, and analyze department-wise sending trends.",
    capabilities: [
      {
        title: "Document Status & Template Metrics",
        desc: "Visualize template status breakdowns (Pending, Completed, Draft, Voided) with date filter controls.",
      },
      {
        title: "Plan & Credit Usage Chart",
        desc: "Track remaining credits vs. used credits in real-time to manage plan capacity.",
      },
      {
        title: "Documents Expiring Soon Alert Table",
        desc: "Highlight documents expiring today or in the next 7 days for immediate follow-up prior to deal stall.",
      },
      {
        title: "Sending Trends & Completion Durations",
        desc: "Analyze month-wise sending volume, department-wise distribution, and average completion duration metrics.",
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: "Review Status Overview",
        desc: "Check real-time document counts across pending, completed, and draft states.",
      },
      {
        stepNumber: 2,
        title: "Monitor Expiring Soon Table",
        desc: "Identify agreements expiring within 7 days and trigger instant resend or reminder actions.",
      },
      {
        stepNumber: 3,
        title: "Analyze Completion Bottlenecks",
        desc: "Review average completion days to optimize team follow-up schedules.",
      },
      {
        stepNumber: 4,
        title: "Track Tokens & Plan Credits",
        desc: "Check credit consumption and manage active email & CRM integrations.",
      },
    ],
    specs: [
      { label: "Expiring Soon Window", value: "Today & next 7 days" },
      { label: "Metric Visualizations", value: "Status, Credits, Trends, Departments" },
      { label: "Turnaround Tracking", value: "Average completion days" },
      { label: "Data Filtering", value: "Date & department filters" },
    ],
    businessImpact: "Gives leadership real-time visibility to eliminate deal bottlenecks before documents expire.",
  },
  {
    id: "admin-panel",
    title: "Admin Panel & Workspace Settings",
    tagline: "Configurable governance rules, UAE Pass integration, expiry types, and custom reminder schedules",
    tag: "Admin & Settings",
    icon: "Settings",
    desc: "Configure general settings, UAE Pass authentication, attached or separate audit PDF behavior, 1-90 day One-Time or Recurring expiry, and custom reminder schedules.",
    overview: "The Admin Panel empowers administrators to enforce company-wide governance. Set default document behavior (send audit report on every signature, default simultaneous sending, UAE Pass digital signature requirement), choose attached vs. separate Audit PDF creation, and configure One-Time vs. Recurring expiry up to 90 days.",
    capabilities: [
      {
        title: "General Governance Settings",
        desc: "Enable/disable post-signing update emails, audit reports on every signature, default simultaneous sending, and activity logging.",
      },
      {
        title: "UAE Pass Authentication & Digital Signatures",
        desc: "Enable UAE Pass authentication and digital signatures by default to produce valid UAE government-compliant legal documents.",
      },
      {
        title: "Attached vs. Separate Audit PDF Behavior",
        desc: "Choose between attaching the audit report directly to the completed document PDF or generating a separate audit PDF file.",
      },
      {
        title: "Expiration & Flexible Reminder Schedules",
        desc: "Set One-Time or Recurring expiry (1 to 90 days) and reminder types (Once, Recurring interval days, Custom 2nd/5th/15th day, or Day of week e.g. Mon/Fri).",
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: "Configure General Settings",
        desc: "Enable email triggers, UAE Pass compliance defaults, and audit report behavior (Attached vs. Separate PDF).",
      },
      {
        stepNumber: 2,
        title: "Set Expiration Rules",
        desc: "Choose static One-Time or dynamic Recurring expiry (resetting expiration after each signer) between 1 and 90 days.",
      },
      {
        stepNumber: 3,
        title: "Set Reminder Frequencies",
        desc: "Choose reminder types: Once, Recurring, Custom (e.g. Day 2, Day 5, Day 15), or Specific Days (Monday/Friday).",
      },
      {
        stepNumber: 4,
        title: "Field Defaults & Branding",
        desc: "Set font defaults, signature box aspect ratios (1:1, 4:1, 8:5, 16:9), and custom terms & conditions policies.",
      },
    ],
    specs: [
      { label: "Expiry Types", value: "One-Time & Recurring (1-90 days)" },
      { label: "Reminder Options", value: "Once, Recurring, Custom, Mon/Fri" },
      { label: "Audit PDF Delivery", value: "Attached or Separate PDF file" },
      { label: "UAE Compliance", value: "UAE Pass Auth & Digital Signature" },
    ],
    businessImpact: "Ensures uniform legal compliance, automated reminder cadence, and strict workspace governance.",
  },
  {
    id: "sign-page",
    title: "Responsive Sign Page & Signature Pad",
    tagline: "Seamless review & signing with Draw, Type, and Image Upload pad options plus auto-scroll field navigation",
    tag: "Sign Page",
    icon: "TabletSmartphone",
    desc: "Signers review documents, use Signature Pad with Draw (pen size/erase/undo), Type (custom fonts), or Upload (JPG/PNG up to 2MB), auto-fill empty fields, and use Next Field navigation.",
    overview: "The Sign Page delivers an effortless signing experience on any mobile phone, tablet, or desktop browser. Signers review the agreement, access a 3-mode Signature Pad (Draw with pen size & undo/redo, Type with font styles, or Upload PNG/JPG up to 2MB), replace signatures across all boxes, auto-fill empty signature fields, and navigate with Next Field auto-scroll.",
    capabilities: [
      {
        title: "3-Mode Signature Pad",
        desc: "Draw (pen size control, erase, undo/redo), Type (type name with multiple font styles), or Upload (JPG/PNG signature images up to 2MB).",
      },
      {
        title: "Auto-Fill Empty Signature Fields",
        desc: "Automatically populate all empty signature boxes across multi-page agreements in a single click.",
      },
      {
        title: "Next Field Auto-Scroll Navigation",
        desc: "Click 'Next Field' to automatically scroll the document page to the next required signature or text box.",
      },
      {
        title: "Action Controls & Progress Saving",
        desc: "Save signing progress, download preview PDF, reset fields, request help, or void the document.",
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: "Open Document Link",
        desc: "Signer opens the invitation link in any mobile or desktop browser without account creation.",
      },
      {
        stepNumber: 2,
        title: "Open Signature Pad",
        desc: "Click signature box to open Signature Pad: Draw with pen size, Type name with font styling, or Upload image file.",
      },
      {
        stepNumber: 3,
        title: "Next Field Auto-Navigation",
        desc: "Click 'Next Field' to automatically jump to remaining required signature or input boxes.",
      },
      {
        stepNumber: 4,
        title: "Complete & Download PDF",
        desc: "Submit completed document; instantly receive executed PDF copy and optional audit report.",
      },
    ],
    specs: [
      { label: "Signature Modes", value: "Draw, Type, Upload (JPG/PNG)" },
      { label: "Max Image Upload", value: "Up to 2 MB" },
      { label: "Navigation Tools", value: "Next Field Auto-Scroll, Zoom In/Out" },
      { label: "Signer Actions", value: "Save Progress, Download, Reset, Void" },
    ],
    businessImpact: "Guarantees a friction-free signing experience on mobile and desktop, reducing drop-off rates.",
  },
  {
    id: "integrations-connectors",
    title: "Email & CRM Connectors",
    tagline: "Integrate with Gmail, Outlook, Zoho Mail, and native Salesforce CRM Package",
    tag: "Integrations & CRM",
    icon: "Share2",
    desc: "Connect Gmail, Outlook, and Zoho Mail for custom Send From email dispatch, and use native Salesforce CRM integration for object & record data import.",
    overview: "Connect SignAny 2.0 directly to your communication and CRM infrastructure. Send signing emails from your integrated Gmail, Outlook, or Zoho Mail accounts, and leverage the native Salesforce CRM Package Connector to map Salesforce object fields and auto-fill recipient data.",
    capabilities: [
      {
        title: "Integrated Mail Provider Support",
        desc: "Connect Gmail, Outlook, or Zoho Mail to send document emails from your company's custom email addresses.",
      },
      {
        title: "Custom 'Send From' Email Selection",
        desc: "Select which integrated email address dispatches signing invitations (defaults to info@esignany.com if unconfigured).",
      },
      {
        title: "Native Salesforce CRM Package Connector",
        desc: "Install the native Salesforce package to trigger signing processes directly inside Salesforce Accounts & Opportunities.",
      },
      {
        title: "Salesforce Object & Field Mapping",
        desc: "Select Salesforce objects, map Name & Email fields, select records, and auto-fill signer details in SignAny 2.0.",
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: "Connect Mail Accounts",
        desc: "Authenticate Gmail, Outlook, or Zoho Mail accounts in Admin Integration settings.",
      },
      {
        stepNumber: 2,
        title: "Select 'Send From' Address",
        desc: "Choose the default sending address for outbound contract notifications.",
      },
      {
        stepNumber: 3,
        title: "Import from Salesforce",
        desc: "Click 'Import From Salesforce' during setup, choose object (e.g. Contact/Lead), and map Name/Email fields.",
      },
      {
        stepNumber: 4,
        title: "Auto-Fill Signer Records",
        desc: "Select the Salesforce record to auto-populate all recipient fields instantly.",
      },
    ],
    specs: [
      { label: "Mail Integrations", value: "Gmail, Outlook, Zoho Mail" },
      { label: "CRM Connector", value: "Native Salesforce Package" },
      { label: "Field Mapping", value: "Salesforce Object Name & Email fields" },
      { label: "Default Fallback Mail", value: "info@esignany.com" },
    ],
    businessImpact: "Eliminates duplicate manual data entry and sends branded invitations from trusted corporate mail accounts.",
  },
  {
    id: "audit-report",
    title: "Audit Report & Activity Tracking",
    tagline: "Capture IP addresses, location metadata, and UTC activity timestamps for complete legal proof",
    tag: "Audit & Activity",
    icon: "ShieldCheck",
    desc: "Track IP addresses, location metadata, and exact UTC timestamps for sending, opening, signing, voiding, and completing documents.",
    overview: "Every document transaction in SignAny 2.0 is captured in a detailed Audit Report & Activity Log. The system tracks recipient IP addresses, geographical location data, user-agent details, and UTC timestamps for every email dispatch, view, signature capture, void, and completion event.",
    capabilities: [
      {
        title: "Signer IP & Location Tracking",
        desc: "Record verified IP addresses and geographic location metadata at the exact moment of signature capture.",
      },
      {
        title: "Full Document Activity Log",
        desc: "Detailed event history tracking document creation, email dispatch, email opens, signature captures, voiding, and completion.",
      },
      {
        title: "Signer Details Table",
        desc: "Track signer states, resend notifications, update recipient information, or copy signature links for on-site signature.",
      },
      {
        title: "Configurable PDF Delivery",
        desc: "Deliver the audit report as an attached page within the main document PDF or as a separate dedicated PDF file.",
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: "Real-Time Event Capture",
        desc: "SignAny logs every view, click, and signature event with UTC timestamps.",
      },
      {
        stepNumber: 2,
        title: "IP & Location Logging",
        desc: "Captures verified IP address and device metadata during the signature session.",
      },
      {
        stepNumber: 3,
        title: "Audit Report Generation",
        desc: "Compiles complete activity history into a court-admissible audit certificate.",
      },
      {
        stepNumber: 4,
        title: "Attached or Separate PDF Dispatch",
        desc: "Dispatches audit report according to workspace settings (Attached or Separate PDF).",
      },
    ],
    specs: [
      { label: "Captured Metadata", value: "IP Address, Location, UTC Timestamp" },
      { label: "Tracked Lifecycle Events", value: "Send, Open, Sign, Void, Complete" },
      { label: "PDF Format Options", value: "Attached to Doc PDF or Separate PDF" },
      { label: "Compliance Status", value: "Court-Admissible Legal Proof" },
    ],
    businessImpact: "Provides indisputable legal proof of intent and timestamped activity logs for compliance audits.",
  },
];
