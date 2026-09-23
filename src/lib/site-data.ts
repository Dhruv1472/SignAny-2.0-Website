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
    icon: "UserCheck",
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
  { name: "ESIGN Act", country: "USA", icon: "FileCheck" },
  { name: "UETA", country: "USA", icon: "Scale" },
  { name: "eIDAS (AES)", country: "Europe", icon: "Globe" },
  { name: "GDPR", country: "Europe, UK", icon: "ShieldCheck" },
  { name: "GLBA", country: "US, Europe, UK", icon: "Lock" },
  { name: "UAE Pass Authentication", country: "UAE", icon: "UserCheck" },
  { name: "UK ECA 2000", country: "UK", icon: "FileText" },
  { name: "ETA", country: "Singapore", icon: "Landmark" },
  { name: "PDPA", country: "Singapore", icon: "Fingerprint" },
  { name: "ETA 1999", country: "Australia", icon: "BookOpen" },
  { name: "HIPAA", country: "USA", icon: "HeartHandshake" },
  { name: "21 CFR Part 11", country: "USA", icon: "FileDigit" },
  { name: "PIPEDA", country: "Canada", icon: "Building" },
  { name: "Canada Evidence Act", country: "Canada", icon: "Gavel" },
  { name: "UECA", country: "Canada", icon: "FileSignature" },
  { name: "Federal Decree Law No. 46 of 2021", country: "UAE", icon: "Briefcase" },
  { name: "UAE PDPL", country: "UAE", icon: "Shield" },
  { name: "CCPA", country: "USA", icon: "KeyRound" },
  { name: "KSA PDPL", country: "Saudi Arabia", icon: "UserCheck" },
  { name: "Swiss revFADP", country: "Switzerland", icon: "BadgeCheck" },
];

export const salesforceCompliances = [
  { name: "ESIGN Act", country: "USA", icon: "FileCheck" },
  { name: "UETA", country: "USA", icon: "Scale" },
  { name: "GLBA", country: "USA, Europe, UK", icon: "Lock" },
  { name: "eIDAS (AES)", country: "Europe", icon: "Globe" },
  { name: "Singapore’s ETA", country: "Singapore", icon: "Landmark" },
  { name: "AU Electronic Transactions Act 1999", country: "Australia", icon: "BookOpen" },
  { name: "Electronic Communications Act 2000", country: "UK", icon: "FileText" },
];

