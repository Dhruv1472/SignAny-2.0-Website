import type { ReactNode } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductModeProvider } from "@/lib/product-mode";

export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <ProductModeProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <section className="mesh-bg relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-16">
            <div className="glow-orb top-4 right-[10%] h-64 w-64 bg-primary" />
            <div className="section-shell relative z-10 max-w-3xl">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Legal
              </p>
              <h1 className="mt-3 text-4xl font-bold text-balance md:text-5xl">{title}</h1>
              <p className="mt-4 text-sm text-muted-foreground">Last updated: {updated}</p>
              <p className="mt-5 text-base leading-relaxed text-pretty text-muted-foreground">
                {intro}
              </p>
            </div>
          </section>

          <section className="pb-20 md:pb-28">
            <div className="section-shell max-w-3xl space-y-8">{children}</div>
          </section>
        </main>
        <Footer />
      </div>
    </ProductModeProvider>
  );
}

export function LegalBlock({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <article className="card-soft p-7 md:p-8">
      <h2 className="text-xl font-semibold text-foreground">{heading}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </article>
  );
}
