export const SITE = {
  name: "SignAny 2.0",
  company: "MVClouds",
  email: "info@esignany.com",
  appLink: "https://app.esignany.com",
  linkedin: "https://www.linkedin.com/showcase/esignany2-0/about/",
  instagram: "https://www.instagram.com/esignany2.0/",
  salesforcePackageLink: "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tdL000000SLsj" // SignAny2.0 - 1.1 (Released)"
};

export type Feature = {
  title: string;
  desc: string;
  icon: string;
  tag?: string;
};

/* ---------------- SignAny 2.0 (new web app) ---------------- */

export const heroStats = [
  { value: "15+", label: "Global compliance frameworks & acts" },
  { value: "5", label: "Signers per document with smart routing" },
  { value: "90 days", label: "Configurable expiry & auto reminders" },
  { value: "REST API", label: "Plug into any CRM, ERP or portal" },
];

export const keyFeatures: Feature[] = [
  {
    icon: "FileUp",
    tag: "Bulk import",
    title: "Multi-document upload & reorder",
    desc: "Upload several PDFs or Word files in a single envelope, rename them, and drag them into the exact order your signers should read.",
  },
  {
    icon: "UserPlus",
    tag: "Team routing",
    title: "Up to 5 signers per document",
    desc: "Add signer names and email addresses, then place signature boxes and fields for each recipient with per-signer colour coding.",
  },
  {
    icon: "GitMerge",
    tag: "Flexible flow",
    title: "Sequential or simultaneous signing",
    desc: "Send in a strict order or release the document to everyone at once — switch the flow per document or set a workspace default.",
  },
  {
    icon: "MousePointerClick",
    tag: "Precision fields",
    title: "Smart field configuration",
    desc: "Signature, text, date, checkbox, dropdown and read-only fields with max length, default values, required rules and font formatting.",
  },
  {
    icon: "CalendarClock",
    tag: "Never chase",
    title: "Scheduling, expiry & reminders",
    desc: "Schedule a send for later, set one-time or recurring expiry up to 90 days, and let automated reminders keep signers moving.",
  },
  {
    icon: "TabletSmartphone",
    tag: "On-the-go",
    title: "Mobile-first signing",
    desc: "Signers open a secure link and complete the document on any phone, tablet or desktop browser — no account, no app download.",
  },
];

export const workspaceFeatures: Feature[] = [
  {
    icon: "LayoutDashboard",
    title: "Live dashboard & metrics",
    desc: "Document status overview, average completion days, monthly sending trend, department-wise distribution and plan usage in one view.",
  },
  {
    icon: "Table2",
    title: "All Documents workspace",
    desc: "Search by Doc ID, name, sender or email, filter by status and date, and export every record straight to CSV.",
  },
  {
    icon: "Activity",
    title: "Full audit trail",
    desc: "Signer-level status, timestamps and a complete document activity log, with an audit report attached on completion.",
  },
  {
    icon: "Bell",
    title: "Expiring soon alerts",
    desc: "See everything expiring today or in the next 7 days so follow-ups happen before a deal stalls.",
  },
  {
    icon: "Share2",
    title: "Access & ownership control",
    desc: "Share documents with people or teams as Editor or Viewer, transfer ownership, and revoke access at any time.",
  },
  {
    icon: "MailCheck",
    title: "Branded email templates",
    desc: "Customise signing, status update, reminder, completed and void emails, plus your own terms and consent text for signers.",
  },
];

export const permissionSets = [
  {
    name: "Admin",
    icon: "ShieldCheck",
    summary:
      "Full control of the workspace — configuration, integrations, users and every document.",
    points: [
      "Configure document, field and signature-pad defaults for the whole workspace",
      "Manage integrations: Gmail, Outlook, Zoho Mail and the Salesforce CRM connector",
      "Invite, activate and deactivate members and reassign document ownership",
      "Edit email templates, terms & conditions and consent requirements",
      "Enable UAE PASS authentication by default and enforce compliance settings",
      "View organisation-wide dashboards, usage, credits and audit reports",
    ],
  },
  {
    name: "Member",
    icon: "UserCircle2",
    summary:
      "Everything needed to prepare, send and track documents — without workspace-level settings.",
    points: [
      "Upload, prepare and send documents to up to 5 signers",
      "Place fields, set expiry, reminders and schedule sends",
      "Track their own documents, resend, update signers and download completed files",
      "Share documents with people or teams as Editor or Viewer",
      "View personal dashboard metrics and remaining credits",
      "Cannot change workspace settings, integrations or member permissions",
    ],
  },
];

