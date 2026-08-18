import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { Icon } from "@/components/site/Icon";
import { ProductModeProvider } from "@/lib/product-mode";
import { signanyFeatures, FeatureDetail } from "@/lib/features-data";
import { SITE } from "@/lib/site-data";

export const Route = createFileRoute("/features_/$id")({
  head: ({ params }) => {
    const feat = signanyFeatures.find((f) => f.id === params.id) || signanyFeatures[0];
    return {
      meta: [
        { title: `${feat.title} — SignAny 2.0 Feature` },
        {
          name: "description",
          content: `${feat.tagline}. Discover how SignAny 2.0's ${feat.title} automates document execution, boosts compliance, and eliminates manual paperwork.`,
        },
      ],
    };
  },
  component: FeatureDetailPage,
});

function FeatureDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const selectedFeature =
    signanyFeatures.find((f) => f.id === id) || signanyFeatures[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <ProductModeProvider>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <Header />

        <main className="py-20">
          {/* Top Breadcrumb & Hero Header */}
          <section className="mesh-bg relative border-b border-border/80 pb-12 pt-6">
            <div className="section-shell relative z-10">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-6">
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
                <ChevronRight size={14} />
                <a href="/#features" className="hover:text-primary transition-colors">
                  Features
                </a>
                <ChevronRight size={14} />
                <span className="text-primary font-bold">{selectedFeature.title}</span>
              </nav>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3 max-w-3xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold text-primary shadow-sm">
                    <Sparkles size={14} />
                    SignAny 2.0 Feature Breakdown
                  </span>
                  <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                    {selectedFeature.title}
                  </h1>
                  <p className="text-lg font-medium text-muted-foreground">
                    {selectedFeature.tagline}
                  </p>
                </div>

                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground bg-card border border-border px-4 py-2.5 rounded-xl transition-all self-start md:self-auto"
                >
                  <ArrowLeft size={16} /> Back to Home
                </Link>
              </div>

              {/* Feature Switcher Tabs */}
              <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {signanyFeatures.map((f) => {
                  const isSelected = f.id === selectedFeature.id;

                  return (
                    <button
                      key={f.id}
                      onClick={() => navigate({ to: "/features/$id", params: { id: f.id } })}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon name={f.icon} size={15} />
                      {f.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Main Detail Content */}
          <section className="section-shell mt-12 space-y-12">
            {/* Overview & Impact Summary Banner */}
            <div className="card-soft overflow-hidden p-6 md:p-10 relative bg-gradient-to-br from-card via-card to-accent/30 border-primary/20 shadow-md">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="space-y-4 lg:max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-wider">
                    <Layers size={14} />
                    Feature Overview
                  </div>
                  <h2 className="text-lg Delivery Channels text-foreground leading-snug">
                    {selectedFeature.overview}
                  </h2>
                </div>

                <div className="shrink-0 lg:w-80 flex flex-col justify-center rounded-2xl bg-card border border-border p-6 shadow-sm">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Key Value & Result
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-2 leading-relaxed">
                    {selectedFeature.businessImpact}
                  </p>
                  <div className="mt-4 pt-3 border-t border-border/60">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                      <ShieldCheck size={16} /> Enterprise Security Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Capabilities Grid */}
            <div className="space-y-6">
              <div className="border-b border-border pb-4">
                <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Zap size={22} className="text-primary" />
                  Key Feature Capabilities
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Built-in functionality engineered to eliminate document execution bottlenecks
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {selectedFeature.capabilities.map((cap, idx) => (
                  <motion.div
                    key={cap.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.08 }}
                    className="card-soft p-6 space-y-3 border-border/80"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        0{idx + 1}
                      </span>
                      <h4 className="text-lg font-bold text-foreground">{cap.title}</h4>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground font-normal">
                      {cap.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* How It Works (Step-by-Step 1 to 4) */}
            <div className="space-y-6">
              <div className="border-b border-border pb-4">
                <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles size={22} className="text-primary" />
                  How It Works
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Step-by-step operational path from preparation to execution
                </p>
              </div>

              <div className="space-y-4">
                {selectedFeature.howItWorks.map((step) => (
                  <motion.div
                    key={step.stepNumber}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="card-soft p-6 space-y-2 border-border/80"
                  >
                    <div className="flex items-center justify-between border-b border-border/60 pb-3">
                      <h4 className="text-lg font-bold text-foreground">
                        Step {step.stepNumber}: {step.title}
                      </h4>
                      <span className="text-xs font-mono font-semibold text-primary">
                        Phase 0{step.stepNumber}
                      </span>
                    </div>
                    <p className="text-sm md:text-base leading-relaxed text-muted-foreground font-normal pt-1">
                      {step.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Technical Specifications Data Box */}
            <div className="space-y-6">
              <div className="border-b border-border pb-4">
                <h3 className="text-2xl font-bold text-foreground">
                  Technical Specifications & Guardrails
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Enterprise-grade parameters and compliance standards
                </p>
              </div>

              <div className="card-soft p-6 md:p-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 border-border/80">
                {selectedFeature.specs.map((s) => (
                  <div key={s.label} className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {s.label}
                    </p>
                    <p className="text-base font-bold text-foreground">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Call-To-Action Banner */}
            <div className="surface-ink relative overflow-hidden rounded-2xl p-8 md:p-12 mt-16">
              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-ink-foreground/10 px-3.5 py-1 text-xs font-bold text-ink-foreground">
                  Experience {selectedFeature.title} in action
                </span>
                <h3 className="text-2xl md:text-4xl font-bold text-ink-foreground">
                  Start sending and signing documents faster today.
                </h3>
                <p className="text-sm md:text-base text-ink-muted leading-relaxed">
                  Join modern organizations using SignAny 2.0 to automate signatures, eliminate paperwork delays, and maintain bulletproof compliance.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <a
                    href={SITE.appLink}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:-translate-y-px"
                  >
                    SignUp Free <ArrowRight size={16} />
                  </a>
                  <a
                    href="#book-demo"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink-foreground/20 bg-ink-foreground/5 px-7 py-3.5 text-sm font-bold text-ink-foreground transition-colors hover:bg-ink-foreground/10"
                  >
                    Book a Custom Demo
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ProductModeProvider>
  );
}
