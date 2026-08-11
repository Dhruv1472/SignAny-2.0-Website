import { motion } from "framer-motion";
import { SignaturePath } from "@/components/site/spinner";

const statusItems = [
  { label: "Document uploaded", color: "bg-emerald-400" },
  { label: "Fields detected", color: "bg-violet-400" },
  { label: "Sent for review", color: "bg-amber-400" },
  { label: "Awaiting signature", color: "bg-primary" },
];

export const NotFoundAnimation = () => {
  return (
    <div className="relative w-[18rem] md:w-[24rem]">
      {/* Soft glow behind the card */}
      <div className="absolute inset-0 -z-10 rounded-[2rem] bg-primary/10 blur-[60px]" />

      {/* Main document card */}
      <div className="relative rounded-[1.75rem] border border-border/80 bg-card shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <p className="text-[0.6rem] font-mono uppercase tracking-[0.25em] text-muted-foreground">
            contract_v2.pdf
          </p>
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-2 w-2 rounded-full bg-emerald-400"
          />
        </div>

        <div className="p-5 space-y-4">
          {/* Document skeleton lines */}
          <div className="space-y-2">
            {[85, 70, 90, 60].map((w, i) => (
              <motion.div
                key={i}
                className="h-2 rounded-full bg-muted"
                initial={{ width: 0 }}
                animate={{ width: `${w}%` }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.18,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: 6,
                }}
              />
            ))}
          </div>

          {/* Signature pad */}
          <div className="rounded-xl border-2 border-dashed border-primary/30 bg-muted/20 px-4 py-3">
            <p className="mb-2 text-[0.58rem] font-bold uppercase tracking-[0.25em] text-muted-foreground">
              Secure signature pad
            </p>
            <div className="h-24 flex items-center justify-center overflow-hidden">
              <SignaturePath className="h-full w-auto text-primary" />
            </div>
          </div>

          {/* Status feed */}
          <div className="space-y-2">
            {statusItems.map(({ label, color }, i) => (
              <motion.div
                key={label}
                className="flex items-center gap-2.5"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: i * 0.4 + 0.3,
                  duration: 0.45,
                  repeat: Infinity,
                  repeatDelay: 5.5,
                }}
              >
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${color}`} />
                <span className="text-[0.65rem] text-muted-foreground font-medium">{label}</span>
                <motion.span
                  className="ml-auto text-[0.6rem] text-muted-foreground/60 font-mono"
                  animate={{ opacity: [0.35, 0.75, 0.35] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                >
                  just now
                </motion.span>
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div>
            <div className="mb-1 flex justify-between text-[0.6rem] font-bold text-muted-foreground">
              <span>Completion</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                67%
              </motion.span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-1.5 rounded-full bg-gradient-to-r from-primary to-emerald-400"
                initial={{ width: "0%" }}
                animate={{ width: ["0%", "67%", "67%", "0%"] }}
                transition={{
                  duration: 5,
                  times: [0, 0.45, 0.85, 1],
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 -top-4 rounded-2xl border border-border bg-card px-3 py-2 shadow-lg"
      >
        <p className="text-[0.65rem] font-bold uppercase tracking-wider text-foreground flex items-center gap-1">
          🔒 Secure Doc
        </p>
      </motion.div>

      {/* Floating chip */}
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-3 -left-4 flex items-center gap-2 rounded-2xl border border-border bg-card px-3.5 py-2 shadow-lg"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <p className="text-[0.65rem] font-bold text-foreground">e-Signed</p>
      </motion.div>
    </div>
  );
};

export default NotFoundAnimation;
