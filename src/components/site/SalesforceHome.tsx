import { motion } from "framer-motion";
import { ArrowRight, Info, Check, Shield, Zap } from "lucide-react";
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

          <div className="relative animate-rise max-w-full">
            <div className="relative card-soft rounded-[28px] p-3 sm:p-5 md:p-6 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-primary/10 via-transparent to-brand/10" />

              <div className="relative rounded-[22px] border border-border/60 bg-background/95 p-3.5 sm:p-5 md:p-6 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between gap-2 mb-5 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-muted flex items-center justify-center shrink-0">
                      <div className="w-4 h-5 sm:w-5 sm:h-6 rounded-sm bg-primary/30" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm font-semibold text-foreground truncate">MSA_Enterprise_2026.pdf</div>
                      <div className="text-[11px] sm:text-xs text-muted-foreground truncate">5 pages · 4 approval steps</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] sm:text-xs font-semibold shrink-0">In Review</span>
                </div>

                <div className="grid grid-cols-[1fr_auto] gap-3 sm:gap-4 mb-5">
                  <div className="space-y-3 min-w-0">
                    {[100, 84, 92, 70, 76, 62].map((w, i) => (
                      <div key={i} className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-primary/20 to-brand/20"
                          initial={{ width: 0 }}
                          animate={{ width: `${w}%` }}
                          transition={{ delay: 0.7 + i * 0.08, duration: 0.6 }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="hidden md:flex flex-col gap-2">
                    {[
                      { label: "Legal", active: true },
                      { label: "Ops", active: true },
                      { label: "CFO", active: false },
                    ].map((step) => (
                      <div key={step.label} className="rounded-xl border border-border px-3 py-2 text-xs font-medium bg-background min-w-[88px]">
                        <span className={step.active ? "text-primary font-bold" : "text-muted-foreground"}>{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-4 items-start">
                  <div className="rounded-2xl border-2 border-dashed border-primary/25 p-3 sm:p-4 bg-muted/40 overflow-hidden">
                    <div className="text-xs text-muted-foreground mb-1 font-medium">Secure signature pad</div>
                    <div className="h-24 sm:h-28 flex items-center justify-center overflow-hidden">
                      <SignaturePath className="h-full w-auto max-w-full text-primary" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-2xl border border-border/80 bg-muted/30 p-3.5 sm:p-4">
                      <div className="flex items-center gap-2 mb-2 text-foreground text-sm font-semibold">
                        <Shield size={16} className="text-primary shrink-0" />
                        Verification Layer
                      </div>
                      <div className="text-xs text-muted-foreground leading-relaxed">Identity checks, audit logs, and tamper-proof timestamps attached to each signature event.</div>
                    </div>
                    <div className="rounded-2xl border border-border/80 bg-muted/30 p-3.5 sm:p-4">
                      <div className="flex items-center gap-2 mb-2 text-foreground text-sm font-semibold">
                        <Zap size={16} className="text-primary shrink-0" />
                        Workflow Speed
                      </div>
                      <div className="text-xs text-muted-foreground leading-relaxed">Auto reminders and smart routing reduce delays across high-stakes approvals.</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-5">
                  <a
                    href={SITE.appLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold text-center shadow-sm hover:opacity-90 transition-opacity"
                  >
                    Sign & Complete
                  </a>
                  <div className="py-3 px-3 sm:px-4 rounded-xl border border-border text-xs sm:text-sm font-medium text-muted-foreground text-center bg-background">Review</div>
                </div>
              </div>
            </div>

            <motion.div
              className="absolute -left-8 top-[66.5%] hidden xl:block z-20"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.div
                className="rounded-2xl border border-border/80 bg-card p-4 w-40 shadow-lg will-change-transform transform-gpu"
                style={{ backfaceVisibility: "hidden" }}
                animate={{ y: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              >
                <div className="text-xs text-muted-foreground mb-2">Signer status</div>
                <div className="text-lg font-bold text-foreground">4/5 complete</div>
                <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full bg-gradient-to-r from-primary to-brand"
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ delay: 1.2, duration: 1 }}
                  />
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute -right-5 top-10 hidden xl:block z-20"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <motion.div
                className="rounded-2xl border border-border/80 bg-card px-4 py-3 flex items-center gap-3 shadow-lg will-change-transform transform-gpu"
                style={{ backfaceVisibility: "hidden" }}
                animate={{ y: [-6, 6, -6] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield size={16} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">Audit trail active</div>
                  <div className="text-[10px] text-muted-foreground">Every action is recorded</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <ProductCarousel />

      <section id="sf-features" className="bg-cloud py-20">
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

      <section id="sf-steps" className="py-20">
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