export const apiCapabilities = [
  {
    icon: "Code2",
    title: "REST API for any system",
    desc: "Create envelopes, add signers, place fields, send and download completed documents programmatically from your own product.",
  },
  {
    icon: "Plug",
    title: "CRM & portal ready",
    desc: "Use SignAny 2.0 inside Salesforce, your customer portal, HR system or any in-house app — no rip-and-replace required.",
  },
  {
    icon: "Webhook",
    title: "Status callbacks",
    desc: "Receive document and signer status updates so your records stay in sync without polling.",
  },
  {
    icon: "KeyRound",
    title: "Secure token access",
    desc: "Scoped API credentials issued and revoked by workspace admins, with every call written to the audit trail.",
  },
];

export const integrations = [
  { name: "Salesforce", type: "CRM connector" },
  { name: "Gmail", type: "Send-from email" },
  { name: "Outlook", type: "Send-from email" },
  { name: "Zoho Mail", type: "Send-from email" },
  { name: "REST API", type: "Custom integration" },
  { name: "UAE PASS", type: "Identity (coming soon)" },
];

export const compliances = [
  { name: "ESIGN Act", country: "USA" },
  { name: "UETA", country: "USA" },
  { name: "eIDAS (up to AES Level 2)", country: "Europe" },
  { name: "GDPR", country: "Europe, UK" },
  { name: "GLBA", country: "US, Europe, UK" },
  { name: "UK ECA 2000", country: "United Kingdom" },
  { name: "ETA", country: "Singapore" },
  { name: "PDPA", country: "Singapore" },
  { name: "ETA 1999", country: "Australia" },
  { name: "HIPAA", country: "USA" },
  { name: "21 CFR Part 11", country: "USA" },
  { name: "PIPEDA", country: "Canada" },
  { name: "Canada Evidence Act", country: "Canada" },
  { name: "UECA", country: "Canada" },
  { name: "Federal Decree Law No. 46 of 2021", country: "UAE" },
  { name: "UAE PDPL", country: "UAE" },
  { name: "CCPA", country: "USA" },
  { name: "KSA PDPL", country: "Saudi Arabia" },
  { name: "Swiss revFADP", country: "Switzerland" },
];

export const salesforceCompliances = [
  { name: "ESIGN Act", country: "USA" },
  { name: "UETA", country: "USA" },
  { name: "GLBA", country: "USA, Europe, UK" },
  { name: "eIDAS (AES) (Level 2)", country: "Europe" },
  { name: "Singapore’s ETA(Electronic Transition Act)", country: "Singapore" },
  { name: "AU Electronic Transactions Act 1999", country: "Australia" },
  { name: "Electronic Communications Act 2000 (UK)", country: "United Kingdom" },
];


export const uaePass = {
  name: "UAE PASS",
  country: "UAE",
  status: "Coming soon — approval in progress",
  desc: "UAE PASS signer authentication is built into SignAny 2.0 and is currently going through the official approval process. We will confirm availability as soon as we receive sign-off from the UAE PASS team.",
};

export const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    tagline: "For individuals getting started with eSignatures.",
    cta: "SignUp",
    featured: false,
    features: [
      "5 documents per month",
      "Invite additional users to your workspace",
      "Up to 5 signers per document",
      "Sequential or simultaneous signing",
      "Mobile signing & audit trail",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "$35",
    period: "per month",
    tagline: "For growing teams that send documents every week.",
    cta: "SignUp",
    featured: true,
    features: [
      "100 documents per month",
      "Add up to 4 additional users in the workspace",
      "Admin & Member permission sets",
      "Email integrations: Gmail, Outlook, Zoho Mail",
      "Scheduling, recurring expiry & reminders",
      "Custom email templates & terms",
      "Dashboard analytics and CSV export",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored to you",
    tagline: "Built around your volume, users and compliance needs.",
    cta: "Talk to sales",
    featured: false,
    features: [
      "Customised document volume and user count",
      "Salesforce CRM connector & REST API access",
      "UAE PASS authentication (coming soon)",
      "Advanced compliance configuration",
      "Custom branding and email templates",
      "Dedicated onboarding and support",
    ],
  },
];

