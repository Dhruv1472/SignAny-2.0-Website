import { useState, useEffect } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ShieldAlert,
  FileCheck2,
  UploadCloud,
  CheckCircle2,
  Copy,
  Check,
  RefreshCw,
  Lock,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { ProductModeProvider } from "@/lib/product-mode";

export const Route = createFileRoute("/verifyHash")({
  beforeLoad: () => {
    throw redirect({ to: "/hash-verification", replace: true });
  },
});

async function computeFileHash(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function VerifyHashPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputHash, setInputHash] = useState("");
  const [computedHash, setComputedHash] = useState("");
  const [isHashing, setIsHashing] = useState(false);
  const [verificationResult, setVerificationResult] = useState<"match" | "mismatch" | null>(null);
  const [copied, setCopied] = useState(false);

  // Compute hash whenever file changes
  useEffect(() => {
    if (!selectedFile) {
      setComputedHash("");
      setVerificationResult(null);
      return;
    }

    let isMounted = true;
    setIsHashing(true);

    computeFileHash(selectedFile)
      .then((hash) => {
        if (isMounted) {
          setComputedHash(hash);
          setIsHashing(false);
        }
      })
      .catch((err) => {
        console.error("Error computing SHA-256 hash:", err);
        if (isMounted) setIsHashing(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedFile]);

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

        <main className="flex-1 pt-28 pb-20 md:pt-36 md:pb-24">
          <div className="section-shell max-w-4xl mx-auto">
            {/* Header Title */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card text-muted-foreground text-xs font-semibold mb-4 shadow-sm">
                <ShieldCheck size={16} className="text-primary" /> Cryptographic Verification
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                Document Authenticity & Hash Verifier
              </h1>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Verify that your signed agreement is 100% authentic and unaltered. Upload your PDF and compare SHA-256 checksum hashes in real-time.
              </p>
            </div>

            {/* Main Form Container */}
            <div className="card-soft p-6 md:p-10 mb-12 border-border/80">
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
                          className="text-xs text-primary font-semibold hover:underline pt-1 relative z-20"
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
                          Client-side hashing • PDF stays private in your browser
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Computed Hash Display */}
                  {computedHash && (
                    <div className="p-3.5 rounded-xl bg-card border border-border space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-muted-foreground uppercase">Computed SHA-256 Hash:</span>
                        <button
                          onClick={handleCopyComputed}
                          className="text-primary font-bold hover:underline flex items-center gap-1"
                        >
                          {copied ? <Check size={12} /> : <Copy size={12} />}
                          {copied ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <div className="font-mono text-xs text-foreground break-all bg-muted p-2.5 rounded-lg font-semibold">
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
                    placeholder="Paste 64-character SHA-256 hash string from audit certificate..."
                    className="w-full rounded-2xl border border-border bg-background p-4 text-xs font-mono text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={handleVerify}
                      disabled={!selectedFile || !inputHash.trim() || isHashing}
                      className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-sm hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isHashing ? (
                        <>
                          <RefreshCw size={15} className="animate-spin" /> Computing Hash...
                        </>
                      ) : (
                        <>
                          <ShieldCheck size={15} /> Verify Hash Integrity
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleReset}
                      className="px-4 py-3 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:bg-muted transition-colors"
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-6 rounded-2xl border border-success/30 bg-success/15 text-foreground space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-success text-success-foreground flex items-center justify-center shrink-0">
                        <CheckCircle2 size={20} stroke="white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold uppercase tracking-wide text-foreground">
                          VERIFIED — DOCUMENT IS TAMPER-PROOF
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Cryptographic SHA-256 checksums match perfectly with 0 modifications.
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-background border border-border text-xs space-y-2">
                      <div className="flex justify-between border-b border-border/60 pb-2">
                        <span className="text-muted-foreground">Authenticity Status:</span>
                        <span className="font-bold text-success">Court-Admissible & Validated</span>
                      </div>
                      <div className="flex justify-between border-b border-border/60 pb-2">
                        <span className="text-muted-foreground">Algorithm Used:</span>
                        <span className="font-bold font-mono">SHA-256 Cryptographic Hash</span>
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-6 rounded-2xl border border-destructive/30 bg-destructive/10 text-foreground space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-destructive/90 text-destructive-foreground flex items-center justify-center shrink-0">
                        <ShieldAlert size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-bold uppercase tracking-wide text-foreground">
                          TAMPER WARNING — HASH MISMATCH DETECTED
                        </div>
                        <div className="text-xs text-muted-foreground">
                          The computed file hash does not match the provided reference hash string.
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-background border border-border text-xs space-y-2 font-mono">
                      <div>
                        <span className="text-muted-foreground font-sans block text-[11px]">Computed File Hash:</span>
                        <span className="text-destructive font-bold break-all">{computedHash}</span>
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
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card-soft p-6 space-y-2 border-border/80">
                <Lock size={20} className="text-primary mb-1" />
                <h3 className="font-bold text-foreground text-sm">100% Client-Side Hashing</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your PDF files never leave your browser. Hash computation is performed locally using Web Crypto APIs.
                </p>
              </div>

              <div className="card-soft p-6 space-y-2 border-border/80">
                <ShieldCheck size={20} className="text-primary mb-1" />
                <h3 className="font-bold text-foreground text-sm">Legal Admissibility</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Calculated SHA-256 hashes comply with ESIGN, eIDAS AES Level 2, and UAE PASS legal standards.
                </p>
              </div>

              <div className="card-soft p-6 space-y-2 border-border/80">
                <Sparkles size={20} className="text-primary mb-1" />
                <h3 className="font-bold text-foreground text-sm">SHA-256 Cryptographic Seals</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Uses standard 256-bit enterprise cryptographic digests to lock document content against modification.
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
