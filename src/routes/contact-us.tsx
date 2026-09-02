import { useState, useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Clock,
  Mail,
  Phone,
  ArrowRight,
  Lock,
  Globe,
  Check,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { ProductModeProvider } from "@/lib/product-mode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sendDemoRequest } from "@/lib/emailService";

declare global {
  interface Window {
    grecaptcha: {
      render: (container: HTMLElement, params: object) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
  }
}

const countries = [
  { name: "Argentina", code: "AR" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Bangladesh", code: "BD" },
  { name: "Belgium", code: "BE" },
  { name: "Brazil", code: "BR" },
  { name: "Canada", code: "CA" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Colombia", code: "CO" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Egypt", code: "EG" },
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "Greece", code: "GR" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungary", code: "HU" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Ireland", code: "IE" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Japan", code: "JP" },
  { name: "Kenya", code: "KE" },
  { name: "Malaysia", code: "MY" },
  { name: "Mexico", code: "MX" },
  { name: "Netherlands", code: "NL" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nigeria", code: "NG" },
  { name: "Norway", code: "NO" },
  { name: "Pakistan", code: "PK" },
  { name: "Philippines", code: "PH" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Romania", code: "RO" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Singapore", code: "SG" },
  { name: "South Africa", code: "ZA" },
  { name: "South Korea", code: "KR" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Taiwan", code: "TW" },
  { name: "Thailand", code: "TH" },
  { name: "Turkey", code: "TR" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "Vietnam", code: "VN" },
];

const initialForm = {
  first_name: "",
  last_name: "",
  email: "",
  company: "",
  country_code: "",
  phone: "",
  message: "",
};

const SALESFORCE_ORG_ID = "00D5g000007qhe9";
const SALESFORCE_RECAPTCHA_SITE_KEY = "6LfTFIksAAAAAPiO8BeHTgZSDMNCaIxnW5ZmbA0L";

const getCaptchaSettingsValue = () =>
  JSON.stringify({
    keyname: "EstateXpert_New",
    fallback: "true",
    orgId: SALESFORCE_ORG_ID,
    ts: String(Date.now()),
  });

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact Us & Book a Demo — SignAny 2.0" },
      {
        name: "description",
        content:
          "Schedule a personalized live demo of SignAny 2.0 or reach out to our team to discuss your document generation and eSignature workflow requirements.",
      },
    ],
  }),
  component: ContactUsPage,
});

function ContactUsPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; phone?: string }>({});
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [captchaSettings, setCaptchaSettings] = useState(getCaptchaSettingsValue());
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const recaptchaWidgetId = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get("email");
    if (emailParam) {
      setForm((prev) => ({ ...prev, email: emailParam }));
    }
  }, []);

  useEffect(() => {
    if (!window.grecaptcha && !document.getElementById("recaptcha-api-script")) {
      const script = document.createElement("script");
      script.id = "recaptcha-api-script";
      script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    const timestampInterval = setInterval(() => {
      const response = document.getElementById("g-recaptcha-response") as HTMLTextAreaElement | null;
      if (!response || response.value.trim() === "") {
        setCaptchaSettings(getCaptchaSettingsValue());
      }
    }, 500);

    const tryRender = () => {
      if (recaptchaRef.current && window.grecaptcha?.render && recaptchaWidgetId.current === null) {
        recaptchaRef.current.innerHTML = "";
        recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: SALESFORCE_RECAPTCHA_SITE_KEY,
          callback: (token: string) => setRecaptchaToken(token),
          "expired-callback": () => setRecaptchaToken(""),
        });
      }
    };

    const delay = setTimeout(() => {
      if (window.grecaptcha?.render) {
        tryRender();
      } else {
        const interval = setInterval(() => {
          if (window.grecaptcha?.render) {
            tryRender();
            clearInterval(interval);
          }
        }, 200);
        return () => clearInterval(interval);
      }
    }, 200);

    return () => {
      clearTimeout(delay);
      clearInterval(timestampInterval);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setFieldErrors((prev) => ({
        ...prev,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? undefined
          : "Enter a valid email address",
      }));
    }
    if (name === "phone" && value) {
      setFieldErrors((prev) => ({
        ...prev,
        phone: /^[+]?[\d\s\-().]{7,15}$/.test(value)
          ? undefined
          : "Enter a valid phone number",
      }));
    } else if (name === "phone" && !value) {
      setFieldErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleSelect = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const phoneValid = !form.phone || /^[+]?[\d\s\-().]{7,15}$/.test(form.phone);
    if (!emailValid || !phoneValid) {
      setFieldErrors({
        email: emailValid ? undefined : "Enter a valid email address",
        phone: phoneValid ? undefined : "Enter a valid phone number",
      });
      return;
    }
    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA verification below.");
      return;
    }

    setLoading(true);

    try {
      const iframeId = "salesforce_submit_iframe";
      let iframe = document.getElementById(iframeId) as HTMLIFrameElement;
      if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.id = iframeId;
        iframe.name = iframeId;
        iframe.style.display = "none";
        document.body.appendChild(iframe);
      }

      const formSub = document.createElement("form");
      formSub.method = "POST";
      formSub.action = `https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=${SALESFORCE_ORG_ID}`;
      formSub.target = iframeId;

      const data: Record<string, string> = {
        captcha_settings: captchaSettings,
        oid: SALESFORCE_ORG_ID,
        retURL: "http://login.salesforce.com",
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        company: form.company,
        country_code: form.country_code,
        phone: form.phone,
        description: form.message,
        lead_source: "SignAny Website",
        "g-recaptcha-response": recaptchaToken,
      };

      Object.entries(data).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        formSub.appendChild(input);
      });

      document.body.appendChild(formSub);
      formSub.submit();

      setTimeout(() => {
        if (document.body.contains(formSub)) {
          document.body.removeChild(formSub);
        }
      }, 1000);

      const countryName =
      countries.find((c) => c.code === form.country_code)?.name || form.country_code;
      await sendDemoRequest({
        firstName: form.first_name,
        lastName: form.last_name,
        email: form.email,
        company: form.company,
        country: countryName,
        phone: form.phone,
        message: form.message,
      });

      setLoading(false);
      setSubmitted(true);
    } catch {
      setLoading(false);
      setError("Something went wrong. Please try again or email us directly at info@esignany.com.");
    }
  };

  return (
    <ProductModeProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-primary-foreground">
        <Header />

        <main className="flex-1 pt-24 pb-14">
          {/* Page Hero Header */}
          <section className="relative overflow-hidden mb-12">
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl rounded-full" />
            </div>

            <div className="section-shell text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4"
              >
                <Sparkles size={14} />
                Contact Us & Book a Demo
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
              >
                Let’s Automate Your <span className="text-primary">Document Workflows</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground text-base md:text-lg leading-relaxed"
              >
                Schedule a personalized demo of SignAny 2.0 or reach out to our global team to discuss your custom enterprise requirements.
              </motion.p>
            </div>
          </section>

          {/* Main 2-Column Section */}
          <div className="section-shell">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start max-w-6xl mx-auto">
              
              {/* LEFT SIDE: Why Choose Us & FAQs Quick Link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-5 space-y-6"
              >
                {/* Why SignAny 2.0 Card */}
                <div className="bg-card border border-border/70 rounded-2xl p-6 md:p-7 shadow-sm space-y-5">
                  <div className="flex items-center gap-2.5 text-primary font-bold text-sm">
                    <ShieldCheck size={18} />
                    <span>Why SignAny 2.0?</span>
                  </div>

                  <ul className="space-y-4 text-xs sm:text-sm">
                    <li className="flex items-start gap-2.5">
                      <Check className="size-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-foreground">100% Salesforce Native</span>
                        <span className="text-muted-foreground text-xs">Trigger document generation & eSign directly from any object.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="size-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-foreground">Cryptographic Audit Trail</span>
                        <span className="text-muted-foreground text-xs">SHA-256 document hashing for tamper-proof legality.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="size-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-foreground">Global E-Sign Compliance</span>
                        <span className="text-muted-foreground text-xs">ESIGN, UETA, eIDAS Level 2 AES, GLBA compliant.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="size-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-foreground">Zero Code Setup</span>
                        <span className="text-muted-foreground text-xs">Drag-and-drop template builder with live preview.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* FAQ Quick Link */}
                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
                  <h4 className="font-bold text-sm text-foreground">Have quick questions first?</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">Check out our frequently asked questions for instant answers about features, pricing, and compliance.</p>
                  <Link
                    to="/faqs"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline pt-1"
                  >
                    View FAQs <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>

              {/* RIGHT SIDE: The Demo Request & Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 bg-card border border-border rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden"
              >
                {/* Top Ambient Highlight */}
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary via-brand to-primary" />

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Demo Request Received!</h3>
                    <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
                      Thank you for reaching out. Our solution team has received your request and will contact you within 24 hours to schedule your personalized live demo.
                    </p>
                    <div className="pt-4 flex flex-wrap justify-center gap-3">
                      <Button onClick={() => setSubmitted(false)} variant="outline">
                        Submit Another Request
                      </Button>
                      <Button asChild>
                        <Link to="/">Back to Home</Link>
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                        Book a Live Demo
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Fill in your details below and our team will get in touch with you shortly.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="first_name" className="text-xs font-semibold">
                          First Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="first_name"
                          name="first_name"
                          placeholder="John"
                          value={form.first_name}
                          onChange={handleChange}
                          required
                          className="h-10 text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="last_name" className="text-xs font-semibold">
                          Last Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="last_name"
                          name="last_name"
                          placeholder="Doe"
                          value={form.last_name}
                          onChange={handleChange}
                          required
                          className="h-10 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-semibold">
                          Work Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@company.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className={`h-10 text-sm ${fieldErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                        {fieldErrors.email && (
                          <p className="text-[11px] text-destructive">{fieldErrors.email}</p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="company" className="text-xs font-semibold">
                          Company Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Acme Corp"
                          value={form.company}
                          onChange={handleChange}
                          required
                          className="h-10 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="country" className="text-xs font-semibold">
                          Country <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={form.country_code}
                          onValueChange={(val) => handleSelect("country_code", val)}
                        >
                          <SelectTrigger id="country" className="h-10 text-sm">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent className="max-h-56">
                            {countries.map((c) => (
                              <SelectItem key={c.code} value={c.code}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-xs font-semibold">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={form.phone}
                          onChange={handleChange}
                          className={`h-10 text-sm ${fieldErrors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                        {fieldErrors.phone && (
                          <p className="text-[11px] text-destructive">{fieldErrors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-xs font-semibold">
                        Tell us about your requirements
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="How many documents or signers do you process monthly? Any Salesforce integration needs?"
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        className="text-sm resize-none"
                      />
                    </div>

                    {/* Google reCAPTCHA Container */}
                    <div className="pt-0">
                      <div ref={recaptchaRef} className="flex min-h-[78px]" />
                    </div>

                    {error && <p className="text-xs text-destructive">{error}</p>}

                    <Button
                      type="submit"
                      disabled={
                        loading ||
                        !form.first_name ||
                        !form.last_name ||
                        !form.email ||
                        !form.company ||
                        !form.country_code ||
                        !!fieldErrors.email ||
                        !!fieldErrors.phone ||
                        !recaptchaToken
                      }
                      className="w-full h-11 text-sm font-semibold"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin mr-2" />
                          Submitting Request...
                        </>
                      ) : (
                        "Submit Demo Request"
                      )}
                    </Button>
                  </form>
                )}
              </motion.div>

            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ProductModeProvider>
  );
}
