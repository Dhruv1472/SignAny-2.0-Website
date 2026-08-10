import { Link } from "@tanstack/react-router";
import { Mail, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/SignAnyDarkLogo.png";
import { SITE } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="surface-ink relative overflow-hidden">
      <div className="glow-orb -top-24 left-1/4 h-72 w-72 bg-primary" />
      <div className="section-shell relative z-10 py-14 md:py-18">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="inline-flex">
              <img src={logo} alt="SignAny 2.0 logo" className="h-10 w-auto" />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
              SignAny 2.0 is a secure electronic signature platform for preparing, sending, signing
              and tracking legally binding documents — on the web, inside Salesforce, or through our
              REST API.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SignAny 2.0 on LinkedIn"
                className="rounded-lg border border-ink-foreground/15 p-2 text-ink-foreground/80 transition-colors hover:bg-ink-foreground/10"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SignAny 2.0 on Instagram"
                className="rounded-lg border border-ink-foreground/15 p-2 text-ink-foreground/80 transition-colors hover:bg-ink-foreground/10"
              >
                <Instagram size={16} />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 rounded-lg border border-ink-foreground/15 px-3 py-2 text-xs font-medium text-ink-foreground/80 transition-colors hover:bg-ink-foreground/10"
              >
                <Mail size={14} /> {SITE.email}
              </a>
            </div>
          </div>

          <FooterCol
            title="Product"
            links={[
              { label: "Features", href: "/#features" },
              { label: "Workspace", href: "/#workspace" },
              { label: "Permission sets", href: "/#permissions" },
              { label: "API & integrations", href: "/#api" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "Pricing", href: "/#pricing" },
              { label: "Compliance & Acts", href: "/#compliance" },
              { label: "FAQs", href: "/#faqs" },
            ]}
          />

          <div>
            <h3 className="text-sm font-semibold text-ink-foreground">Legal</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted">
              <li>
                <Link to="/privacy-policy" className="transition-colors hover:text-ink-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="transition-colors hover:text-ink-foreground"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-foreground/10 pt-6 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>A product by {SITE.company}.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink-foreground">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm text-ink-muted">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="transition-colors hover:text-ink-foreground">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
