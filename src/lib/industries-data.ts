export interface UseCaseStep {
  stepNumber: number;
  title: string;
  workflow: string;
  featureUsed: string;
  keyBenefit: string;
  mockType: "template" | "multi-signer" | "audit-hash" | "reminders" | "editor" | "api-sync";
}

export interface IndustryUseCase {
  id: string;
  name: string;
  iconName: string;
  tagline: string;
  description: string;
  question: string;
  scenario: string;
  solutionTitle: string;
  solutionOverview: string;
  steps: UseCaseStep[];
  featuresList: string[];
}

export const signanyIndustries: IndustryUseCase[] = [
  {
    id: "healthcare",
    name: "Healthcare & Life Sciences",
    iconName: "Stethoscope",
    tagline: "HIPAA-compliant patient consent & clinical signatures",
    description: "Streamline patient check-in, clinical trial consents, and referral authorizations with zero paperwork friction.",
    question: "How can healthcare networks collect patient consent forms & clinical trial signatures 80% faster while guaranteeing HIPAA compliance and cryptographic proof?",
    scenario: "CarePoint Health manages over 4,000 patient visits monthly across 6 facilities. Intake staff faced paper check-in bottlenecks, physicians spent hours manually filling referral packets, and compliance auditors flagged missing signatures on HIPAA consent disclosures.",
    solutionTitle: "SignAny 2.0 Healthcare Transformation",
    solutionOverview: "Here is how SignAny 2.0 digitizes the entire patient lifecycle from pre-arrival check-in to secure long-term EHR archiving:",
    steps: [
      {
        stepNumber: 1,
        title: "Protected Template Vault & Role Access Control",
        workflow: "The Compliance Lead locks standard HIPAA Consent, Medical Release, and Surgical Authorization templates in the SignAny 2.0 Vault. Front desk staff can generate patient documents but are strictly barred from altering legal verbiage.",
        featureUsed: "Role-Based Access & Locked Templates",
        keyBenefit: "Prevents accidental legal wording modifications while enabling instant front-desk document creation.",
        mockType: "template",
      },
      {
        stepNumber: 2,
        title: "Mobile Check-In & Tablet Signature Pad",
        workflow: "Upon patient check-in, staff trigger the pre-filled Intake Packet. The patient reviews and signs digitally on an iPad or SMS mobile link with zero app download required.",
        featureUsed: "In-Person Touch Pad & SMS Delivery",
        keyBenefit: "Cuts patient wait time from 15 minutes to under 2 minutes per check-in.",
        mockType: "multi-signer",
      },
      {
        stepNumber: 3,
        title: "Sequential Referral & Attending Authorization",
        workflow: "When a specialist referral is needed, SignAny 2.0 routes the document in order: Primary Physician fills clinical diagnosis -> Specialist signs acceptance -> Patient receives final copy.",
        featureUsed: "Sequential Multi-Signer Order & Smart Fields",
        keyBenefit: "Eliminates back-and-forth faxing and missing authorization steps.",
        mockType: "editor",
      },
      {
        stepNumber: 4,
        title: "Cryptographic SHA-256 Audit Trail & EHR Archive",
        workflow: "Every executed consent document is stamped with a tamper-evident SHA-256 hash certificate containing timestamp, IP address, and signer identity, then auto-synced to the patient record.",
        featureUsed: "Audit Trail Hash Proof & Cloud Auto-Sync",
        keyBenefit: "Ensures 100% audit readiness for HIPAA and legal regulatory compliance.",
        mockType: "audit-hash",
      },
    ],
    featuresList: ["Multi-Signer Sequential Order", "SHA-256 Hash Proof", "Role-Based Access Control", "SMS & Tablet Signature", "Cloud Auto-Sync"],
  },
  {
    id: "hr-teams",
    name: "HR & People Operations",
    iconName: "Users",
    tagline: "Frictionless offer letters & onboarding packets",
    description: "Deliver memorable onboarding experiences with automated offer packages, NDA signatures, and HRIS webhooks.",
    question: "How can fast-growing HR teams eliminate offer letter typos, issue multi-document onboarding packages, and track signed contracts in real-time?",
    scenario: "Nexus Tech was scaling rapidly, hiring 40+ employees monthly. HR managers drowned in manual email chains, candidates received separate emails for NDAs and handbooks, and negotiating salary required restarting the document workflow from scratch.",
    solutionTitle: "SignAny 2.0 People Operations Workflow",
    solutionOverview: "How SignAny 2.0 automates the candidate-to-employee journey with error-free speed:",
    steps: [
      {
        stepNumber: 1,
        title: "Dynamic Offer Generation & Smart Field Mapping",
        workflow: "Recruiters pick the standard Offer Letter template. SignAny 2.0 auto-populates candidate name, compensation tiers, stock options, and start dates directly from record inputs.",
        featureUsed: "Smart Field Prefill & Validation Rules",
        keyBenefit: "Zero salary typos or missing start date entries.",
        mockType: "template",
      },
      {
        stepNumber: 2,
        title: "Real-Time Negotiations & In-Preview Edits",
        workflow: "During final offer negotiation, HR can edit compensation figures or start dates directly within the live document editor without recreating or re-uploading files.",
        featureUsed: "Real-Time Live Document Editor",
        keyBenefit: "Update offer terms on the phone and resend within seconds.",
        mockType: "editor",
      },
      {
        stepNumber: 3,
        title: "All-in-One Multi-Document Bundle",
        workflow: "SignAny 2.0 merges the Offer Letter, Mutual NDA, Direct Deposit Form, and Employee Handbook into a single continuous signing session for the new hire.",
        featureUsed: "Multi-Document Packet Bundling",
        keyBenefit: "Candidates complete all onboarding documents in a single 3-minute session.",
        mockType: "multi-signer",
      },
      {
        stepNumber: 4,
        title: "Auto-Reminders & Webhook HRIS Provisioning",
        workflow: "If an offer remains un-signed, automatic reminders ping the candidate after 24h. Upon signing, a webhook instantly alerts IT to provision laptop & accounts.",
        featureUsed: "Automated Reminders & Webhook Triggers",
        keyBenefit: "Achieves 94% same-day offer sign-off rate.",
        mockType: "api-sync",
      },
    ],
    featuresList: ["Smart Prefill Fields", "Live Document Editor", "Multi-Doc Bundling", "Automated Expiration Reminders", "HRIS Webhooks"],
  },
  {
    id: "legal",
    name: "Legal & Corporate Counsel",
    iconName: "Scale",
    tagline: "Court-admissible contracts & tamper-proof audit trails",
    description: "Execute high-stakes commercial agreements, MSAs, and governance resolutions with rock-solid legal validity.",
    question: "How can legal teams execute complex multi-party agreements across global partners while guaranteeing strict proof of intent and tamper detection?",
    scenario: "Sterling Global Counsel executes high-value M&A deals and partner contracts involving up to 5 signers across different time zones. Manual email tracking caused missed execution deadlines and vulnerability to altered document pages.",
    solutionTitle: "SignAny 2.0 Legal & Governance Framework",
    solutionOverview: "How SignAny 2.0 provides court-admissible security for enterprise agreements:",
    steps: [
      {
        stepNumber: 1,
        title: "Strict Multi-Party Routing & Approval Gates",
        workflow: "Define precise signature paths: Corporate Officer 1 -> External Legal Counsel -> Counterparty CEO -> Escrow Agent. SignAny 2.0 enforces sequential execution.",
        featureUsed: "Multi-Party Sequential Order & Gates",
        keyBenefit: "Ensures documents cannot be signed out of order or by unauthorized parties.",
        mockType: "multi-signer",
      },
      {
        stepNumber: 2,
        title: "Signer Identity Authentication & Access PIN",
        workflow: "High-value signers receive an encrypted notification and must enter a custom Access PIN or SMS OTP code before viewing confidential contract terms.",
        featureUsed: "Signer Authentication & OTP Access Codes",
        keyBenefit: "Verifies signer identity before revealing sensitive contract terms.",
        mockType: "template",
      },
      {
        stepNumber: 3,
        title: "Cryptographic SHA-256 Hash Certification",
        workflow: "Upon completion, SignAny 2.0 calculates a unique SHA-256 cryptographic digest of the document content. Any post-signature byte modification invalidates the hash.",
        featureUsed: "Cryptographic SHA-256 Signature Stamp",
        keyBenefit: "Provides immutable proof against contract alteration or tampering.",
        mockType: "audit-hash",
      },
      {
        stepNumber: 4,
        title: "Complete Audit Certificate & Archival Storage",
        workflow: "Every signed agreement is issued with a detailed Audit Log certificate recording every view, click, IP address, and timestamp, then stored in cloud vaults.",
        featureUsed: "Court-Admissible Audit Trail PDF",
        keyBenefit: "Adheres to ESIGN, UETA, and eIDAS international e-signature laws.",
        mockType: "reminders",
      },
    ],
    featuresList: ["Signer Authentication OTP", "Sequential Approval Gates", "SHA-256 Cryptographic Hash", "Court-Admissible Audit Logs", "ESIGN & eIDAS Compliant"],
  },
  {
    id: "real-estate",
    name: "Real Estate & Property",
    iconName: "Building2",
    tagline: "Mobile lease agreements & instant tenant disclosures",
    description: "Close residential & commercial leases, buyer representation agreements, and maintenance sign-offs anywhere.",
    question: "How can property managers close lease agreements and tenant addendums on mobile devices without physical meetings or printing delays?",
    scenario: "Horizon Realty manages over 1,500 rental units. Leasing agents wasted hours driving to properties just for lease signings, tenants delayed move-ins waiting for paper mailers, and lease renewals required manual tracking spreadsheet updates.",
    solutionTitle: "SignAny 2.0 Property Management Suite",
    solutionOverview: "How SignAny 2.0 accelerates property leasing from inquiry to move-in:",
    steps: [
      {
        stepNumber: 1,
        title: "Standardized Lease Templates with Conditional Rules",
        workflow: "Property managers maintain state-compliant lease templates. Conditional fields dynamically show or hide pet disclosures, parking addendums, and storage terms.",
        featureUsed: "Conditional Logic & Smart Field Rules",
        keyBenefit: "Reduces lease document preparation time from 45 minutes to 3 minutes.",
        mockType: "template",
      },
      {
        stepNumber: 2,
        title: "Instant Mobile Touch Signature for Tenants",
        workflow: "Tenants receive a link via SMS or Email and sign their lease agreement on their mobile phone touchscreen while touring the property or at home.",
        featureUsed: "Mobile-Responsive Gesture Signature Pad",
        keyBenefit: "78% of leases are signed on mobile within 2 hours of sending.",
        mockType: "multi-signer",
      },
      {
        stepNumber: 3,
        title: "Automated Lease Expiration & Renewal Alerts",
        workflow: "SignAny 2.0 tracks lease expiration dates and automatically sends tenant renewal notices with pre-filled extension agreements 60 days before expiration.",
        featureUsed: "Automated Expiration & Renewal Engine",
        keyBenefit: "Boosts lease renewal rates by eliminating forgotten expiration dates.",
        mockType: "reminders",
      },
      {
        stepNumber: 4,
        title: "Cloud Sync & Tenant Portal Storage",
        workflow: "Signed leases auto-archive to cloud storage folders (Google Drive/Dropbox/OneDrive) and attach to the property management portal for instant tenant retrieval.",
        featureUsed: "Cloud Storage Auto-Export",
        keyBenefit: "Centralizes tenant files with zero manual downloading or uploading.",
        mockType: "api-sync",
      },
    ],
    featuresList: ["Conditional Field Rules", "Mobile Touch Signature", "SMS Instant Delivery", "Lease Expiration Alerts", "Cloud Storage Sync"],
  },
  {
    id: "finance",
    name: "Financial Services",
    iconName: "Landmark",
    tagline: "High-security account opening & wealth disclosures",
    description: "Accelerate client onboarding, wire transfers, and advisory disclosures with zero-trust security controls.",
    question: "How can wealth managers & credit unions execute investor agreements and account openings with zero skipped signature fields and 100% security?",
    scenario: "Vanguard Capital onboarded high-net-worth clients requiring W-9s, risk disclosures, and wire authorization forms. Skipped initial boxes on 30-page documents required re-sending paperwork multiple times, annoying VIP clients.",
    solutionTitle: "SignAny 2.0 Wealth & Banking Solution",
    solutionOverview: "How SignAny 2.0 guarantees flawless execution for sensitive financial agreements:",
    steps: [
      {
        stepNumber: 1,
        title: "Guaranteed Required Field Enforcers",
        workflow: "SignAny 2.0 guides signers through required initial boxes, signature lines, and date inputs. Signers cannot submit until 100% of required fields are filled.",
        featureUsed: "Strict Field Enforcement & Guided Signing",
        keyBenefit: "Completely eliminates incomplete or rejected application documents.",
        mockType: "template",
      },
      {
        stepNumber: 2,
        title: "Multi-Client Joint Signer Workflows",
        workflow: "For joint accounts or trust funds, SignAny 2.0 routes the agreement seamlessly to Primary Account Holder -> Joint Holder -> Financial Advisor.",
        featureUsed: "Joint Account Signer Routing",
        keyBenefit: "Coordinates multi-party signatures without manual email forwarding.",
        mockType: "multi-signer",
      },
      {
        stepNumber: 3,
        title: "Bulk Distribution for Regulatory Updates",
        workflow: "Send annual privacy policy updates and fee schedule disclosures to 5,000 clients simultaneously using SignAny 2.0 Bulk Distribution.",
        featureUsed: "Bulk Document Send & Tracking Engine",
        keyBenefit: "Processes thousands of personalized agreements in minutes.",
        mockType: "api-sync",
      },
      {
        stepNumber: 4,
        title: "Live Dashboard Audit & Completion Metrics",
        workflow: "Advisors monitor signing status in real-time. Unopened links, pending signatures, and completed account disclosures are tracked in one central dashboard.",
        featureUsed: "Real-Time Workspace Analytics",
        keyBenefit: "Reduces average account opening time from 5 days to 4 hours.",
        mockType: "audit-hash",
      },
    ],
    featuresList: ["Guided Field Enforcement", "Joint Account Workflows", "Bulk Send Engine", "Real-Time Tracking Dashboard", "Encrypted Data Transmission"],
  },
  {
    id: "sales",
    name: "Sales & Procurement",
    iconName: "Briefcase",
    tagline: "Accelerated deal velocity & instant contract execution",
    description: "Shorten sales cycles from weeks to minutes by executing MSAs, SOWs, and vendor contracts directly within sales workflows.",
    question: "How can sales leadership eliminate deal delays at month-end by embedding digital signatures directly into CRM and customer touchpoints?",
    scenario: "Apex SaaS account executives lost end-of-quarter revenue because contract signatures stalled in customer legal inbox queues. Representatives lacked visibility into whether prospects had even opened the agreement.",
    solutionTitle: "SignAny 2.0 High-Velocity Sales Suite",
    solutionOverview: "How SignAny 2.0 accelerates deal execution and closes revenue faster:",
    steps: [
      {
        stepNumber: 1,
        title: "One-Click CRM Contract Dispatch",
        workflow: "Sales reps generate personalized SOWs and pricing proposals directly from CRM opportunity records using SignAny 2.0 API integration.",
        featureUsed: "REST API & CRM Workflow Integration",
        keyBenefit: "Generates custom contracts with zero manual data entry.",
        mockType: "api-sync",
      },
      {
        stepNumber: 2,
        title: "Real-Time Document Activity Alerts",
        workflow: "SignAny 2.0 notifies the account executive the exact second a prospect opens, views, or signs the proposal, enabling perfect follow-up timing.",
        featureUsed: "Real-Time View & Signing Webhooks",
        keyBenefit: "Knows instantly when decision-makers are reviewing the contract.",
        mockType: "reminders",
      },
      {
        stepNumber: 3,
        title: "Urgency Expiration Timers & Custom Reminders",
        workflow: "Apply automated 48-hour expiration countdowns on special end-of-quarter pricing to motivate rapid executive sign-off.",
        featureUsed: "Countdown Expiration & Automated Reminders",
        keyBenefit: "Drives urgent action on time-sensitive enterprise proposals.",
        mockType: "editor",
      },
      {
        stepNumber: 4,
        title: "Instant In-Person & Web Sign Kiosks",
        workflow: "Turn any tablet into a live signing kiosk at trade shows or client meetings, allowing prospects to sign agreements on the spot.",
        featureUsed: "In-Person Signing Kiosk Mode",
        keyBenefit: "Captures signed agreements immediately during live sales conversations.",
        mockType: "multi-signer",
      },
    ],
    featuresList: ["REST API & Webhook Integration", "Real-Time Open Tracking", "Contract Expiration Timers", "In-Person Sign Kiosks", "CRM Auto-Sync"],
  },
];
