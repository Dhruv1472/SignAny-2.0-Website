import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SignAnyHome } from "@/components/site/SignAnyHome";
import { SalesforceHome } from "@/components/site/SalesforceHome";
import { ComplianceSection, PricingSection, FAQSection, BlogSection, DemoCTA } from "@/components/site/Sections";
import { ProductModeProvider, useProductMode } from "@/lib/product-mode";
import { faqs, plans } from "@/lib/site-data";

const title = "SignAny 2.0 | Secure eSignature Software for Teams & Salesforce";
const description =
  "Send, sign and track legally binding documents with SignAny 2.0. Smart fields, 5 signers, audit trails, REST API, Salesforce app and 15+ compliance frameworks. Free plan available.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "electronic signature software, eSignature, digital signature, Salesforce eSignature app, esign API, UAE PASS signature, document signing platform",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "SignAny 2.0",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web, Salesforce",
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
  component: HomeRoute,
});

function HomeRoute() {
  return (
    <ProductModeProvider>
      <HomeContent />
    </ProductModeProvider>
  );
}

import { ProductCarousel } from "@/components/site/ProductCarousel";

function HomeContent() {
  const { isSalesforce } = useProductMode();
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
        {isSalesforce ? <SalesforceHome /> : <SignAnyHome />}
        <ComplianceSection />
        <PricingSection />
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
