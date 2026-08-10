import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  FileText,
  EyeOff,
  Server,
  Globe,
  Database,
  UserCheck,
  CheckCircle2,
  Mail,
  Building2,
  MapPin,
  HelpCircle,
  Scale,
  Cookie,
  AlertCircle,
  ChevronRight,
  ArrowUp,
  Briefcase
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductModeProvider } from "@/lib/product-mode";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | SignAny 2.0 eSignature Platform" },
      {
        name: "description",
        content:
          "Learn how MV Clouds Private Limited protects your data on SignAny 2.0. Detailed disclosures on data collection, document privacy, retention, and global rights.",
      },
      { property: "og:title", content: "Privacy Policy | SignAny 2.0" },
      {
        property: "og:description",
        content:
          "Learn how MV Clouds Private Limited protects your data on SignAny 2.0. Detailed disclosures on data collection, document privacy, retention, and global rights.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: PrivacyPolicyRoute,
});

function PrivacyPolicyRoute() {
  return (
    <ProductModeProvider>
      <PrivacyPolicy />
    </ProductModeProvider>
  );
}

const ease = [0.2, 0, 0, 1] as const;

const tableOfContents = [
  { id: "notice", title: "1. Purpose & Identity Notice" },
  { id: "info-collected", title: "2. Information We Collect" },
  { id: "how-we-use", title: "3. How We Use Information" },
  { id: "legal-basis", title: "4. Legal Basis (GDPR / UK)" },
  { id: "sharing", title: "5. How We Share Information" },
  { id: "retention", title: "6. Document & Data Retention" },
  { id: "document-privacy", title: "7. Document Handling & Security" },
  { id: "cookies", title: "8. Cookies & Tracking" },
  { id: "choices", title: "9. Your Choices & Controls" },
  { id: "privacy-rights", title: "10. Your Privacy Rights" },
  { id: "california", title: "11. California Residents (CCPA)" },
  { id: "children", title: "12. Children's Privacy" },
  { id: "international", title: "13. International Data Transfers" },
  { id: "security", title: "14. How We Protect Data" },
  { id: "country-specific", title: "15. Country-Specific Disclosures" },
  { id: "policy-changes", title: "16. Changes to Policy" },
  { id: "contact-us", title: "17. Contact Us" },
];

const usageTableData = [
  {
    purpose: "Create and manage your account",
    infoUsed: "Account / identity information (name, email, password, company name)",
  },
  {
    purpose: "Generate, route, and process documents for signature",
    infoUsed: "Document content, signer information, signature data",
  },
  {
    purpose: "Build audit trails to support signature validity",
    infoUsed: "Transactional / audit trail data (IP address, timestamps, hashes), signature data",
  },
  {
    purpose: "Notify signers of pending or completed documents",
    infoUsed: "Signer information (name, email address, signing role)",
  },
  {
    purpose: "Provide customer support",
    infoUsed: "Customer support communications, account information",
  },
  {
    purpose: "Improve and troubleshoot the Service",
    infoUsed: "Usage data, device data, support communications",
  },
  {
    purpose: "Detect and prevent fraud, forgery, or unauthorised account access",
    infoUsed: "Device data, usage data, transactional data",
  },
  {
    purpose: "Comply with legal and tax obligations",
    infoUsed: "Account information, transactional data",
  },
  {
    purpose: "Send transactional notifications (e.g., 'document awaiting signature')",
    infoUsed: "Account and signer information",
  },
  {
    purpose: "Send marketing communications, where you've opted in",
    infoUsed: "Contact information, marketing preferences",
  },
];

