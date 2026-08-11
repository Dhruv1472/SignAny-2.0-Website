import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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

interface BookDemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

const BookDemoModal = ({ open, onOpenChange, initialEmail }: BookDemoModalProps) => {
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
    if (open) {
      const urlParams = new URLSearchParams(window.location.search);
      const emailParam = urlParams.get("email") || initialEmail;
      if (emailParam) {
        setForm((prev) => ({ ...prev, email: emailParam }));
      }
    }
  }, [open, initialEmail]);

  useEffect(() => {
    if (!open) return;

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
        // Clear any stale content left from a previous render
        recaptchaRef.current.innerHTML = "";
        recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: SALESFORCE_RECAPTCHA_SITE_KEY,
          callback: (token: string) => setRecaptchaToken(token),
          "expired-callback": () => setRecaptchaToken(""),
        });
      }
    };
    // Wait for dialog portal animation to settle before rendering
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
    }, 150);
    return () => {
      clearTimeout(delay);
      clearInterval(timestampInterval);
    };
  }, [open]);

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

    // Final validation before submit
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
      setError("Please complete the reCAPTCHA verification.");
      return;
    }

    setLoading(true);

    try {
      // Create a hidden iframe for submission
      const iframeId = "salesforce_submit_iframe";
      let iframe = document.getElementById(iframeId) as HTMLIFrameElement;
      if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.id = iframeId;
        iframe.name = iframeId;
        iframe.style.display = "none";
        document.body.appendChild(iframe);
      }

      // Create a hidden form for submission
      const formSub = document.createElement("form");
      formSub.method = "POST";
      formSub.action = `https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=${SALESFORCE_ORG_ID}`;
      formSub.target = iframeId;



      // Map our fields to Salesforce standard fields
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

      // Add all fields to the form
      Object.entries(data).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        formSub.appendChild(input);
      });

      // Submit the form
      document.body.appendChild(formSub);
      formSub.submit();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(formSub);
      }, 1000);

      // Also send our internal email notification
      const countryName = countries.find(c => c.code === form.country_code)?.name || form.country_code;
      await sendDemoRequest({
        firstName: form.first_name,
        lastName: form.last_name,
        email: form.email,
        company: form.company,
        country: countryName,
        phone: form.phone,
        message: form.message
      });

      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Please try again or contact us directly.");
    }
  };

  const handleClose = (val: boolean) => {
    if (!val) {
      // Reset state when closing
      setTimeout(() => {
        setSubmitted(false);
        setError("");
        setFieldErrors({});
        setForm(initialForm);
        setRecaptchaToken("");
        setCaptchaSettings(getCaptchaSettingsValue());
        if (recaptchaWidgetId.current !== null) {
          window.grecaptcha?.reset(recaptchaWidgetId.current);
          recaptchaWidgetId.current = null;
        }
      }, 500);
    }
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="w-[672px] max-w-[calc(100vw-2rem)] max-h-[90vh] flex flex-col fixed bottom-4 right-4 left-auto top-auto translate-x-0 translate-y-0 border-0 p-0 rounded-2xl overflow-hidden shadow-2xl duration-300 ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:slide-in-from-bottom-10 data-[state=open]:slide-in-from-right-10 data-[state=closed]:slide-out-to-bottom-10 data-[state=closed]:slide-out-to-right-10 [&>button]:text-white [&>button]:opacity-80 [&>button]:rounded-full [&>button]:w-8 [&>button]:h-8 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:bg-white/10 [&>button]:backdrop-blur-sm [&>button]:transition-all [&>button]:duration-200 [&>button:hover]:opacity-100 [&>button:hover]:bg-white/25 [&>button:hover]:scale-110 [&>button:hover]:rotate-90"
      >
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 gap-4 text-center"
          >
            <CheckCircle2 size={56} className="text-primary" />
            <DialogTitle className="text-2xl font-heading font-bold">
              Request Received!
            </DialogTitle>
            <p className="text-muted-foreground max-w-sm">
              Thank you for your interest in SignAny 2.0. Our team will reach
              out to you soon.
            </p>
            <Button className="mt-4" onClick={() => handleClose(false)}>
              Close
            </Button>
          </motion.div>
        ) : (
          <div className="flex flex-col flex-1 min-h-0">
            {/* Sticky Header */}
            <DialogHeader className="shrink-0 mb-0 p-6 pb-4 surface-ink rounded-t-2xl">
              <DialogTitle className="text-2xl font-display font-bold text-ink-foreground">
                Book a Demo
              </DialogTitle>
              <DialogDescription className="text-ink-muted">
                Fill in your details and our team will get in touch to schedule a personalised SignAny 2.0 demo.
              </DialogDescription>
            </DialogHeader>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 overflow-y-auto space-y-4 p-6">
              {/* Salesforce Hidden Fields (Standard Fields) */}
              <input type="hidden" name="captcha_settings" value={captchaSettings} />
              <input type="hidden" name="oid" value={SALESFORCE_ORG_ID} />
              <input type="hidden" name="retURL" value="http://login.salesforce.com" />
              {/* <input type="hidden" name="debug" value="1" />
              <input type="hidden" name="debugEmail" value="dhruv.k@mvclouds.com" /> */}

              {/* Name row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="first_name">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    placeholder="Jane"
                    value={form.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="last_name">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    placeholder="Smith"
                    value={form.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">
                    Work Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={fieldErrors.email ? "border-destructive" : ""}
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-destructive">{fieldErrors.email}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="company">
                    Company Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Acme Realty"
                    value={form.company}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>



              {/* Country & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="country_code">
                    Country <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.country_code}
                    onValueChange={(v) => handleSelect("country_code", v)}
                    required
                  >
                    <SelectTrigger id="country_code">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 555 000 0000"
                    value={form.phone}
                    onChange={handleChange}
                    className={fieldErrors.phone ? "border-destructive" : ""}
                  />
                  {fieldErrors.phone && (
                    <p className="text-xs text-destructive">{fieldErrors.phone}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label htmlFor="message">Additional Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your requirements..."
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {/* reCAPTCHA */}
              <div ref={recaptchaRef} />

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              </div>

              {/* Sticky Footer Buttons */}
              <div className="shrink-0 flex justify-end gap-3 px-6 py-4 border-t border-border bg-background rounded-b-2xl">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleClose(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading || !form.country_code || !!fieldErrors.email || !!fieldErrors.phone || !recaptchaToken}>
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Sending…
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookDemoModal;