export const plans = [
  {
    name: "Free",
    price: "$0",
    period: "always free",
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

export const blogs = [
  // {
  //   id: "signany-2-0-launch",
  //   slug: "introducing-signany-2-0",
  //   category: "Product Updates",
  //   title: "Introducing SignAny 2.0: A New Era of Secure Digital Signatures",
  //   excerpt: "We're thrilled to announce the launch of SignAny 2.0, featuring a completely redesigned interface, faster signing workflows, and advanced enterprise compliance.",
  //   author: "Alex Rivera",
  //   authorRole: "Head of Product",
  //   date: "March 12, 2026",
  //   readTime: "5 min read",
  //   color: "from-purple-500/20 to-primary/20",
  //   image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
  //   content: [
  //     "Digital signatures have evolved from simple pen-and-ink replacements into critical foundational pillars for global legal and financial operations. Today, we are proud to launch SignAny 2.0 — built from the ground up to give modern enterprises unprecedented speed, trust, and workflow flexibility.",
  //     "### Re-imagined Interface Built for Speed",
  //     "SignAny 2.0 introduces a streamlined 3-step signing process. Whether you are sending a single nondisclosure agreement or routing high-volume multi-party enterprise contracts, smart auto-field detection reduces document preparation time by up to 80%.",
  //     "### Enterprise Security & Global Compliance",
  //     "Every document processed through SignAny 2.0 is encrypted using 256-bit AES at rest and TLS 1.3 in transit. Each completed envelope includes a cryptographic SHA-256 audit certificate with court-admissible audit logs.",
  //     "### UAE PASS & Salesforce Native Integration",
  //     "SignAny 2.0 brings native integration for Salesforce records and regional authentication providers including UAE PASS — allowing signers across Europe, North America, and the Middle East to authenticate with court-admissible identity assurance."
  //   ]
  // },
  // {
  //   id: "glba-eidas-compliance",
  //   slug: "understanding-glba-and-eidas-compliance",
  //   category: "Security",
  //   title: "Understanding GLBA and eIDAS Compliance for Digital Signatures",
  //   excerpt: "Security isn't just a feature; it's our foundation. Learn why GLBA and eIDAS (AES) compliance are critical for protecting your sensitive business data.",
  //   author: "Sarah Chen",
  //   authorRole: "Chief Information Security Officer",
  //   date: "March 8, 2026",
  //   readTime: "8 min read",
  //   color: "from-blue-500/20 to-teal-500/20",
  //   image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  //   content: [
  //     "Navigating international digital transaction compliance requires a deep understanding of electronic identification acts across jurisdictions. In financial services and cross-border commerce, adhering to strict data security frameworks ensures every agreement holds full legal validity.",
  //     "### What is GLBA Compliance?",
  //     "The Gramm-Leach-Bliley Act (GLBA) governs how financial institutions manage private consumer data. SignAny 2.0 enforces strict administrative, technical, and physical safeguards to prevent unauthorized disclosure.",
  //     "### European eIDAS (Advanced Electronic Signature)",
  //     "Under the EU eIDAS regulation, Advanced Electronic Signatures (AES) require unique signer identification, sole signer control, and tamper detection. SignAny 2.0 embedded certificates ensure that any subsequent alteration of signed data is instantly detectable.",
  //     "### Global Court Admissibility Guarantee",
  //     "By combining SHA-256 tamper-evident logs, time-stamping, and multi-factor signer verification, SignAny 2.0 documents meet legal enforceability standards across the US, UK, EU, UAE, Singapore, and Australia."
  //   ]
  // },
  // {
  //   id: "digital-signatures-legal-workflows",
  //   slug: "how-digital-signatures-transform-legal-workflows",
  //   category: "Industry Insights",
  //   title: "How Digital Signatures are Transforming Legal Workflows",
  //   excerpt: "Discover how law firms and legal departments are using SignAny 2.0 to reduce document turnaround times by over 70%.",
  //   author: "Michael Ross",
  //   authorRole: "Legal Tech Consultant",
  //   date: "March 5, 2026",
  //   readTime: "6 min read",
  //   color: "from-orange-500/20 to-red-500/20",
  //   image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
  //   content: [
  //     "In modern legal practice, speed and auditability dictate deal completion. Traditional paper routing creates friction, increases error rates, and adds costly administrative overhead.",
  //     "### Eliminating Document Bottlenecks",
  //     "With sequential and simultaneous signing rules, legal teams can configure complex approval chains. Once Legal approves, the contract automatically routes to the CFO and client signers without manual intervention.",
  //     "### Tamper-Proof Audit Trails",
  //     "SignAny 2.0 generates a complete Audit Trail Certificate with every executed document, recording IP addresses, email verifications, timestamps, and signature hash hashes."
  //   ]
  // },
  // {
  //   id: "remote-onboarding-guide",
  //   slug: "mastering-remote-onboarding-with-signany",
  //   category: "Guide",
  //   title: "Mastering the Art of Remote Onboarding with SignAny 2.0",
  //   excerpt: "Step-by-step guide on how to integrate digital signatures into your remote hiring process for a seamless employee experience.",
  //   author: "Emily Watson",
  //   authorRole: "Head of People & Operations",
  //   date: "March 1, 2026",
  //   readTime: "4 min read",
  //   color: "from-cyan-500/20 to-primary/20",
  //   image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
  //   content: [
  //     "Hiring global talent requires a fast, friction-free onboarding process. High drop-off rates often occur during the paperwork stage when candidates face cumbersome signing steps.",
  //     "### Automated HR Document Envelopes",
  //     "Combine offer letters, NDAs, direct deposit authorizations, and equipment agreements into a single unified onboarding package. Candidates sign all required fields on mobile in under 2 minutes.",
  //     "### Seamless HRIS Integration",
  //     "Automatically push signed employee documents back into your HR management system or cloud repository upon completion."
  //   ]
  // },
  // {
  //   id: "scaling-globally-techflow-case-study",
  //   slug: "scaling-globally-techflow-case-study",
  //   category: "Case Study",
  //   title: "Scaling Globally: How TechFlow Managed 10k+ Signatures",
  //   excerpt: "A deep dive into how TechFlow used our enterprise-grade API to automate their international signing processes across 12 countries.",
  //   author: "David Kim",
  //   authorRole: "VP of Engineering at TechFlow",
  //   date: "Feb 25, 2026",
  //   readTime: "10 min read",
  //   color: "from-primary/20 to-brand/20",
  //   image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
  //   content: [
  //     "TechFlow expanded operations across North America, Europe, and Asia Pacific. As contract volumes surpassed 10,000 documents per month, manual signature management caused severe operational delays.",
  //     "### The Solution: REST API Automation",
  //     "By integrating the SignAny 2.0 REST API, TechFlow automated contract creation, signer assignment, and status webhooks directly inside their platform.",
  //     "### Results Achieved",
  //     "Average signature turnaround time dropped from 4.2 days to under 18 minutes, resulting in a 92% reduction in manual processing overhead."
  //   ]
  // },
  // {
  //   id: "5-hidden-features",
  //   slug: "5-hidden-features-in-signany-2-0",
  //   category: "Productivity",
  //   title: "5 Hidden Features in SignAny 2.0 You Should Be Using",
  //   excerpt: "From AI-powered field detection to custom signing sequences, explore the features that will save you hours of manual work.",
  //   author: "Alex Rivera",
  //   authorRole: "Head of Product",
  //   date: "Feb 20, 2026",
  //   readTime: "5 min read",
  //   color: "from-indigo-500/20 to-purple-500/20",
  //   image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&q=80&w=800",
  //   content: [
  //     "SignAny 2.0 is packed with powerful efficiency tools designed to accelerate your document workflow. Here are 5 hidden features you can leverage today:",
  //     "### 1. Smart Field Detection",
  //     "Automatically scan PDF forms and place signature, date, and text input boxes where placeholders exist.",
  //     "### 2. Auto Reminders & Expiry Rules",
  //     "Set automated reminder cadences for pending signers to close contracts faster.",
  //     "### 3. Custom Branding & White-Label Envelopes",
  //     "Apply your corporate logo, custom primary colors, and branded email templates to every document notification.",
  //     "### 4. Bulk Send for Multi-Recipient Distribution",
  //     "Send standardized forms to hundreds of signers simultaneously with individualized envelope tracking.",
  //     "### 5. Multi-Role Permission Sets",
  //     "Assign granular access controls for admins, department managers, senders, and view-only auditors."
  //   ]
  // }
];