export const faqs = [
  {
    q: "What is SignAny 2.0?",
    a: "SignAny 2.0 is a next-generation electronic signature platform for sending, signing and managing legally binding documents. It combines document preparation, smart fields, multi-signer routing, real-time tracking and global compliance in a single secure workspace.",
  },
  {
    q: "How many documents can I send on the Free plan?",
    a: "The Free plan includes 5 documents per month and lets you invite additional users into your workspace, so a small team can try the full signing workflow at no cost.",
  },
  {
    q: "What is included in the Pro plan?",
    a: "Pro costs $35 USD per month and includes 100 documents per month, up to 4 additional users in the workspace, email integrations, scheduling, reminders, custom email templates and dashboard analytics.",
  },
  {
    q: "Which permission sets are available?",
    a: "SignAny 2.0 ships with two permission sets. Admins control workspace settings, integrations, members, email templates and compliance defaults. Members can prepare, send, share and track documents but cannot change workspace-level configuration.",
  },
  {
    q: "Does SignAny 2.0 offer an API?",
    a: "Yes. Our REST API lets you embed SignAny 2.0 signing directly into any CRM, ERP, customer portal or in-house application, with secure token access and status callbacks so your records stay in sync.",
  },
  {
    q: "Is SignAny 2.0 available inside Salesforce?",
    a: "Yes. We offer a native Salesforce package for users who want to send and track documents from within their Salesforce org. Use the 'Native Salesforce App' toggle in the header to view details of that edition.",
  },
  {
    q: "Are signatures created with SignAny 2.0 legally binding?",
    a: "Yes. Documents signed with SignAny 2.0 meet the requirements of the ESIGN Act and UETA in the United States, eIDAS up to AES Level 2 in the European Union, the UK Electronic Communications Act 2000, Singapore's Electronic Transactions Act, Australia's ETA 1999, Canada's UECA and UAE Federal Decree Law No. 46 of 2021, among others.",
  },
  {
    q: "Is UAE PASS supported?",
    a: "UAE PASS signer authentication is built into the product and is currently under approval. We will confirm general availability as soon as the UAE PASS team completes their review.",
  },
  {
    q: "How is my data protected?",
    a: "Documents are encrypted in transit and at rest, stored in secure data centres with strict access controls, and every action is written to a tamper-evident audit trail attached to the completed document.",
  },
  {
    q: "Can I cancel or change my plan at any time?",
    a: "Yes. You can upgrade, downgrade or cancel from your account settings at any time and keep access until the end of the current billing period.",
  },
];

/* ---------------- Native Salesforce App (existing edition) ---------------- */

export const salesforce = {
  badge: "Native Salesforce App",
  title: "SignAny inside your Salesforce org",
  subtitle:
    "The managed package edition of SignAny for native Salesforce users. Send documents from any record, keep signed files on the object they belong to, and never leave your org.",
  note: "This edition is a focused, native Salesforce package with a limited function set compared with the full SignAny 2.0 web application.",
  features: [
    {
      icon: "Cloud",
      title: "Installed as a managed package",
      desc: "Install directly into your Salesforce org and assign the SignAny permission set to your users in minutes.",
    },
    {
      icon: "FileSignature",
      title: "Send from any record",
      desc: "Trigger a signature request from Opportunity, Contract, Account, Case or any custom object using a simple action button.",
    },
    {
      icon: "Users",
      title: "Multi-signer workflow",
      desc: "Add multiple signers, choose sequential or simultaneous signing, and place signature and text fields before sending.",
    },
    {
      icon: "Database",
      title: "Signed files stored in Salesforce",
      desc: "The completed document and its audit certificate are attached back to the originating record automatically.",
    },
    {
      icon: "PenTool",
      title: "Signature pad",
      desc: "Signers can draw or type their signature with live preview, on desktop or mobile.",
    },
    {
      icon: "ShieldCheck",
      title: "Compliant by design",
      desc: "ESIGN Act, UETA, eIDAS (AES Level 2), UK ECA 2000, Singapore ETA and AU ETA 1999 aligned.",
    },
  ],
  limits: [
    "Focused feature set built for the Salesforce experience",
    "Workspace dashboards, department analytics and CSV export live in SignAny 2.0",
    "Email integrations, scheduling and recurring expiry live in SignAny 2.0",
    "REST API and non-Salesforce portals are covered by SignAny 2.0",
  ],
  steps: [
    { title: "Install the package", desc: "Add the SignAny managed package to your sandbox or production org." },
    { title: "Complete Prerequisites", desc: "Configure your Connected App and initial org settings." },
    { title: "Add the action", desc: "Drop the Send for Signature action onto the objects your team works from." },
    { title: "Send and track", desc: "Send, monitor signer status and receive the signed file back on the record." },
  ],
};
