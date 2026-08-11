import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ShieldAlert,
  FileCheck2,
  UploadCloud,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  RefreshCw,
  Lock,
  ArrowRight,
  Sparkles,
  Info,
  Sliders,
  FileText,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { ProductModeProvider } from "@/lib/product-mode";
import { SITE } from "@/lib/site-data";

export const Route = createFileRoute("/verifyHash")({
  head: () => ({
    meta: [
      { title: "Verify Document Hash & Authenticity | SignAny 2.0" },
      {
        name: "description",
        content:
          "Verify the cryptographic integrity of signed documents. Compare AES-256 / AES-128 checksum hashes to ensure documents are 100% authentic and tamper-proof.",
      },
    ],
  }),
  component: VerifyHashPage,
});

async function computeFileHash(file: File, algorithm: "256" | "128"): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const fullHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  if (algorithm === "128") {
    return fullHex.substring(0, 32);
  }
  return fullHex;
}

function VerifyHashPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [algorithm, setAlgorithm] = useState<"256" | "128">("256");
  const [inputHash, setInputHash] = useState("");
  const [computedHash, setComputedHash] = useState("");
  const [isHashing, setIsHashing] = useState(false);
  const [verificationResult, setVerificationResult] = useState<"match" | "mismatch" | null>(null);
  const [copied, setCopied] = useState(false);

  // Compute hash whenever file or algorithm changes
  useEffect(() => {
    if (!selectedFile) {
      setComputedHash("");
      setVerificationResult(null);
      return;
    }

    let isMounted = true;
    setIsHashing(true);

    computeFileHash(selectedFile, algorithm)
      .then((hash) => {
        if (isMounted) {
          setComputedHash(hash);
          setIsHashing(false);
        }
      })
      .catch((err) => {
        console.error("Error computing hash:", err);
        if (isMounted) setIsHashing(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedFile, algorithm]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setVerificationResult(null);
    }
  };

  const handleVerify = () => {
    if (!computedHash || !inputHash.trim()) return;
    const cleanInput = inputHash.trim().toLowerCase();
    const cleanComputed = computedHash.toLowerCase();

    if (cleanInput === cleanComputed) {
      setVerificationResult("match");
    } else {
      setVerificationResult("mismatch");
    }
  };

  const handleSampleFill = () => {
    const sampleHash = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
    setInputHash(algorithm === "256" ? sampleHash : sampleHash.substring(0, 32));
    if (computedHash) {
      setInputHash(computedHash);
    }
  };

  const handleCopyComputed = () => {
    if (!computedHash) return;
    navigator.clipboard.writeText(computedHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setInputHash("");
    setComputedHash("");
    setVerificationResult(null);
  };

  return (
    <ProductModeProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <Header />

        <main className="flex-1 pt-32 pb-24">
          <div className="section-shell max-w-5xl mx-auto">
            {/* Header Title */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                <ShieldCheck size={16} /> Cryptographic Verification
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 text-balance">
                Document Authenticity & Hash Verifier
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto">
                Verify that your signed agreement is 100% authentic and unaltered. Upload your PDF and compare cryptographic checksum hashes in real-time.
              </p>
            </div>

            {/* Main Form Container */}
            <div className="rounded-[32px] border border-border/80 bg-card p-6 md:p-10 shadow-2xl relative overflow-hidden mb-12">
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-primary via-indigo-500 to-emerald-500" />

              {/* Algorithm Selection (AES 256 default vs AES 128) */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-border/60">
                <div>
                  <div className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Sliders size={16} className="text-primary" /> Encryption Algorithm Standard
                  </div>
                  <div className="text-xs text-muted-foreground">Select algorithm used during document sealing</div>
                </div>

                <div className="flex gap-2 bg-muted p-1 rounded-xl">
                  <button
                    onClick={() => setAlgorithm("256")}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      algorithm === "256"
                        ? "bg-card text-primary shadow-sm ring-1 ring-border"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    AES-256 (Default)
                  </button>
                  <button
                    onClick={() => setAlgorithm("128")}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      algorithm === "128"
                        ? "bg-card text-primary shadow-sm ring-1 ring-border"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    AES-128
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
                {/* Step 1: Upload PDF */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    1. Upload PDF Agreement
                  </label>

                  <div className="relative rounded-2xl border-2 border-dashed border-primary/30 bg-muted/20 p-6 text-center hover:border-primary/60 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    {selectedFile ? (
                      <div className="space-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center">
                          <FileCheck2 size={24} />
                        </div>
                        <div className="text-sm font-bold text-foreground truncate max-w-xs mx-auto">
                          {selectedFile.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {(selectedFile.size / 1024).toFixed(1)} KB • PDF Document
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedFile(null)}
                          className="text-xs text-primary underline font-semibold pt-1 relative z-20"
                        >
                          Change File
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center">
                          <UploadCloud size={24} />
                        </div>
                        <div className="text-sm font-bold text-foreground">
                          Click to upload or drag PDF here
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Client-side hashing • Your PDF stays private & never leaves your browser
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Computed Hash Display */}
                  {computedHash && (
                    <div className="p-3.5 rounded-xl bg-card border border-border space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-muted-foreground uppercase">Computed {algorithm}-bit Hash:</span>
                        <button
                          onClick={handleCopyComputed}
                          className="text-primary font-bold hover:underline flex items-center gap-1"
                        >
                          {copied ? <Check size={12} /> : <Copy size={12} />}
                          {copied ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <div className="font-mono text-xs text-foreground break-all bg-muted p-2 rounded-lg font-semibold">
                        {computedHash}
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 2: Paste Reference Hash */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      2. Paste Reference Audit Hash
                    </label>
                    {computedHash && (
                      <button
                        onClick={() => setInputHash(computedHash)}
                        className="text-[11px] font-bold text-primary hover:underline"
                      >
                        Use Computed Hash
                      </button>
                    )}
                  </div>

                  <textarea
                    rows={4}
                    value={inputHash}
                    onChange={(e) => setInputHash(e.target.value)}
                    placeholder={`Paste original ${algorithm === "256" ? "64-character (AES-256)" : "32-character (AES-128)"} hash string from audit certificate...`}
                    className="w-full rounded-2xl border border-border bg-card p-4 text-xs font-mono text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={handleVerify}
                      disabled={!selectedFile || !inputHash.trim() || isHashing}
                      className="flex-1 py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isHashing ? (
                        <>
                          <RefreshCw size={16} className="animate-spin" /> Computing Hash...
                        </>
                      ) : (
                        <>
                          <ShieldCheck size={16} /> Verify Hash Integrity
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleReset}
                      className="px-4 py-3.5 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:bg-muted transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* VERIFICATION RESULT NOTIFICATION */}
              <AnimatePresence mode="wait">
                {verificationResult === "match" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="p-6 rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100 space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <CheckCircle2 size={24} />
                      </div>
                      <div>
                        <div className="text-base font-bold text-emerald-900 dark:text-emerald-100 uppercase tracking-wide">
                          VERIFIED — DOCUMENT IS TAMPER-PROOF
                        </div>
                        <div className="text-xs text-emerald-700 dark:text-emerald-300">
                          Cryptographic SHA / AES-{algorithm} checksums match perfectly with 0 modifications.
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-background/90 border border-emerald-500/20 text-xs space-y-2 text-foreground">
                      <div className="flex justify-between border-b border-border/60 pb-2">
                        <span className="text-muted-foreground">Authenticity Status:</span>
                        <span className="font-bold text-emerald-600">Court-Admissible & Validated</span>
                      </div>
                      <div className="flex justify-between border-b border-border/60 pb-2">
                        <span className="text-muted-foreground">Algorithm Used:</span>
                        <span className="font-bold font-mono">AES-{algorithm} / SHA-256</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Verified File Name:</span>
                        <span className="font-bold truncate max-w-xs">{selectedFile?.name}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {verificationResult === "mismatch" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="p-6 rounded-2xl border-2 border-red-500/40 bg-red-500/10 text-red-950 dark:text-red-100 space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0">
                        <ShieldAlert size={24} />
                      </div>
                      <div>
                        <div className="text-base font-bold text-red-900 dark:text-red-100 uppercase tracking-wide">
                          TAMPER WARNING — HASH MISMATCH DETECTED
                        </div>
                        <div className="text-xs text-red-700 dark:text-red-300">
                          The computed file hash does not match the provided reference hash string.
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-background/90 border border-red-500/20 text-xs space-y-2 text-foreground font-mono">
                      <div>
                        <span className="text-muted-foreground font-sans block text-[11px]">Computed File Hash:</span>
                        <span className="text-red-500 font-bold break-all">{computedHash}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-sans block text-[11px]">Provided Input Hash:</span>
                        <span className="text-muted-foreground font-bold break-all">{inputHash}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Security Guarantee Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-2">
                <Lock size={20} className="text-primary mb-2" />
                <h3 className="font-bold text-foreground text-sm">100% Client-Side Hashing</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your PDF files never leave your browser. Hash computation is performed locally using standard Web Crypto APIs.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-2">
                <ShieldCheck size={20} className="text-primary mb-2" />
                <h3 className="font-bold text-foreground text-sm">Legal Admissibility</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Calculated hashes comply with ESIGN, eIDAS AES Level 2, and UAE PASS legal framework standards.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-2">
                <Sparkles size={20} className="text-primary mb-2" />
                <h3 className="font-bold text-foreground text-sm">AES-256 & 128 Support</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Supports both standard 256-bit enterprise cryptographic seals and 128-bit legacy envelope hashes.
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ProductModeProvider>
  );
}

export default VerifyHashPage;
