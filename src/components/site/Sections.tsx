import { Check, Sparkles, Clock3, Mail, ArrowRight, ShieldCheck, Lock, FileText, Globe, Scale, Landmark, BookOpen, FileCheck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { compliances, salesforceCompliances, uaePass, plans, faqs, SITE } from "@/lib/site-data";
import { useProductMode } from "@/lib/product-mode";

const marqueeBadges = [
  { name: "ESIGN Act", desc: "US Federal Law", icon: FileCheck },
  { name: "UETA", desc: "State Compliance", icon: Scale },
  { name: "GLBA", desc: "Financial Security", icon: ShieldCheck },
  { name: "eIDAS (AES)", desc: "EU Trust Services", icon: Globe },
  { name: "Singapore's ETA", desc: "Electronic Transition Act", icon: Landmark },
  { name: "AU ETA 1999", desc: "Australia IT Law", icon: BookOpen },
  { name: "UK ECA 2000", desc: "UK Digital Signatures", icon: FileCheck },
];

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  desc,
  light,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  desc?: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      {eyebrow && (
        <span
          className={`mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide uppercase ${
            light
              ? "border-ink-foreground/15 bg-ink-foreground/5 text-ink-muted"
              : "border-primary/20 bg-primary/5 text-primary"
          }`}
        >
          <Sparkles size={13} />
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl font-bold tracking-tight text-balance md:text-5xl ${
          light ? "text-ink-foreground" : "text-foreground"
        }`}
      >
        {title} {highlight && <span className="text-gradient-brand">{highlight}</span>}
      </h2>
      {desc && (
        <p
          className={`mt-4 text-base leading-relaxed text-pretty md:text-lg ${
            light ? "text-ink-muted" : "text-muted-foreground"
          }`}
        >
          {desc}
        </p>
      )}
    </div>
  );
}

export function ComplianceSection() {
  const { isSalesforce } = useProductMode();
  const currentCompliances = isSalesforce ? salesforceCompliances : compliances;
  const marqueeLoop = [...marqueeBadges, ...marqueeBadges, ...marqueeBadges];

  return (
    <section id="compliance" className="relative overflow-hidden bg-cloud py-20 md:py-28">
      {/* Background Ambient Glows */}
      <div className="glow-orb top-10 left-[10%] h-72 w-72 bg-primary/10" />
      <div className="glow-orb bottom-10 right-[10%] h-80 w-80 bg-brand/10" />

      <div className="section-shell relative z-10">
        <SectionHeading
          eyebrow="Compliance & Global Acts"
          title="Legally binding signatures across"
          highlight={isSalesforce ? "global frameworks" : "20+ compliance acts"}
          desc={
            isSalesforce
              ? "The SignAny Salesforce edition adheres to global electronic transaction acts and strict enterprise data protection standards."
              : "SignAny 2.0 is engineered against the electronic transaction laws and data protection acts that govern your market — ensuring every signature holds full court-admissible validity."
          }
        />
      </div>

      {/* Auto-scrolling Marquee like reference project */}
      <div className="relative mb-14 overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-r from-cloud to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-l from-cloud to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee hover:[animation-play-state:paused] flex w-max gap-5 py-2 cursor-pointer">
          {marqueeLoop.map((b, i) => {
            const IconCmp = b.icon;
            return (
              <div
                key={`m-${b.name}-${i}`}
                className="group flex flex-col items-center text-center px-6 py-6 rounded-2xl bg-card border border-border/70 shadow-sm hover:shadow-lg hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 cursor-default min-w-[170px] md:min-w-[190px] relative"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                  <IconCmp size={22} strokeWidth={1.5} className="text-primary" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground mb-1 leading-tight">
                  {b.name}
                </h3>
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="section-shell relative z-10 max-w-5xl mx-auto">
        {/* UAE PASS Highlight Box (Web App Mode) */}
        {!isSalesforce && (
          <div className="relative mb-12 overflow-hidden rounded-3xl border border-border/80 bg-card p-6 sm:p-8 md:p-10 shadow-md">
            <div className="glow-orb -top-10 right-0 h-48 w-48 bg-primary/10" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
              <div className="flex items-start gap-4 max-w-3xl">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <Clock3 size={20} />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-primary">{uaePass.name} Authentication</h3>
                    <span className="rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 text-xs font-bold uppercase tracking-wider dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/50">
                      {uaePass.status}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90 font-medium">
                    {uaePass.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Structured Grid of Compliance Frameworks */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentCompliances.map((c) => (
            <div
              key={c.name}
              className="group relative flex h-20 items-center justify-between gap-3 rounded-2xl border border-border/80 bg-card px-5 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-primary text-[11px] font-bold mb-1">
                  <Check size={13} strokeWidth={2.5} /> Legally Enforceable
                </div>
                <h4 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                  {c.name}
                </h4>
              </div>
              <span className="shrink-0 rounded-md border border-border bg-muted/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {c.country}
              </span>
            </div>
          ))}
        </div>

        {/* Security & Audit Guarantee Banner */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3 rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck size={20} />
            </span>
            <div>
              <h5 className="text-xs font-bold text-foreground uppercase tracking-wider">Audit Trail</h5>
              <p className="text-xs text-muted-foreground">Tamper-evident SHA-256 logs</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Lock size={20} />
            </span>
            <div>
              <h5 className="text-xs font-bold text-foreground uppercase tracking-wider">256-Bit Encryption</h5>
              <p className="text-xs text-muted-foreground">AES at rest & TLS 1.3 in transit</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileText size={20} />
            </span>
            <div>
              <h5 className="text-xs font-bold text-foreground uppercase tracking-wider">Court-Admissible</h5>
              <p className="text-xs text-muted-foreground">Certificates of Completion</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple plans that scale"
          highlight="with your team"
          desc="Start free, upgrade when your volume grows, and build a bespoke package when your organisation needs more."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`card-soft card-soft-hover relative flex flex-col p-7 md:p-8 ${
                p.featured ? "border-primary/40 ring-1 ring-primary/25" : ""
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-8 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground">
                  <Sparkles size={12} /> Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-4xl font-bold tracking-tight text-foreground">{p.price}</span>
                <span className="pb-1.5 text-sm text-muted-foreground">{p.period}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={p.name === "Enterprise" ? "#book-demo" : SITE.appLink}
                className={`mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-px ${
                  p.featured
                    ? "bg-primary text-primary-foreground shadow-sm hover:shadow-lg"
                    : "border border-border bg-background text-foreground hover:bg-muted"
                }`}
              >
                {p.cta} <ArrowRight size={15} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Link } from "@tanstack/react-router";

export function FAQSection() {
  const displayedFaqs = faqs.slice(0, 4);

  return (
    <section id="faqs" className="bg-cloud py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="FAQs"
          title="Answers before you"
          highlight="sign up"
          desc="Everything teams usually ask about plans, permissions, integrations and compliance."
        />
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {displayedFaqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="rounded-2xl border border-border bg-card px-5 shadow-sm"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 text-center">
            <Link
              to="/faqs"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 shadow-sm hover:shadow-md"
            >
              View All FAQs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DemoCTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="section-shell">
        <div className="surface-ink relative overflow-hidden rounded-[2rem] px-7 py-14 text-center md:px-16 md:py-20">
          <div className="glow-orb -top-16 right-10 h-72 w-72 bg-primary" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold text-balance text-ink-foreground md:text-4xl">
              Ready to close documents in minutes, not days?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
              Create a free account and send your first 5 documents this month, or book a walkthrough
              with our team to see SignAny 2.0 mapped to your workflow.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={SITE.appLink}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-px sm:w-auto"
              >
                SignUp <ArrowRight size={16} />
              </a>
              <a
                href="#book-demo"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-ink-foreground/25 px-7 py-3.5 text-sm font-semibold text-ink-foreground transition-colors hover:bg-ink-foreground/10 sm:w-auto"
              >
                <Mail size={16} /> Book a demo
              </a>
            </div>
            <p className="mt-5 text-xs text-ink-muted">
              Talk to us at{" "}
              <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
                {SITE.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