const countryDisclosures = [
  {
    country: "India",
    law: "Digital Personal Data Protection Act, 2023 (DPDPA)",
    details:
      "As an Indian company, MV Clouds Private Limited processes personal data in accordance with the DPDPA 2023. Indian residents may exercise data principal rights (access, correction, erasure, grievance redressal) by contacting our Grievance Officer at info@esignany.com.",
  },
  {
    country: "United Kingdom",
    law: "UK GDPR & Data Protection Act 2018",
    details:
      "If you are a UK resident, UK GDPR applies. You have the right to lodge a complaint with the UK Information Commissioner's Office (ICO) if your privacy concern is unresolved.",
  },
  {
    country: "Brazil",
    law: "Lei Geral de Proteção de Dados (LGPD)",
    details:
      "Brazilian residents have rights to confirm data processing existence, request anonymisation/erasure of unnecessary data, obtain third-party sharing details, and revoke consent via info@esignany.com.",
  },
  {
    country: "Canada",
    law: "PIPEDA & Provincial Laws (Quebec Law 25, BC/Alberta PIPA)",
    details:
      "We manage personal data in compliance with PIPEDA and provincial laws. By using the Service, you consent to cross-border transfer outside Canada to secure servers (AWS us-east-1).",
  },
  {
    country: "Australia",
    law: "Privacy Act 1988 (Cth) & APPs",
    details:
      "We process personal data in compliance with APPs. Complaints will be responded to within 30 days and can be escalated to the Office of the Australian Information Commissioner (OAIC).",
  },
  {
    country: "Singapore",
    law: "Personal Data Protection Act 2012 (PDPA)",
    details:
      "Personal data processing and cross-border transfers strictly adhere to the standard of protection required under the Singapore PDPA Transfer Limitation Obligation.",
  },
  {
    country: "South Africa",
    law: "Protection of Personal Information Act (POPIA)",
    details:
      "South African residents may object to data processing for direct marketing or legitimate interests and lodge complaints with the Information Regulator.",
  },
  {
    country: "KSA & UAE",
    law: "KSA PDPL & UAE Federal Decree-Law No. 45 of 2021",
    details:
      "Data transferred outside the Kingdom/State is processed under strict contractual confidentiality, encrypted in transit and at rest, and used solely for executing electronic signing workflows.",
  },
];

