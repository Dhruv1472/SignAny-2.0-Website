import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HelpCircle, Search, ArrowUp, ArrowLeft, Sparkles } from "lucide-react";
import { Header } from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { ProductModeProvider } from "@/lib/product-mode";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/site-data";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — SignAny 2.0" },
      {
        name: "description",
        content:
          "Find detailed answers to common questions about SignAny 2.0 plans, pricing, security, compliance, Salesforce integration, and API access.",
      },
    ],
  }),
  component: FaqsPage,
});

function FaqsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProductModeProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <Header />

        <main className="flex-1 pt-28 pb-20">
          <div className="section-shell">
            {/* Header Section */}
            <div className="mx-auto max-w-3xl text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                <HelpCircle size={14} /> Help & Support
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
                Frequently Asked Questions
              </h1>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                Everything you need to know about SignAny 2.0 features, plans, compliance, security, and Salesforce integration.
              </p>

              {/* Search Bar */}
              <div className="relative mt-8 max-w-xl mx-auto">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Search questions (e.g. plans, security, Salesforce, API)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-card pl-11 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Accordion FAQ List */}
            <div className="mx-auto max-w-3xl">
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFaqs.map((f, i) => (
                    <AccordionItem
                      key={f.q}
                      value={`faq-${i}`}
                      className="rounded-2xl border border-border bg-card px-6 py-1 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-foreground hover:no-underline py-4">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm md:text-base leading-relaxed text-muted-foreground pb-5">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-12 border border-dashed border-border rounded-2xl">
                  <p className="text-base text-muted-foreground">
                    No matching questions found for "{searchQuery}".
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-3 text-sm font-semibold text-primary hover:underline"
                  >
                    Clear search filter
                  </button>
                </div>
              )}

              {/* Contact Support CTA Box */}
              <div className="mt-16 surface-ink rounded-3xl p-8 md:p-10 text-center relative overflow-hidden shadow-xl">
                <div className="glow-orb -top-10 right-10 h-48 w-48 bg-primary" />
                <div className="relative z-10 max-w-lg mx-auto">
                  <Sparkles size={28} className="mx-auto text-primary mb-3" />
                  <h3 className="text-xl md:text-2xl font-bold text-ink-foreground">
                    Have more questions?
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                    Our team is here to help you get started with SignAny 2.0 or map out a custom enterprise deployment.
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                    <a
                      href="#book-demo"
                      className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-px"
                    >
                      Book a Demo
                    </a>
                    <a
                      href="mailto:info@esignany.com"
                      className="inline-flex items-center justify-center rounded-xl border border-ink-foreground/20 px-6 py-3 text-sm font-semibold text-ink-foreground transition-colors hover:bg-ink-foreground/10"
                    >
                      Contact Support
                    </a>
                  </div>
                </div>
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
    </ProductModeProvider>
  );
}

export default FaqsPage;
