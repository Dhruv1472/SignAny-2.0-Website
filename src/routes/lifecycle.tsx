import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  FileUp,
  LayoutDashboard,
  PenTool,
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowUp,
  Sparkles,
  Play,
  Pause,
  ChevronRight,
  Clock,
  Eye,
  Send,
  CheckCircle2,
  Database,
  FileText,
  Calendar,
  Mail,
  Search,
  Filter,
  MoreVertical,
  FileSpreadsheet,
  MapPin,
  Globe,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { ProductModeProvider } from "@/lib/product-mode";
import { SignaturePath } from "@/components/site/spinner";

export const Route = createFileRoute("/lifecycle")({
  head: () => ({
    meta: [
      { title: "Document Signing Lifecycle | SignAny 2.0" },
      {
        name: "description",
        content:
          "Master the 4-step document signing lifecycle: 1. Upload & field setup, 2. Dashboard status tracking, 3. Recipient signing & field completion, 4. SHA-256 audit report & hashing security.",
      },
    ],
  }),
  component: LifecyclePage,
});

const lifecycleStages = [
  {
    id: "setup",
    stepNum: "01",
    title: "Upload & Field Setup",
    subtitle: "Document Preparation",
    icon: FileUp,
    badge: "10 Smart Field Types",
    color: "text-purple-500 bg-purple-500/10 border-purple-500/30",
    desc: "Upload agreements, place 10 smart field types, and import signers from Salesforce.",
  },
  {
    id: "signing",
    stepNum: "02",
    title: "Recipient Signing",
    subtitle: "Interactive Signature Pad",
    icon: PenTool,
    badge: "Draw, Type & Upload",
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
    desc: "Sign on any device with Draw/Type signature pads and UAE PASS authentication.",
  },
  {
    id: "tracking",
    stepNum: "03",
    title: "Dashboard Tracking",
    subtitle: "Real-Time Monitoring",
    icon: LayoutDashboard,
    badge: "Live Status Feed",
    color: "text-blue-500 bg-blue-500/10 border-blue-500/30",
    desc: "Track real-time document status, manage 90-day expiry, and resend signer links.",
  },
  {
    id: "audit",
    stepNum: "04",
    title: "Audit Report & Hashing",
    subtitle: "SHA-256 Cryptographic Seal",
    icon: ShieldCheck,
    badge: "Tamper-Proof Security",
    color: "text-amber-500 bg-amber-500/10 border-amber-500/30",
    desc: "Generate SHA-256 audit reports with IP logs and court-admissible proof.",
  },
];

