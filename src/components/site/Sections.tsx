import { Check, Sparkles, Clock3, Mail, ArrowRight, ShieldCheck, Lock, FileText, Globe, Scale, Landmark, BookOpen, FileCheck, Newspaper, Clock, User } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { compliances, salesforceCompliances, plans, faqs, blogs, SITE } from "@/lib/site-data";
import { useProductMode } from "@/lib/product-mode";
import { Icon } from "@/components/site/Icon";
import { Link } from "@tanstack/react-router";

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
  const marqueeLoop = [...currentCompliances, ...currentCompliances, ...currentCompliances];

  return (
    <section id="compliance" className="relative overflow-hidden bg-cloud py-20">
      {/* Background Ambient Glows */}
      <div className="glow-orb top-10 left-[10%] h-72 w-72 bg-primary/10" />
      <div className="glow-orb bottom-10 right-[10%] h-80 w-80 bg-brand/10" />

      <div className="section-shell relative z-10">
        <SectionHeading
          eyebrow="Compliance & Global Acts"
          title="Legally binding signatures across"
          highlight={isSalesforce ? "global frameworks" : "15+ compliance acts"}
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
            return (
              <div
                key={`m-${b.name}-${i}`}
                className="group flex flex-col items-center text-center px-6 py-6 rounded-2xl bg-card border border-border/70 shadow-sm hover:shadow-lg hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 cursor-default min-w-[170px] md:min-w-[190px] relative"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                  <Icon name={b.icon} size={22} className="text-primary" />
                </div>
                <h3 className="text-[15px] font-bold text-foreground mb-1 leading-tight">
                  {b.name}
                </h3>
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  {b.country}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="section-shell relative z-10 max-w-5xl mx-auto">

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
  const { isSalesforce } = useProductMode();
  const signUpLink = isSalesforce ? SITE.salesforcePackageLink : SITE.appLink;

  return (
    <section id="pricing" className="relative py-20">
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
              {p.name === "Enterprise" ? (
                <Link
                  to="/contact-us"
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-px ${
                    p.featured
                      ? "bg-primary text-primary-foreground shadow-sm hover:shadow-lg"
                      : "border border-border bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  {p.cta} <ArrowRight size={15} />
                </Link>
              ) : (
                <a
                  href={signUpLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-px ${
                    p.featured
                      ? "bg-primary text-primary-foreground shadow-sm hover:shadow-lg"
                      : "border border-border bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  {p.cta} <ArrowRight size={15} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  const displayedFaqs = faqs.slice(0, 4);

  return (
    <section id="faqs" className="bg-cloud py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="FAQs"
          title="Frequently Asked"
          highlight="Questions"
          desc="Get quick answers to common questions about features, security, pricing, and how Sign Any 2.0 helps you sign and manage documents with ease."
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
              className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              View All FAQs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BlogSection() {
  const homeBlogs = blogs.slice(0, 3);
  const hasMore = blogs.length > 3;

  return (
    <section id="blog" className="py-20 relative overflow-hidden bg-background">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Insights & Updates"
          title="Latest from our"
          highlight="blog"
          desc="Stay up to date with the latest in digital signatures, enterprise security, and document workflow automation."
        />

        {blogs.length === 0 ? (
          <div className="max-w-xl mx-auto text-center py-12 px-6 rounded-3xl border border-border/80 bg-card shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 border border-primary/20">
              <Newspaper size={30} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No Blogs Published Yet</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We haven't published any articles yet. Check back soon for the latest insights on digital signatures, enterprise security, and document workflow automation!
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {homeBlogs.map((b, idx) => (
              <article
                key={b.id}
                className={`group relative flex-col overflow-hidden rounded-3xl border border-border/80 bg-card p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg ${
                  idx === 2 ? "hidden lg:flex" : "flex"
                }`}
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                  <img
                    src={b.image}
                    alt={b.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary border border-border/50">
                    {b.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock size={12} /> {b.readTime}
                    </span>
                    <span>•</span>
                    <span>{b.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-2 line-clamp-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-6 leading-relaxed flex-1">
                    {b.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border/60 mt-auto">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <User size={13} /> {b.author}
                    </div>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: b.slug }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline underline-offset-4"
                    >
                      Read Article <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {hasMore && (
          <div className="mt-12 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-6 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-md"
            >
              View More Articles <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export function DemoCTA() {
  return (
    <section className="py-20">
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
              <Link
                to="/contact-us"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-ink-foreground/25 px-7 py-3.5 text-sm font-semibold text-ink-foreground transition-colors hover:bg-ink-foreground/10 sm:w-auto"
              >
                <Mail size={16} /> Book a demo
              </Link>
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
