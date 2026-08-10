import { Check, Sparkles, Clock3, Mail, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { compliances, salesforceCompliances, uaePass, plans, faqs, SITE } from "@/lib/site-data";
import { useProductMode } from "@/lib/product-mode";

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
              : "border-border bg-background text-muted-foreground"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl font-bold text-balance md:text-4xl lg:text-[2.75rem] ${
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
  const loop = isSalesforce
    ? [...salesforceCompliances, ...salesforceCompliances, ...salesforceCompliances, ...salesforceCompliances]
    : [...compliances, ...compliances];

  return (
    <section id="compliance" className="relative overflow-hidden bg-cloud py-20 md:py-28">
      <div className="section-shell relative z-10">
        <SectionHeading
          eyebrow="Compliance & Acts"
          title="Legally binding signatures across"
          highlight={isSalesforce ? "global frameworks" : "20+ frameworks"}
          desc={
            isSalesforce
              ? "The SignAny Salesforce edition aligns with key electronic transaction laws and compliance frameworks globally."
              : "SignAny 2.0 is engineered against the electronic transaction laws and data protection acts that govern your market — so every signed document holds up where it matters."
          }
        />
      </div>

      <div className="relative mb-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex w-max gap-4">
          {loop.map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="flex min-w-56 items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-sm"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Check size={16} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">{c.name}</span>
                <span className="block text-xs text-muted-foreground">{c.country}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-shell">
        {!isSalesforce && (
          <div className="card-soft mx-auto mb-8 flex max-w-4xl flex-col items-start gap-5 p-7 md:flex-row md:items-center md:p-9">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <Clock3 size={24} />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-foreground">{uaePass.name}</h3>
                <span className="rounded-full bg-warning/15 px-3 py-1 text-xs font-semibold text-foreground">
                  {uaePass.status}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{uaePass.desc}</p>
            </div>
          </div>
        )}
        <ul className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {currentCompliances.map((c) => (
            <li
              key={c.name}
              className="flex items-start gap-2 rounded-xl border border-border/70 bg-card px-4 py-3 text-sm"
            >
              <Check size={15} className="mt-0.5 shrink-0 text-primary" />
              <span>
                <span className="font-medium text-foreground">{c.name}</span>
                <span className="block text-xs text-muted-foreground">{c.country}</span>
              </span>
            </li>
          ))}
        </ul>
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

export function FAQSection() {
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
            {faqs.map((f, i) => (
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
