import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/signany-logo.png";
import { useProductMode } from "@/lib/product-mode";
import { SITE } from "@/lib/site-data";
import { Switch } from "@/components/ui/switch";

const signanyNav = [
  { name: "Features", href: "/#features" },
  { name: "Workspace", href: "/#workspace" },
  { name: "Permissions", href: "/#permissions" },
  { name: "API", href: "/#api" },
  { name: "Compliance", href: "/#compliance" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Blogs", href: "/#blog" },
  { name: "FAQs", href: "/faqs" },
];

const salesforceNav = [
  { name: "Overview", href: "/#sf-overview" },
  { name: "Capabilities", href: "/#sf-features" },
  // { name: "How it works", href: "/#sf-steps" },
  { name: "Compliance", href: "/#compliance" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Blogs", href: "/#blog" },
  { name: "FAQs", href: "/faqs" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isSalesforce, setMode } = useProductMode();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const buttonLabel = isSalesforce ? "Start Free Trial" : "SignUp";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const nav = isSalesforce ? salesforceNav : signanyNav;
  const signUpLink = isSalesforce? SITE.salesforcePackageLink : SITE.appLink;
  const isSubPage = pathname.startsWith("/blog") || pathname.startsWith("/blogs") || pathname.startsWith("/faqs") || pathname.startsWith("/lifecycle") || pathname.startsWith("/verify") || pathname.startsWith("/privacy") || pathname.startsWith("/terms");

  const handleToggle = (checked: boolean) => {
    setMode(checked ? "salesforce" : "signany");
    if (pathname !== "/") navigate({ to: "/" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ModeSwitch = ({ id, className = "" }: { id: string; className?: string }) => (
    <div className={`flex items-center gap-2.5 rounded-full border border-border bg-muted/60 px-3.5 py-2 ${className}`}>
      <label
        htmlFor={id}
        className="cursor-pointer text-xs font-semibold tracking-tight text-muted-foreground"
      >
        Salesforce App
      </label>
      <Switch
        id={id}
        checked={isSalesforce}
        onCheckedChange={handleToggle}
        aria-label="Switch between SignAny 2.0 and the native Salesforce app"
      />
    </div>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled || isSubPage ? "border-b border-border bg-card/95 shadow-sm text-foreground" : "bg-background/60"
      }`}
    >
      <div className="section-shell flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to="/" className="shrink-0" aria-label={`${SITE.name} home`}>
          <img src={logo} alt="SignAny 2.0 logo" className="h-10 w-auto md:h-9" />
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {nav.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ModeSwitch id="mode-desktop" />
          <a
            href="#book-demo"
            className="inline-flex items-center rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Book Demo
          </a>
          <a
            href={signUpLink}
            target="_blank"
            className="inline-flex items-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-px hover:shadow-lg active:scale-[0.98]"
          >
            {buttonLabel}
          </a>
        </div>

        <button
          className="p-2 text-foreground lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="section-shell flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-muted-foreground"
              >
                {item.name}
              </a>
            ))}
            <div className="py-3">
              <ModeSwitch id="mode-mobile" className="w-full justify-between px-4 py-2.5" />
            </div>
            <a
              href="#book-demo"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold"
            >
              Book Demo
            </a>
            <a
              href={SITE.appLink}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              {buttonLabel}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
