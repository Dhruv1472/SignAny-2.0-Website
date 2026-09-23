import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SalesforceHome } from "@/components/site/SalesforceHome";
import { ComplianceSection, PricingSection, FAQSection, BlogSection, DemoCTA } from "@/components/site/Sections";
import { faqs, plans } from "@/lib/site-data";

const title = "SignAny for Salesforce | Native eSignature App for Salesforce CRM";
const description =
  "Send, sign and track documents without leaving Salesforce. SignAny's native AppExchange package brings eSignatures, multi-step approvals, audit trails, and global compliance directly into your Salesforce org.";

export const Route = createFileRoute("/salesforce")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "Salesforce eSignature, Salesforce digital signature, AppExchange eSign, Salesforce signing app, native Salesforce document signing, Salesforce CRM esign",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/salesforce" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/salesforce" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "SignAny for Salesforce",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Salesforce",
          description,
          offers: plans.map((p) => ({
            "@type": "Offer",
            name: p.name,
            price: p.name === "Free" ? "0" : p.name === "Pro" ? "35" : undefined,
            priceCurrency: "USD",
            description: p.tagline,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: SalesforceRoute,
});

function SalesforceRoute() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SalesforceHome />
        <ComplianceSection mode="salesforce" />
        <PricingSection mode="salesforce" />
        <BlogSection />
        <FAQSection />
        <DemoCTA />
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
  );
}
