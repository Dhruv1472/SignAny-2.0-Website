import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SalesforceHome } from "@/components/site/SalesforceHome";
import { ComplianceSection, PricingSection, FAQSection, BlogSection, DemoCTA } from "@/components/site/Sections";
import { salesforceFaqs, plans } from "@/lib/site-data";

const title = "Salesforce Digital Signature | Sign Documents in Salesforce";
const description =
  "Sign documents directly from Salesforce with SignAny 2.0. Create, send, track, and manage digital signatures while keeping documents and signature activity connected to Salesforce.";

export const Route = createFileRoute("/salesforce")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "Salesforce e-signature, electronic signature requirements, Salesforce Digital Signature",
      },
      { property: "og:title", content: "Salesforce Digital Signature | SignAny 2.0" },
      {
        property: "og:description",
        content:
          "Sign, send, and track documents directly from Salesforce with SignAny 2.0. Manage digital signatures and document activity within your Salesforce workflow.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://esignany.com/salesforce" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Salesforce Digital Signature | SignAny 2.0" },
      {
        name: "twitter:description",
        content:
          "Sign, send, and track documents directly from Salesforce with SignAny 2.0. Manage digital signatures and document activity within your Salesforce workflow.",
      },
    ],
    links: [{ rel: "canonical", href: "https://esignany.com/salesforce" }],
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
          mainEntity: salesforceFaqs.map((f) => ({
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
        {/* <BlogSection /> */}
        <FAQSection mode="salesforce" />
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
