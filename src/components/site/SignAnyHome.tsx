import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Check, Sparkles } from "lucide-react";
import { Icon } from "@/components/site/Icon";
import { SectionHeading } from "@/components/site/Sections";
import { SignaturePath } from "@/components/site/spinner";
import { ProductCarousel } from "@/components/site/ProductCarousel";
import {
  heroStats,
  keyFeatures,
  workspaceFeatures,
  permissionSets,
  apiCapabilities,
  integrations,
  SITE,
} from "@/lib/site-data";

export function SignAnyHome() {
  return (
    <>
      <Hero />
      <ProductCarousel />
      <KeyFeatures />
      <Workspace />
      <Permissions />
      <ApiSection />
    </>
  );
}

function Hero() {
  return (
    <section className="mesh-bg relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="glow-orb top-10 right-[6%] h-80 w-80 bg-primary" />
      <div className="section-shell relative z-10 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-rise">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
            <Sparkles size={14} className="text-primary" />
            Secure workflow automation for modern legal teams
          </span>
          <h1 className="text-4xl leading-[1.05] font-bold text-balance md:text-5xl lg:text-[4rem]">
            Send, sign and track documents{" "}
            <span className="text-gradient-brand">faster, smarter, securely</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
            SignAny 2.0 is an electronic signature platform for teams that need speed and proof.
            Prepare documents with smart fields, route up to five signers, automate reminders, and
            keep a complete audit trail — with 15+ global compliance frameworks behind every
            signature.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={SITE.appLink}
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-px hover:shadow-lg"
            >
              SignUp <ArrowRight size={16} />
            </a>
            <a
              href="#book-demo"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Book Demo
            </a>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck size={16} className="text-primary" />
            Free plan includes 5 documents per month — no credit card required.
          </p>
        </div>

        <div className="relative animate-rise">
          <div className="card-soft relative overflow-hidden p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Document
                </p>
                <p className="text-sm font-semibold text-foreground">Master Services Agreement</p>
              </div>
              <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-foreground">
                2 of 3 signed
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {[
                { name: "John Doe", role: "Signer 1", state: "Signed" },
                { name: "Daniel Okafor", role: "Signer 2", state: "Signed" },
                { name: "Marco Sphere", role: "Signer 3", state: "Pending" },
              ].map((s) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/40 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.role}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      s.state === "Signed"
                        ? "bg-success/15 text-foreground"
                        : "bg-warning/20 text-foreground"
                    }`}
                  >
                    {s.state}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-dashed border-primary/40 bg-accent/40 p-5">
              <p className="text-xs font-medium text-muted-foreground">Signature field</p>
              <SignaturePath />
            </div>
          </div>
        </div>
      </div>

      <div className="section-shell relative z-10 mt-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card px-5 py-5">
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function KeyFeatures() {
  return (
    <section id="features" className="bg-cloud py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Core capabilities"
          title="Everything you need to run"
          highlight="digital signatures"
          desc="From upload to signed and archived — SignAny 2.0 removes the manual steps between you and a completed agreement."
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {keyFeatures.map((f) => (
            <article key={f.title} className="card-soft card-soft-hover group p-7">
              <div className="mb-7 flex items-start justify-between gap-4">
                <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-accent p-3.5 text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon name={f.icon} size={22} />
                </span>
                {f.tag && (
                  <span className="rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium text-muted-foreground">
                    {f.tag}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workspace() {
  return (
    <section id="workspace" className="py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Workspace & admin"
          title="Visibility and control for"
          highlight="the whole team"
          desc="Dashboards, audit trails, access control and configurable defaults keep every document accountable from the moment it is created."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workspaceFeatures.map((f) => (
            <article key={f.title} className="card-soft card-soft-hover p-7 text-center">
              <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <Icon name={f.icon} size={22} />
              </span>
              <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Permissions() {
  return (
    <section id="permissions" className="relative overflow-hidden bg-cloud py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Permission sets"
          title="Two clear roles:"
          highlight="Admin and Member"
          desc="SignAny 2.0 keeps access simple. Admins own configuration and governance; Members get everything they need to move documents forward."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {permissionSets.map((p) => (
            <article key={p.name} className="card-soft p-6 sm:p-8">
              <div className="flex items-start sm:items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                  <Icon name={p.icon} size={22} />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.summary}</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApiSection() {
  return (
    <section id="api" className="py-20 md:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="API & integrations"
          title="Bring signing into"
          highlight="any CRM or portal"
          desc="SignAny 2.0 ships with a REST API and ready-made connectors, so your team signs where they already work instead of switching tools."
        />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            {apiCapabilities.map((a) => (
              <article key={a.title} className="card-soft card-soft-hover p-6">
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <Icon name={a.icon} size={20} />
                </span>
                <h3 className="text-base font-semibold text-foreground">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
              </article>
            ))}
          </div>
          <div className="surface-ink relative overflow-hidden rounded-[1.75rem] p-8">
            <div className="glow-orb -bottom-16 -left-10 h-56 w-56 bg-primary" />
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-ink-foreground">Connected out of the box</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Send from your own mailbox, push signed files into your CRM, and authenticate
                signers with regional identity providers.
              </p>
              <ul className="mt-6 space-y-3">
                {integrations.map((i) => (
                  <li
                    key={i.name}
                    className="flex items-center justify-between rounded-xl border border-ink-foreground/12 bg-ink-foreground/5 px-4 py-3"
                  >
                    <span className="text-sm font-medium text-ink-foreground">{i.name}</span>
                    <span className="text-xs text-ink-muted">{i.type}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex justify-center">
                <a
                  href={`mailto:${SITE.email}?subject=SignAny%202.0%20API%20access`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-px w-full sm:w-auto text-center"
                >
                  Request API access <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