function LifecyclePage() {
  const [activeStage, setActiveStage] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Signature Pad state for Stage 3 Demo
  const [padTab, setPadTab] = useState<"draw" | "type" | "upload">("draw");
  const [typedName, setTypedName] = useState("Sarah Chen");
  const [penSize, setPenSize] = useState<"thin" | "medium" | "thick">("medium");

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-next continuous lifecycle cycle (Always ON by default)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 4);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ProductModeProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <Header />

        <main className="flex-1 pt-32 pb-24">
          <div className="section-shell">
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                <HelpCircle size={15} />
                Document Signing Lifecycle
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 text-balance">
                The Complete Document Lifecycle
              </h1>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                Explore the 4 core stages of agreement workflow: from initial document upload and field setup to recipient signing, status tracking, and cryptographic SHA-256 audit sealing.
              </p>
            </div>

            {/* MASTER 4-STAGE PIPELINE GRID */}
            <div className="max-w-6xl mx-auto mb-12 md:mb-16">
              <div className="rounded-[24px] sm:rounded-[32px] border border-border/80 bg-card p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-2 bg-[#9485f2]" />

                {/* 4 Connected Pipeline Cards */}
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 relative mb-6 md:mb-8">
                  {lifecycleStages.map((stage, idx) => {
                    const StageIcon = stage.icon;
                    const isActive = activeStage === idx;

                    return (
                      <div
                        key={stage.id}
                        onClick={() => setActiveStage(idx)}
                        className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-500 cursor-pointer ${
                          isActive
                            ? "border-primary bg-primary/5 shadow-xl ring-2 ring-primary/30 -translate-y-1"
                            : "border-border/70 bg-card/60 hover:bg-card hover:border-primary/40"
                        }`}
                      >
                        {/* Desktop Flow Arrow */}
                        {idx < 3 && (
                          <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-background border border-border items-center justify-center text-muted-foreground shadow-sm">
                            <ChevronRight size={16} className={isActive ? "text-primary font-bold" : ""} />
                          </div>
                        )}

                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-colors ${
                                isActive
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {stage.stepNum}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                              {stage.badge}
                            </span>
                          </div>

                          <h3 className="font-bold text-foreground text-sm sm:text-base mb-1 flex items-center gap-1.5">
                            <StageIcon size={16} className={isActive ? "text-primary" : "text-muted-foreground"} />
                            {stage.title}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {stage.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ACTIVE STAGE DETAILED VISUAL SHOWCASE */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35 }}
                    className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-10 items-center bg-muted/20 p-4 sm:p-6 md:p-8 rounded-2xl border border-border/60"
                  >
                    {/* Visual Graphic Representation (Hidden on mobile) */}
                    <div className="hidden md:block">
                      {activeStage === 0 && <Stage1UploadVisual />}
                      {activeStage === 1 && (
                        <Stage2SigningVisual
                        padTab={padTab}
                        setPadTab={setPadTab}
                        typedName={typedName}
                        setTypedName={setTypedName}
                        penSize={penSize}
                        setPenSize={setPenSize}
                        />
                      )}
                      {activeStage === 2 && <Stage3TrackingVisual />}
                      {activeStage === 3 && <Stage4AuditVisual />}
                    </div>

                    {/* Stage Details & Technical Outline */}
                    <div className="space-y-5">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        <Sparkles size={13} /> Stage {lifecycleStages[activeStage].stepNum} Breakdown
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                        {lifecycleStages[activeStage].title}
                      </h2>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                        {lifecycleStages[activeStage].desc}
                      </p>

                      {/* Technical Features Checklist */}
                      <div className="pt-3 border-t border-border/60 space-y-2.5">
                        {activeStage === 0 && (
                          <>
                            <div className="flex items-center gap-2.5 text-xs md:text-sm text-foreground/90 font-medium">
                              <CheckCircle2 size={16} className="text-primary shrink-0" />
                              Multi-file PDF upload & page reordering controls
                            </div>
                            <div className="flex items-center gap-2.5 text-xs md:text-sm text-foreground/90 font-medium">
                              <CheckCircle2 size={16} className="text-primary shrink-0" />
                              10 Smart Field Types (*Signature, Text, Date, Number, Email, Checkbox, Initials, Fullname, Radio, Dropdown*)
                            </div>
                            <div className="flex items-center gap-2.5 text-xs md:text-sm text-foreground/90 font-medium">
                              <CheckCircle2 size={16} className="text-primary shrink-0" />
                              Import From Salesforce CRM: Auto-fill signers from Opportunity & Account records
                            </div>
                          </>
                        )}

                        {activeStage === 1 && (
                          <>
                            <div className="flex items-center gap-2.5 text-xs md:text-sm text-foreground/90 font-medium">
                              <CheckCircle2 size={16} className="text-primary shrink-0" />
                              Zero App Installation: Recipients review & sign seamlessly on mobile, tablet, or desktop
                            </div>
                            <div className="flex items-center gap-2.5 text-xs md:text-sm text-foreground/90 font-medium">
                              <CheckCircle2 size={16} className="text-primary shrink-0" />
                              Digital Signature Pad: Draw (pen thickness & eraser), Type (font styles), or Upload (PNG/JPG 2MB)
                            </div>
                            <div className="flex items-center gap-2.5 text-xs md:text-sm text-foreground/90 font-medium">
                              <CheckCircle2 size={16} className="text-primary shrink-0" />
                              1-Click Actions: "Fill Empty Signatures" & "Replace Existing Signature" across document
                            </div>
                          </>
                        )}

                        {activeStage === 2 && (
                          <>
                            <div className="flex items-center gap-2.5 text-xs md:text-sm text-foreground/90 font-medium">
                              <CheckCircle2 size={16} className="text-primary shrink-0" />
                              Live Status Table: Track Pending, Reviewing, Completed & Expiring Soon agreements
                            </div>
                            <div className="flex items-center gap-2.5 text-xs md:text-sm text-foreground/90 font-medium">
                              <CheckCircle2 size={16} className="text-primary shrink-0" />
                              Document Activity Log: Real-time email send, email open, and view timestamps
                            </div>
                            <div className="flex items-center gap-2.5 text-xs md:text-sm text-foreground/90 font-medium">
                              <CheckCircle2 size={16} className="text-primary shrink-0" />
                              Quick Actions: Update expiry (up to 90 days), resend email, or copy WhatsApp/SMS signing link
                            </div>
                          </>
                        )}

                        {activeStage === 3 && (
                          <>
                            <div className="flex items-center gap-2.5 text-xs md:text-sm text-foreground/90 font-medium">
                              <CheckCircle2 size={16} className="text-primary shrink-0" />
                              Cryptographic SHA-256 & AES-256 Tamper-Proof Seal with client-side verification
                            </div>
                            <div className="flex items-center gap-2.5 text-xs md:text-sm text-foreground/90 font-medium">
                              <CheckCircle2 size={16} className="text-primary shrink-0" />
                              Captured Audit Logs: IP address, geofence location, device info, and timestamping
                            </div>
                            <div className="flex items-center gap-2.5 text-xs md:text-sm text-foreground/90 font-medium">
                              <CheckCircle2 size={16} className="text-primary shrink-0" />
                              Audit Report Behaviour: Attached with document PDF or created as a Standalone Separate PDF
                            </div>
                          </>
                        )}
                      </div>

                      <div className="pt-2 flex gap-3">
                        <button
                          onClick={() => setActiveStage((prev) => (prev + 1) % 4)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:opacity-90 transition-opacity"
                        >
                          Next Lifecycle Stage <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
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

{/* STAGE 1 VISUAL: Document Upload & Field Setup */}
function Stage1UploadVisual() {
  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-lg relative overflow-hidden">
      {/* Top Document Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <FileUp size={18} />
          </div>
          <div>
            <div className="text-xs font-bold text-foreground">Sales_Agreement_2026.pdf</div>
            <div className="text-[10px] text-muted-foreground">3 pages · 245 KB • Multi-file Support</div>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center gap-1">
          <Check size={11} /> Uploaded
        </span>
      </div>

      {/* Salesforce CRM Integration Card */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/10 via-primary/5 to-transparent border border-blue-500/20 space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
            <Database size={13} /> Salesforce CRM Auto-Import
          </span>
          <span className="text-[10px] font-mono text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
            Synced ✓
          </span>
        </div>
        <div className="text-[11px] text-muted-foreground font-mono bg-background/80 p-2 rounded-lg border border-border/50">
          Opportunity: <span className="font-bold text-foreground">Acme Enterprise Deal</span> ➔ Signer: <span className="font-bold text-primary">Sarah Chen</span>
        </div>
      </div>

      {/* Document Canvas Preview with Placed Fields */}
      <div className="p-3.5 rounded-xl bg-muted/30 border border-border space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
          <span>Document Field Canvas</span>
          <span className="text-primary font-mono text-[10px]">10 Field Types Available</span>
        </div>

        {/* Placed Field 1: Signature */}
        <div className="p-2.5 rounded-lg border-2 border-dashed border-primary/40 bg-primary/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <PenTool size={14} />
            </div>
            <div>
              <div className="text-[11px] font-bold text-primary">Signature Box (Aspect 8:5)</div>
              <div className="text-[9px] text-muted-foreground">Assigned to Signer #1 (Sarah Chen)</div>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">
            Placed
          </span>
        </div>

        {/* Placed Field 2: Date */}
        <div className="p-2 rounded-lg border border-dashed border-emerald-500/40 bg-emerald-500/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
              <Calendar size={14} />
            </div>
            <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">Date Field (Dynamic 'Today')</div>
          </div>
          <span className="text-[9px] font-mono text-muted-foreground">Auto-Fills Date</span>
        </div>
      </div>

      {/* Aspect Ratio Presets Toolbar */}
      <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1">
        <span className="font-bold">Aspect Ratios:</span>
        <div className="flex gap-1.5">
          {["1:1", "4:1", "8:5", "16:9"].map((ratio) => (
            <span key={ratio} className="px-2 py-0.5 rounded border border-border bg-card font-mono text-[10px] font-semibold">
              {ratio}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

{/* STAGE 2 VISUAL: User Signs Document & Fills Placed Fields */}
function Stage2SigningVisual({
  padTab,
  setPadTab,
  typedName,
  setTypedName,
  penSize,
  setPenSize,
}: {
  padTab: "draw" | "type" | "upload";
  setPadTab: (t: "draw" | "type" | "upload") => void;
  typedName: string;
  setTypedName: (s: string) => void;
  penSize: "thin" | "medium" | "thick";
  setPenSize: (s: "thin" | "medium" | "thick") => void;
}) {
  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-3.5 shadow-md">
      <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
        <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
          <PenTool size={14} className="text-primary" /> Recipient Signature Pad
        </div>
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          {(["draw", "type", "upload"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setPadTab(tab)}
              className={`px-2.5 py-1 rounded-md text-[10px] font-bold capitalize transition-colors ${
                padTab === tab ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {padTab === "draw" && (
        <div className="space-y-2">
          <div className="rounded-xl border-2 border-dashed border-primary/30 bg-muted/20 h-24 flex items-center justify-center overflow-hidden">
            <SignaturePath className="h-full w-auto text-primary" />
          </div>
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Pen Thickness:</span>
            <div className="flex gap-2">
              {(["thin", "medium", "thick"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setPenSize(size)}
                  className={`px-2 py-0.5 rounded text-[10px] capitalize border ${
                    penSize === size ? "border-primary bg-primary/10 text-primary font-bold" : "border-border"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {padTab === "type" && (
        <div className="space-y-2">
          <input
            type="text"
            value={typedName}
            onChange={(e) => setTypedName(e.target.value)}
            className="w-full text-xs p-2 rounded-lg border border-border bg-background"
            placeholder="Type your name..."
          />
          <div className="rounded-xl border-2 border-dashed border-primary/30 bg-muted/20 h-20 flex items-center justify-center p-3">
            <span className="font-serif italic text-xl text-primary font-bold">{typedName || "Your Signature"}</span>
          </div>
        </div>
      )}

      {padTab === "upload" && (
        <div className="rounded-xl border-2 border-dashed border-primary/30 bg-muted/20 h-24 flex flex-col items-center justify-center p-3 text-center">
          <FileText size={20} className="text-primary mb-1" />
          <span className="text-xs font-bold text-foreground">Upload PNG or JPG Signature</span>
          <span className="text-[10px] text-muted-foreground">Up to 2 MB file size</span>
        </div>
      )}

      {/* Recipient Fills Placed Fields Preview */}
      <div className="pt-2 border-t border-border/60 space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
          <span>Filled Placed Fields</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">2/2 Fields Filled ✓</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 space-y-0.5">
            <div className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
              <Calendar size={11} className="text-emerald-500" /> Date Signed
            </div>
            <div className="font-mono text-[11px] font-bold text-foreground">{new Date().toISOString().split('T')[0]}</div>
          </div>

          <div className="p-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 space-y-0.5">
            <div className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
              <Mail size={11} className="text-emerald-500" /> Email Address
            </div>
            <div className="text-[11px] font-bold text-foreground truncate font-mono">sarah@acme.com</div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <button className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold shadow-sm hover:opacity-90 transition-opacity">
          Auto-Fill Empty Signatures
        </button>
      </div>
    </div>
  );
}


{/* STAGE 3 VISUAL: Track Sent Document Status via Dashboard (Based on functionalities.txt) */}
function Stage3TrackingVisual() {
  const [activeTab, setActiveTab] = useState<"table" | "signerDetails" | "activity">("table");

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-lg relative overflow-hidden">
      {/* Top Header & Search/Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div>
          <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <LayoutDashboard size={16} className="text-primary" /> Document Dashboard
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex bg-muted p-1 rounded-lg">
            {(["table", "signerDetails", "activity"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold capitalize transition-colors ${
                  activeTab === tab ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "table" ? "Data Table" : tab === "signerDetails" ? "Signer States" : "Document Activity"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === "table" && (
        <div className="space-y-3">
          {/* Search, Filter & Download CSV Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-muted/40 p-2 rounded-xl border border-border/50 text-xs">
            <div className="flex items-center gap-2 flex-1 min-w-[180px] bg-background px-2.5 py-1.5 rounded-lg border border-border">
              <Search size={13} className="text-muted-foreground" />
              <input
                type="text"
                readOnly
                value="DOC-94821"
                className="bg-transparent text-xs text-foreground font-mono focus:outline-none w-full"
                placeholder="Search Doc ID, Name, Sender..."
              />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="px-2 py-1 rounded-lg bg-background border border-border text-[10px] font-bold flex items-center gap-1 text-muted-foreground">
                <Filter size={11} /> Filter: In Review
              </span>
              <button className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-bold text-[10px] flex items-center gap-1 hover:bg-primary hover:text-primary-foreground transition-colors">
                <FileSpreadsheet size={11} /> Download CSV
              </button>
            </div>
          </div>

          {/* Document Data Table */}
          <div className="rounded-xl border border-border bg-muted/20 overflow-hidden text-xs">
            <div className="grid grid-cols-[1.2fr_1.5fr_auto] gap-4 p-3 bg-muted/60 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
              <div>Doc ID / Name</div>
              <div>Signer Details</div>
              <div className="text-right">Actions</div>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-[1.2fr_1.5fr_auto] gap-4 p-3 items-center border-b border-border/60 bg-card/60">
              <div>
                <div className="font-mono text-[10px] font-bold text-primary">#DOC-94821</div>
                <div className="text-[11px] font-bold text-foreground truncate">Sales_January_v2.pdf</div>
              </div>
              <div>
                <div className="text-[11px] font-bold text-foreground">Sarah Chen</div>
                <div className="text-[10px] text-muted-foreground truncate font-mono">sarah@acme798.com</div>
              </div>
              <div className="text-right">
                <button className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground">
                  <MoreVertical size={14} />
                </button>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-[1.2fr_1.5fr_auto] gap-4 p-3 items-center bg-card/40">
              <div>
                <div className="font-mono text-[10px] font-bold text-primary">#DOC-88319</div>
                <div className="text-[11px] font-semibold text-foreground truncate">Enterprise_NDA_v2.pdf</div>
              </div>
              <div>
                <div className="text-[11px] font-semibold text-foreground">Alex Miller</div>
                <div className="text-[10px] text-muted-foreground truncate font-mono">alex@techcorp.io</div>
              </div>
              <div className="text-right">
                <button className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground">
                  <MoreVertical size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1">
            <span className="font-bold">Quick Actions:</span>
            <span>View Details • Preview • Download • Update Expiry • Send Now • Reschedule • Delete</span>
          </div>
        </div>
      )}

      {activeTab === "signerDetails" && (
        <div className="space-y-3">
          <div className="text-[11px] font-bold text-foreground">Signer Details & Action Controls</div>
          <div className="p-3 rounded-xl bg-card border border-border space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <div>
                <div className="font-bold text-foreground">Signer #1: Sarah Chen</div>
                <div className="text-[10px] text-muted-foreground font-mono">sarah@acme.com</div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-bold text-[10px]">
                Email Opened
              </span>
            </div>

            <div className="flex gap-2 pt-1">
              <button className="flex-1 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold text-[11px] flex items-center justify-center gap-1">
                <Send size={12} /> Resend Email & Copy Signing Link
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-border font-semibold text-[11px]">
                Update Signer Info
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="space-y-2 text-xs">
          <div className="text-[11px] font-bold text-foreground mb-2">Live Document Activity Timeline</div>
          <div className="p-2.5 rounded-xl bg-muted/30 border border-border/60 flex items-center justify-between">
            <span className="font-medium text-foreground flex items-center gap-1.5">
              <Send size={13} className="text-primary" /> Email sent to sarah@acme.com
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">Today 10:14 AM</span>
          </div>
          <div className="p-2.5 rounded-xl bg-muted/30 border border-border/60 flex items-center justify-between">
            <span className="font-medium text-foreground flex items-center gap-1.5">
              <Eye size={13} className="text-blue-500" /> Document opened by Sarah Chen
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">Today 10:16 AM</span>
          </div>
          <div className="p-2.5 rounded-xl bg-muted/30 border border-border/60 flex items-center justify-between">
            <span className="font-medium text-foreground flex items-center gap-1.5">
              <PenTool size={13} className="text-emerald-500" /> Recipient signature captured & hashed
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">Today 10:18 AM</span>
          </div>
        </div>
      )}
    </div>
  );
}

{/* STAGE 4 VISUAL: Audit Report Generation, Hashing & Security */}
function Stage4AuditVisual() {
  const [reportType, setReportType] = useState<"attached" | "separate">("attached");

  return (
    <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-card via-emerald-500/5 to-card p-5 space-y-4 shadow-lg relative overflow-hidden">
      {/* Top Audit Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="text-xs font-bold text-foreground">Cryptographic Audit Certificate</div>
            <div className="text-[10px] text-muted-foreground">Court-Admissible & Tamper-Proof Seal</div>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-mono flex items-center gap-1">
          <Check size={11} /> Verified
        </span>
      </div>

      {/* SHA-256 Checksum Hash Box */}
      <div className="p-3 rounded-xl bg-muted/40 border border-border/70 space-y-1.5">
        <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
          <span>AES-256 / SHA-256 Checksum Seal</span>
          <span className="text-emerald-600 font-mono">100% Intact</span>
        </div>
        <div className="font-mono text-xs text-foreground bg-background p-2 rounded-lg border border-border/50 break-all font-semibold select-all">
          e3b0c44298fc1c149afbf4c8996fb92427ae41e4934ca49599155
        </div>
      </div>

      {/* Security Metadata Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-xl bg-background border border-border/60 space-y-0.5">
          <div className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
            <Globe size={12} className="text-primary" /> Captured IP Address
          </div>
          <div className="font-mono text-[11px] font-bold text-foreground">198.51.100.42 (Dubai, UAE)</div>
        </div>

        <div className="p-2.5 rounded-xl bg-background border border-border/60 space-y-0.5">
          <div className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
            <Clock size={12} className="text-amber-500" /> Timestamp
          </div>
          <div className="font-mono text-[11px] font-bold text-foreground">2026-08-11 10:18:42 UTC</div>
        </div>
      </div>

      {/* Audit Report Behaviour Toggle (Attached vs Separate PDF) */}
      <div className="flex items-center justify-between bg-muted/50 p-2 rounded-xl border border-border/50 text-xs">
        <span className="font-semibold text-foreground text-[11px]">Audit Report PDF Mode:</span>
        <div className="flex gap-1 bg-background p-1 rounded-lg border border-border">
          <button
            type="button"
            onClick={() => setReportType("attached")}
            className={`px-2.5 py-0.5 rounded-2xl text-[10px] font-bold transition-all ${
              reportType === "attached"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Attached PDF
          </button>
          <button
            type="button"
            onClick={() => setReportType("separate")}
            className={`px-2.5 py-0.5 rounded-2xl text-[10px] font-bold transition-all ${
              reportType === "separate"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Separate PDF
          </button>
        </div>
      </div>

      {/* Compliance Footer */}
      <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/50">
        <span className="font-bold">Legal Compliance:</span>
        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
          ESIGN • eIDAS AES Level 2 • UAE PASS Verified
        </span>
      </div>
    </div>
  );
}

export default LifecyclePage;
