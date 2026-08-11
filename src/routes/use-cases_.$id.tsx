import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Users,
  Scale,
  Building2,
  Landmark,
  Briefcase,
  HelpCircle,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Sparkles,
  Clock,
  Lock,
  Zap,
  ArrowRight,
  ArrowLeft,
  Check,
  FileCheck,
  RefreshCw,
  Share2,
  ChevronRight,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { ProductModeProvider } from "@/lib/product-mode";
import { signanyIndustries, IndustryUseCase, UseCaseStep } from "@/lib/industries-data";
import { SITE } from "@/lib/site-data";

const iconMap: Record<string, React.ElementType> = {
  Stethoscope,
  Users,
  Scale,
  Building2,
  Landmark,
  Briefcase,
};

export const Route = createFileRoute("/use-cases_/$id")({
  head: ({ params }) => {
    const ind = signanyIndustries.find((i) => i.id === params.id) || signanyIndustries[0];
    return {
      meta: [
        { title: `${ind.name} Use Case & Solutions — SignAny 2.0` },
        {
          name: "description",
          content: `${ind.description} Discover how SignAny 2.0 solves ${ind.name} document bottlenecks with smart fields, multi-signer routing, and SHA-256 hash proof.`,
        },
      ],
    };
  },
  component: IndustryDetailPage,
});

function IndustryDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const selectedIndustry =
    signanyIndustries.find((i) => i.id === id) || signanyIndustries[0];

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
                <span className="text-foreground">Use Cases</span>
                <ChevronRight size={14} />
                <span className="text-primary font-bold">{selectedIndustry.name}</span>
              </nav>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3 max-w-3xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold text-primary shadow-sm">
                    <Sparkles size={14} />
                    SignAny 2.0 Industry Solution
                  </span>
                  <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                    {selectedIndustry.name}
                  </h1>
                  <p className="text-lg font-medium text-muted-foreground">
                    {selectedIndustry.tagline}
                  </p>
                </div>

                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground bg-card border border-border px-4 py-2.5 rounded-xl transition-all self-start md:self-auto"
                >
                  <ArrowLeft size={16} /> Back to Home
                </Link>
              </div>

              {/* Industry Switcher Tabs */}
              <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {signanyIndustries.map((ind) => {
                  const TabIcon = iconMap[ind.iconName] || Briefcase;
                  const isSelected = ind.id === selectedIndustry.id;

                  return (
                    <button
                      key={ind.id}
                      onClick={() => navigate({ to: "/use-cases/$id", params: { id: ind.id } })}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <TabIcon size={16} />
                      {ind.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Main Detail Content */}
          <section className="section-shell mt-12 space-y-12">
            {/* Core Question & Real-World Bottleneck */}
            <div className="card-soft overflow-hidden p-6 md:p-10 relative bg-gradient-to-br from-card via-card to-accent/30 border-primary/20 shadow-md">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="space-y-4 lg:max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-wider">
                    <HelpCircle size={14} />
                    Core Industry Question
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
                    "{selectedIndustry.question}"
                  </h2>
                  <div className="rounded-2xl border border-border/80 bg-background/80 p-5 mt-4">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1.5">
                      Real-World Scenario & Bottleneck:
                    </p>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {selectedIndustry.scenario}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 lg:w-80 flex flex-col justify-center rounded-2xl bg-card border border-border p-6 shadow-sm">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Solution Overview
                  </p>
                  <p className="text-lg font-bold text-foreground mt-1">
                    {selectedIndustry.solutionTitle}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedIndustry.featuresList.map((feat) => (
                      <span
                        key={feat}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-accent text-xs font-semibold text-accent-foreground border border-border/60"
                      >
                        <Check size={14} className="text-primary" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step-by-Step Resolution Flow */}
            <div className="space-y-8">
              <div className="border-b border-border pb-4">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  How SignAny 2.0 Solves The Problem Step-By-Step
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Complete 4-step workflow resolution for {selectedIndustry.name}
                </p>
              </div>

              {/* All Steps Rendered Line-by-Line with Clean Text & Structured Data */}
              <div className="space-y-6">
                {selectedIndustry.steps.map((step) => (
                  <motion.div
                    key={step.stepNumber}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="card-soft p-6 md:p-8 space-y-5 border-border/80"
                  >
                    {/* Step Title & Feature Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
                      <h4 className="text-xl md:text-2xl font-bold text-foreground">
                        {step.stepNumber}. {step.title}
                      </h4>
                      <span className="shrink-0 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold border border-border">
                        Feature Used: {step.featureUsed}
                      </span>
                    </div>

                    {/* Workflow Raw Text */}
                    <div className="space-y-1.5">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Workflow:
                      </p>
                      <p className="text-sm md:text-base leading-relaxed text-foreground/90 font-normal">
                        {step.workflow}
                      </p>
                    </div>

                    {/* Key Impact & Benefit */}
                    <div className="rounded-xl bg-accent/40 border border-primary/20 p-4">
                      <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                        Key Impact:
                      </p>
                      <p className="text-sm font-medium text-foreground leading-snug">
                        {step.keyBenefit}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Call-To-Action Banner */}
            <div className="surface-ink relative overflow-hidden rounded-2xl p-8 md:p-12 mt-16">
              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-ink-foreground/10 px-3.5 py-1 text-xs font-bold text-ink-foreground">
                  Ready to transform your {selectedIndustry.name} agreements?
                </span>
                <h3 className="text-2xl md:text-4xl font-bold text-ink-foreground">
                  Start signing documents with speed and proof today.
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



