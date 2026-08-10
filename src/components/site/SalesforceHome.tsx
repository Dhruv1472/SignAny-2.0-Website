import { ArrowRight, Info, Check } from "lucide-react";
import { Icon } from "@/components/site/Icon";
import { SectionHeading } from "@/components/site/Sections";
import { SignaturePath } from "@/components/site/spinner";
import { ProductCarousel } from "@/components/site/ProductCarousel";
import { salesforce, SITE } from "@/lib/site-data";
import { useProductMode } from "@/lib/product-mode";

export function SalesforceHome() {
  const { setMode } = useProductMode();

  return (
    <>
      <section
        id="sf-overview"
        className="mesh-bg relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24"
      >
        <div className="glow-orb top-8 right-[8%] h-80 w-80 bg-primary" />
        <div className="section-shell relative z-10 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-rise">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
              <Icon name="Cloud" size={14} className="text-primary" />
              {salesforce.badge}
            </span>
            <h1 className="text-4xl leading-[1.05] font-bold text-balance md:text-5xl lg:text-[3.75rem]">
              {salesforce.title.split("Salesforce")[0]}
              <span className="text-gradient-brand">Salesforce org</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
              {salesforce.subtitle}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={SITE.salesforcePackageLink}
                target="_blank"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-px hover:shadow-lg"
              >
                Try Now <ArrowRight size={16} />
              </a>
              <a
                href="#book-demo"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Book Demo
              </a>
            </div>
            <div className="mt-7 flex items-start gap-2.5 rounded-2xl border border-border bg-card px-4 py-3.5 text-sm text-muted-foreground">
              <Info size={16} className="mt-0.5 shrink-0 text-primary" />
              <span>
                {salesforce.note}{" "}
                <button
                  type="button"
                  onClick={() => setMode("signany")}
                  className="font-semibold text-primary underline underline-offset-4"
                >
                  Switch to SignAny 2.0
                </button>
              </span>
            </div>
          </div>

          <div className="card-soft animate-rise p-6 md:p-8">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Salesforce record
            </p>
            <p className="text-sm font-semibold text-foreground">Opportunity — Acme Renewal</p>
            <div className="mt-5 space-y-3">
              {[
                "Send for Signature action",
                "Signer details pulled from Contact",
                "Signed PDF attached to record",
                "Audit certificate stored in Files",
              ].map((row) => (
                <div
                  key={row}
                  className="flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/40 px-4 py-3 text-sm text-foreground"
                >
                  <Check size={16} className="text-primary" />
                  {row}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-dashed border-primary/40 bg-accent/40 p-5">
              <p className="text-xs font-medium text-muted-foreground">Signature field</p>
              <SignaturePath />
            </div>
          </div>
        </div>
      </section>

      <ProductCarousel />

      <section id="sf-features" className="bg-cloud py-20 md:py-28">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Capabilities"
            title="Signing that lives"
            highlight="inside Salesforce"
            desc="A native package built for teams whose workflow already starts and ends in their CRM."
          />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {salesforce.features.map((f) => (
              <article key={f.title} className="card-soft card-soft-hover group p-7">
                <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon name={f.icon} size={22} />
                </span>
                <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="sf-steps" className="py-20 md:py-28">
        <div className="section-shell">
          <SectionHeading
            eyebrow="How it works"
            title="Live in your org in"
            highlight="four steps"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {salesforce.steps.map((s, i) => (
              <article key={s.title} className="card-soft card-soft-hover p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-base font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </article>
            ))}
          </div>

          <div className="card-soft mt-10 p-8">
            <h3 className="text-lg font-semibold text-foreground">
              What lives in the full SignAny 2.0 web app
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {salesforce.limits.map((l) => (
                <li key={l} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <ArrowRight size={15} className="mt-0.5 shrink-0 text-primary" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex justify-center sm:justify-start">
              <button
                type="button"
                onClick={() => setMode("signany")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-px w-full sm:w-auto text-center"
              >
                Explore SignAny 2.0 <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