function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<string>("notice");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sectionElements = tableOfContents.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const sec = sectionElements[i];
        if (sec.el && sec.el.offsetTop <= scrollPosition) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-28 md:pt-36 pb-20">
        <div className="section-shell">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest mb-4">
              <ShieldCheck size={16} />
              Trust & Data Governance
            </div> */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              MV Clouds Private Limited ("we", "us", "our") operates SignAny 2.0. This document explains how your information is collected, used, protected, and retained.
            </p>
            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground bg-muted/40 border border-border px-4 py-2 rounded-xl">
              <span><strong>Last Modified Date:</strong> 7 August 2026</span>
              {/* <span className="hidden sm:inline">•</span>
              <span><strong>Operator:</strong> MV Clouds Private Limited</span>
              <span className="hidden sm:inline">•</span>
              <span><strong>Platform:</strong> SignAny 2.0</span> */}
            </div>
          </motion.div>

          {/* Core Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          >
            <div className="card-soft p-5 rounded-2xl border border-primary/20 flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                <Lock size={20} />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1">AES-256 & TLS 1.3</h3>
              <p className="text-xs text-muted-foreground">Enterprise-grade cryptographic encryption at rest and in transit.</p>
            </div>

            <div className="card-soft p-5 rounded-2xl border border-primary/20 flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                <EyeOff size={20} />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1">Zero AI Training</h3>
              <p className="text-xs text-muted-foreground">We explicitly do NOT use your documents to train general AI/ML models.</p>
            </div>

            <div className="card-soft p-5 rounded-2xl border border-primary/20 flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                <Database size={20} />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1">1-Year Retention</h3>
              <p className="text-xs text-muted-foreground">Signed records retained 1 year for legal validity under eSignature laws.</p>
            </div>

            <div className="card-soft p-5 rounded-2xl border border-primary/20 flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                <Globe size={20} />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1">Global Compliance</h3>
              <p className="text-xs text-muted-foreground">Compliant with GDPR, DPDPA, CCPA, eIDAS, PIPEDA, LGPD & APPs.</p>
            </div>
          </motion.div>

          {/* Main Layout: Sticky Sidebar + Content */}
          <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">
            {/* Sticky Sidebar Navigation */}
            <aside className="hidden lg:block sticky top-28 space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 px-3">
                Table of Contents
              </div>
              <nav className="space-y-1">
                {tableOfContents.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 flex items-center justify-between group ${
                        isActive
                          ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <span className="truncate">{item.title}</span>
                      <ChevronRight
                        size={14}
                        className={`transition-transform duration-150 ${
                          isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 group-hover:opacity-60"
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>

              <div className="pt-6 border-t border-border mt-6 px-3">
                <div className="p-4 rounded-2xl bg-muted/40 border border-border">
                  <HelpCircle size={20} className="text-primary mb-2" />
                  <p className="text-xs font-bold text-foreground mb-1">Need Clarification?</p>
                  <p className="text-[11px] text-muted-foreground mb-3 leading-normal">
                    Contact our Data Protection Office for any privacy inquiries.
                  </p>
                  <a
                    href="mailto:info@esignany.com"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    <Mail size={12} /> info@esignany.com
                  </a>
                </div>
              </div>
            </aside>

            {/* Content Body */}
            <div className="space-y-12 text-foreground">

              {/* 1. Purpose & Identity Notice */}
              <section id="notice" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">1. Purpose of This Notice</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  MV Clouds Private Limited ("MV Clouds," "we," "us," "our") operates SignAny 2.0 (the "Service"), an electronic signature and document management platform. This Privacy Policy explains what personal information we collect, how we use and share it, how long we keep it, and the choices and rights available to you. By using the Service, you acknowledge that we process your information as described here.
                </p>

                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground text-sm">Data Controller vs. Data Processor Distinction</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    If a business or organisation has invited you to sign a document through SignAny 2.0, that business is typically the <strong>"data controller"</strong> for the content of that document and is responsible for the underlying transaction. We act as the <strong>"data processor"</strong> for document content in that scenario — questions about why a specific document was sent to you should generally go to the sender first.
                  </p>
                </div>

                <p className="text-xs text-muted-foreground italic">
                  This policy applies directly when you interact with MV Clouds Private Limited via SignAny 2.0.
                </p>
              </section>

              {/* 2. Information We Collect */}
              <section id="info-collected" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">2. Information We Collect</h2>

                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <div>
                    <h3 className="font-semibold text-foreground text-base mb-2">Provided Directly by You</h3>
                    <ul className="list-disc list-inside space-y-1.5 pl-1">
                      <li><strong>Account & identity:</strong> Name, email address, password, company/organization name.</li>
                      <li><strong>Signature data:</strong> Typed signature text, drawn signature image, or uploaded signature image file.</li>
                      <li><strong>Document content:</strong> Uploaded files for signing or review, text, form fields, and annotations.</li>
                      <li><strong>Signer information:</strong> Names, email addresses, and signing roles of document recipients.</li>
                      <li><strong>Customer support:</strong> Messages, attachments, or feedback sent through support channels.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground text-base mb-2">Collected Automatically</h3>
                    <ul className="list-disc list-inside space-y-1.5 pl-1">
                      <li><strong>Device data:</strong> IP address, browser type, operating system, unique device identifiers.</li>
                      <li><strong>Usage data:</strong> Pages viewed, features used, click patterns, session duration, error logs.</li>
                      <li><strong>Approximate location:</strong> Derived from IP address (we do not collect precise GPS data).</li>
                      <li><strong>Audit trail data:</strong> Signing action timestamps, IP address at signing, device/browser used, signing order, consent confirmations, and cryptographic document hash/checksum.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground text-base mb-1">Information We DO NOT Collect</h3>
                    <p>
                      We <strong>do not collect biometric signature data</strong> such as pen pressure, stroke speed, or stylus angle. Signatures are captured only as typed text, drawn images, or uploaded image files.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground text-base mb-1">Information from Other Sources</h3>
                    <p>
                      If someone else sends you a document for signature, they provide us with your name and email address to complete that transaction. We combine this with any account info you separately provide.
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. How We Use Your Information */}
              <section id="how-we-use" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">3. How We Use Your Information</h2>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  We process personal data strictly for defined purposes essential to operating an enterprise electronic signature service:
                </p>

                {/* Purpose & Data Table */}
                <div className="w-full overflow-x-auto my-4">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-border text-foreground font-bold">
                        <th className="py-2.5 px-3 w-1/2">Processing Purpose</th>
                        <th className="py-2.5 px-3 w-1/2">Categories of Information Used</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {usageTableData.map((row, index) => (
                        <tr key={index}>
                          <td className="py-2.5 px-3 font-medium text-foreground align-top">
                            {row.purpose}
                          </td>
                          <td className="py-2.5 px-3 text-muted-foreground leading-relaxed align-top">
                            {row.infoUsed}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-1 pt-2">
                  <h3 className="font-semibold text-foreground text-sm">Strict Zero-AI Training Commitment</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We explicitly <strong>do not use your document content or uploaded files</strong> to train general-purpose artificial intelligence (AI) or machine learning (ML) models.
                  </p>
                </div>
              </section>

              {/* 4. Legal Basis for Processing */}
              <section id="legal-basis" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">4. Legal Basis for Processing (EU/EEA & UK Users)</h2>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  Where European Union GDPR or UK GDPR applies, we rely on the following legal bases to process your personal data:
                </p>

                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground leading-relaxed pl-1">
                  <li>
                    <strong className="text-foreground">Performance of a Contract:</strong> To deliver the electronic signature service requested by you (account creation, document routing, transaction processing).
                  </li>
                  <li>
                    <strong className="text-foreground">Legal Obligation:</strong> To maintain cryptographic audit trails supporting signature validity under eIDAS, ESIGN Act, and electronic transaction laws.
                  </li>
                  <li>
                    <strong className="text-foreground">Legitimate Interests:</strong> To prevent fraud, secure platform infrastructure, and improve products without overriding your fundamental rights.
                  </li>
                  <li>
                    <strong className="text-foreground">Consent:</strong> For optional marketing communications and non-essential cookies, which you may freely withdraw at any time.
                  </li>
                </ul>
              </section>

              {/* 5. How We Share Your Information */}
              <section id="sharing" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">5. How We Share Your Information</h2>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  We disclose personal information strictly to trusted entities under controlled conditions:
                </p>

                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground leading-relaxed pl-1">
                  <li>
                    <strong className="text-foreground">Cloud Storage Providers (AWS S3):</strong> Securely hosting uploaded and completed signed documents with high-grade server encryption.
                  </li>
                  <li>
                    <strong className="text-foreground">Signing Transaction Participants:</strong> Limited to what is necessary to complete execution (e.g. recipients see document text and signer names).
                  </li>
                  <li>
                    <strong className="text-foreground">Sub-Processors & Service Providers:</strong> Email delivery, analytics, customer support, error monitoring, bound by strict confidentiality agreements.
                  </li>
                  <li>
                    <strong className="text-foreground">Legal & Regulatory Authorities:</strong> Where required to comply with statutory law, valid legal process, or to safeguard safety and rights.
                  </li>
                  <li>
                    <strong className="text-foreground">Corporate Successors:</strong> In the event of a merger, acquisition, or asset sale, with prior notice provided to affected users.
                  </li>
                </ul>

                <p className="text-sm font-semibold text-foreground pt-2">
                  We NEVER sell your personal information or document contents to third parties, and we do NOT share document content with advertisers.
                </p>
              </section>

              {/* 6. Document and Signature Retention */}
              <section id="retention" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">6. Document and Signature Retention</h2>

                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground leading-relaxed pl-1">
                  <li>
                    <strong className="text-foreground">Signed Records (1 Year):</strong> Signed documents and cryptographic audit trails are retained for 1 year to satisfy legal evidentiary standards supporting signature validity.
                  </li>
                  <li>
                    <strong className="text-foreground">Account Data (Active):</strong> Account information is maintained for as long as your registered account remains active and open.
                  </li>
                  <li>
                    <strong className="text-foreground">Deletion / Anonymisation (Secure):</strong> Upon expiry of retention or a valid request, data is permanently erased or anonymized using cryptographic measures.
                  </li>
                </ul>
              </section>

              {/* 7. Document Privacy & Data Handling Policy */}
              <section id="document-privacy" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">7. Document Privacy & Data Handling Policy</h2>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  At SignAny 2.0, we treat the content of your documents with the highest standard of confidentiality and security.
                </p>

                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground leading-relaxed pl-1">
                  <li>
                    <strong className="text-foreground">Data Separation & Role:</strong> When you sign or send documents on behalf of a business, we act strictly as a Data Processor. The document content belongs entirely to you or the initiating organisation.
                  </li>
                  <li>
                    <strong className="text-foreground">Strict Access Controls:</strong> We enforce rigid technical controls limiting employee access to document content. Employees can only access document text or transaction metadata on an absolute "need-to-know" basis to resolve support issues explicitly requested by you.
                  </li>
                  <li>
                    <strong className="text-foreground">No AI Training:</strong> We explicitly do not use, read, or scan your document contents, uploaded files, or signature metadata to train general-purpose artificial intelligence (AI) or machine learning (ML) models.
                  </li>
                  <li>
                    <strong className="text-foreground">Infrastructure & Encryption:</strong> All documents are isolated securely in cloud storage and are encrypted at rest and in transit using advanced cryptographic protocols (AES-256 and TLS 1.3).
                  </li>
                </ul>
              </section>

              {/* 8. Cookies */}
              <section id="cookies" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">8. Cookies & Tracking Technologies</h2>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  We use cookies and local browser storage mechanisms solely for operational efficiency:
                </p>

                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground leading-relaxed pl-1">
                  <li>
                    <strong className="text-foreground">Essential Cookies:</strong> Required for authentication, security, session integrity, and enabling signature execution. Cannot be disabled without breaking service functionality.
                  </li>
                  <li>
                    <strong className="text-foreground">Analytics Cookies:</strong> Used to evaluate product usage patterns, optimize load times, and troubleshoot UI defects. We do NOT deploy third-party advertising cookies.
                  </li>
                </ul>
              </section>

              {/* 9. Your Choices */}
              <section id="choices" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">9. Your Choices & Account Controls</h2>

                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground leading-relaxed pl-1">
                  <li>
                    <strong className="text-foreground">Profile Information:</strong> You can review, edit, or update your registered account details at any time through your dashboard settings.
                  </li>
                  <li>
                    <strong className="text-foreground">Marketing Communications:</strong> Unsubscribe via the link in any marketing email. Transactional signature notifications will continue to arrive.
                  </li>
                  <li>
                    <strong className="text-foreground">Browser Cookies:</strong> Control cookies through your browser configuration settings.
                  </li>
                  <li>
                    <strong className="text-foreground">Account Closure:</strong> Initiate account deletion via in-app settings or by emailing <a href="mailto:info@esignany.com" className="text-primary underline">info@esignany.com</a> (subject to retention obligations).
                  </li>
                </ul>
              </section>

              {/* 10. Your Privacy Rights */}
              <section id="privacy-rights" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">10. Your Privacy Rights</h2>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  Depending on your jurisdiction, you possess specific legal rights over your personal data:
                </p>

                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground leading-relaxed pl-1">
                  <li><strong className="text-foreground">Access:</strong> Request copies of your personal data.</li>
                  <li><strong className="text-foreground">Rectification:</strong> Correct inaccurate or incomplete data.</li>
                  <li><strong className="text-foreground">Erasure / Right to be Forgotten:</strong> Delete data subject to legal retention obligations.</li>
                  <li><strong className="text-foreground">Restriction of Processing:</strong> Restrict specific data processing activities.</li>
                  <li><strong className="text-foreground">Data Portability:</strong> Receive your data in a structured, machine-readable format.</li>
                  <li><strong className="text-foreground">Withdraw Consent:</strong> Revoke consent without affecting prior lawful processing.</li>
                </ul>

                <p className="text-sm text-muted-foreground pt-2">
                  To exercise any of these rights, submit your verified request to our DPO at{" "}
                  <a href="mailto:info@esignany.com" className="text-primary font-semibold hover:underline">
                    info@esignany.com
                  </a>.
                </p>
              </section>

              {/* 11. California Residents (CCPA/CPRA) */}
              <section id="california" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">11. Notice to California Residents (CCPA / CPRA)</h2>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California residents have specific statutory disclosures:
                </p>

                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground leading-relaxed pl-1">
                  <li><strong className="text-foreground">Right to Know:</strong> Categories of personal information collected, used, and disclosed in the preceding 12 months.</li>
                  <li><strong className="text-foreground">Right to Delete & Correct:</strong> Request deletion or correction of personal information held by us.</li>
                  <li><strong className="text-foreground">No Sale / Share:</strong> We do <strong>not sell or share</strong> personal information for cross-context behavioral advertising.</li>
                  <li><strong className="text-foreground">Non-Discrimination:</strong> You will not receive discriminatory treatment for exercising your CCPA rights.</li>
                </ul>

                <p className="text-sm font-semibold text-foreground pt-1">
                  Submit CCPA requests to: <a href="mailto:info@esignany.com" className="text-primary underline">info@esignany.com</a>
                </p>
              </section>

              {/* 12. Children's Privacy */}
              <section id="children" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">12. Children's Privacy</h2>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  The Service is not directed to, and is not intended for use by, children under 16. We do not knowingly collect personal information from children under 16. If you believe a child has provided us with personal information, contact us at <a href="mailto:info@esignany.com" className="text-primary underline">info@esignany.com</a> and we will immediately delete it.
                </p>
              </section>

              {/* 13. International Data Transfers */}
              <section id="international" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">13. International Data Transfers & Storage</h2>

                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <div>
                    <h3 className="font-semibold text-foreground text-base mb-1">Primary Data Hosting & Storage Location</h3>
                    <p>
                      SignAny 2.0 operates globally. By accessing or using our services, uploading documents, or completing electronic signatures, you acknowledge that your personal data, uploaded documents, and signature audit metadata are stored and processed in <strong>Amazon Web Services (AWS) data centers in the United States (us-east-1 region)</strong>.
                    </p>
                  </div>

                  <ul className="list-disc list-inside space-y-2 pl-1">
                    <li>
                      <strong className="text-foreground">Enterprise Encryption:</strong> All data in transit is encrypted using HTTPS/TLS 1.3, and all stored documents and database records are encrypted at rest using AES-256 server-side encryption.
                    </li>
                    <li>
                      <strong className="text-foreground">AWS Security Compliances:</strong> AWS infrastructure maintains compliance with ISO/IEC 27001, ISO 27017, ISO 27018, SOC 1, SOC 2, and SOC 3 international security standards.
                    </li>
                  </ul>

                  <p>
                    Where required by applicable privacy laws (such as EU GDPR, Swiss RevFADP, UK GDPR, and UAE PDPL), cross-border transfers are governed by AWS Data Processing Addenda containing Standard Contractual Clauses (SCCs) and adherence to recognized Data Privacy Frameworks.
                  </p>
                </div>
              </section>

              {/* 14. How We Protect Data */}
              <section id="security" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">14. How We Protect Your Information</h2>

                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground leading-relaxed pl-1">
                  <li>
                    <strong className="text-foreground">Cryptographic Hashing:</strong> Audit trail integrity is maintained via SHA-256 document hashing to instantly detect any unauthorized tampering.
                  </li>
                  <li>
                    <strong className="text-foreground">RBAC & Isolation:</strong> Role-based access control ensures strict isolation of customer data across tenant environments.
                  </li>
                  <li>
                    <strong className="text-foreground">24/7 Security Operations:</strong> Continuous vulnerability scanning, intrusion monitoring, and automated threat mitigation.
                  </li>
                </ul>
              </section>

              {/* 15. Country-Specific Supplemental Disclosures */}
              <section id="country-specific" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">15. Supplemental Country Disclosures</h2>

                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  {countryDisclosures.map((cd, index) => (
                    <div key={index} className="space-y-1">
                      <div className="font-semibold text-foreground">
                        <span className="font-bold">{cd.country}</span> — <span className="text-primary font-medium">{cd.law}</span>
                      </div>
                      <p>{cd.details}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 16. Changes to Policy */}
              <section id="policy-changes" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">16. Changes to This Policy</h2>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  We may amend this Privacy Policy to reflect changes in law, our practices, or the Service itself. Material changes will be communicated via email or an in-Service notification prior to taking effect. The "Version Date" at the top reflects the most recent update.
                </p>
              </section>

              {/* 17. Contact Us */}
              <section id="contact-us" className="scroll-mt-28 space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">17. Contact Us</h2>

                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <div>
                    <h3 className="text-base font-bold text-foreground">MV Clouds Private Limited</h3>
                    <p className="text-xs text-muted-foreground">Operator of SignAny 2.0</p>
                  </div>

                  <div>
                    <strong className="text-foreground block">Registered Address:</strong>
                    D - 404, The First Synthesis, B/H Keshavbaug Party Plot, Ahmedabad, Gujarat - 380015, India
                  </div>

                  <div>
                    <strong className="text-foreground block">Privacy & Data Inquiries:</strong>
                    <div className="space-x-3 pt-1">
                      <a href="mailto:info@esignany.com" className="text-primary font-semibold hover:underline">
                        info@esignany.com
                      </a>
                      <span>|</span>
                      <a href="mailto:info@mvclouds.com" className="text-primary font-semibold hover:underline">
                        info@mvclouds.com
                      </a>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-all duration-200"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
