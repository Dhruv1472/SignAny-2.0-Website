import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HelpCircle, Search, ArrowUp, ShieldCheck, CreditCard, Wrench, MessageCircle, Sparkles } from "lucide-react";
import { Header } from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { ProductModeProvider } from "@/lib/product-mode";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const categories = [
  {
    id: "general",
    title: "General",
    icon: HelpCircle,
    questions: [
      { q: "What is SignAny 2.0?", a: "SignAny 2.0 is a next-generation digital signature platform designed for speed, security, and seamless integration. It allows individuals and teams to sign, send, and manage legally binding documents with ease." },
      { q: "Is SignAny 2.0 free to use?", a: "Yes, we offer a free Starter plan for individuals. For teams requiring advanced features like custom branding, custom fields, and Salesforce integration, we offer Pro and Enterprise plans." },
      { q: "How many documents can I sign?", a: "The number of documents depends on your plan. The Starter plan includes 5 signatures per month, while Pro and Enterprise plans offer expanded and unlimited volume." },
    ],
  },
  {
    id: "security",
    title: "Security & Legal Compliance",
    icon: ShieldCheck,
    questions: [
      { q: "How secure is SignAny 2.0?", a: "We use 256-bit AES encryption for all data at rest and TLS 1.3 for data in transit. SignAny 2.0 is fully compliant with ESIGN Act, UETA, GLBA, and eIDAS (AES)." },
      { q: "Are signatures created with SignAny legally binding?", a: "Yes. Digital signatures created with SignAny 2.0 meet the strict legal standards of the ESIGN Act, UETA, eIDAS (AES), Singapore ETA, AU Electronic Transactions Act 1999, UK ECA 2000, and UAE Federal Law No. 46." },
      { q: "Where is my data stored?", a: "All document records and audit logs are stored in highly secure, geographically redundant data centers with 24/7 monitoring and tamper-evident SHA-256 logs." },
    ],
  },
  {
    id: "billing",
    title: "Billing & Plans",
    icon: CreditCard,
    questions: [
      { q: "Can I cancel my subscription anytime?", a: "Absolutely. You can upgrade, downgrade, or cancel your subscription at any time from your account settings with zero hidden penalty fees." },
      { q: "Do you offer custom pricing for enterprises?", a: "Yes! We offer bespoke Enterprise packages tailored to high-volume signing teams, custom security policies, and dedicated SLA support." },
    ],
  },
  {
    id: "technical",
    title: "Technical & Salesforce",
    icon: Wrench,
    questions: [
      { q: "Does SignAny 2.0 offer a Salesforce Native App?", a: "Yes! SignAny 2.0 includes a dedicated Salesforce App Exchange package that lets you trigger Send for Signature actions directly from any Opportunity, Contact, or custom Salesforce object." },
      { q: "Does SignAny 2.0 have a REST API?", a: "Yes, our developer-friendly REST API allows you to embed signature workflows directly into your own web applications, client portals, or backend pipelines." },
      { q: "Which web browsers are supported?", a: "We support all modern browsers including Chrome, Firefox, Safari, and Microsoft Edge across desktop, tablet, and mobile devices." },
    ],
  },
];

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

  const filteredCategories = categories
    .map((category) => {
      const matchingQuestions = category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...category, questions: matchingQuestions };
    })
    .filter((category) => category.questions.length > 0);

  return (
    <ProductModeProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <Header />

        <main className="flex-1 pt-32 pb-20">
          <div className="section-shell">
            {/* Header Section */}
            <div className="mx-auto max-w-4xl text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                <HelpCircle size={14} /> Help Center & FAQs
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground text-balance">
                Frequently Asked Questions
              </h1>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                Find quick answers to common questions about SignAny 2.0. Can't find what you're looking for? Our support team is here to help.
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

            {/* 2-Column Layout */}
            <div className="grid lg:grid-cols-[1fr_340px] gap-12 items-start max-w-6xl mx-auto">
              <div className="space-y-12">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => {
                    const CategoryIcon = category.icon;
                    return (
                      <section key={category.id} className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                            <CategoryIcon size={20} />
                          </div>
                          <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                        </div>

                        <Accordion type="single" collapsible className="space-y-3">
                          {category.questions.map((faq, idx) => (
                            <AccordionItem
                              key={idx}
                              value={`${category.id}-${idx}`}
                              className="rounded-2xl border border-border/80 bg-card px-6 shadow-sm transition-shadow hover:shadow-md"
                            >
                              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4 text-base hover:text-primary transition-colors">
                                {faq.q}
                              </AccordionTrigger>
                              <AccordionContent className="text-sm md:text-base leading-relaxed text-muted-foreground pb-5">
                                {faq.a}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </section>
                    );
                  })
                ) : (
                  <div className="text-center py-16 border border-dashed border-border rounded-3xl">
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
              </div>

              {/* Sidebar Cards */}
              <aside className="sticky top-32 space-y-6">
                <div className="rounded-3xl border border-border/80 bg-card p-8 shadow-sm">
                  <MessageCircle size={32} className="text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Still have questions?</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    If you couldn't find an answer in our FAQs, you can contact our support team or book a 1-on-1 walkthrough.
                  </p>
                  <a
                    href="/#book-demo"
                    className="block text-center w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 shadow-sm transition-all"
                  >
                    Contact Us
                  </a>
                </div>

                <div className="p-6 rounded-3xl bg-muted/40 border border-border/70">
                  <h4 className="font-bold text-foreground mb-3 text-sm">Popular Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Security", "Salesforce API", "Pricing", "Audit Trail", "UAE PASS"].map((topic) => (
                      <button
                        key={topic}
                        onClick={() => setSearchQuery(topic)}
                        className="px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>
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
