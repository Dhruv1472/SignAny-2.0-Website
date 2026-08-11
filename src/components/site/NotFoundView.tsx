import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import NotFoundAnimation from "@/components/site/NotFoundAnimation";
import logo from "@/assets/SignAnyLogoWhiteBG.png";

const ease = [0.2, 0, 0, 1] as const;

export function NotFoundView() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <section className="relative min-h-screen overflow-hidden bg-background text-foreground flex items-center justify-center font-sans">
      {/* Hero background glows */}
      <div className="hero-mesh absolute inset-0 pointer-events-none" />
      <div className="glow-orb top-20 right-[8%] h-80 w-80 bg-primary/20 pointer-events-none" />
      <div className="glow-orb bottom-10 left-[2%] h-72 w-72 bg-emerald-500/10 pointer-events-none" />

      <div className="section-shell relative z-10 w-full py-12 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="space-y-6"
          >
            {/* Logo + badge */}
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="SignAny 2.0"
                className="h-10 md:h-12 object-contain"
              />
              <span className="rounded-full border border-border/80 bg-muted/60 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                Page Not Found
              </span>
            </div>

            {/* 404 + heading + body */}
            <div className="space-y-4">
              <p className="text-[clamp(4.5rem,12vw,8.5rem)] font-black leading-none tracking-tight text-foreground/80">
                404
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.05] text-balance">
                The page you are looking for is{" "}
                <span className="text-gradient-brand">missing.</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                The link may be outdated or mistyped. Return to the homepage to explore SignAny 2.0 and see how it helps teams manage, sign, and send documents effortlessly.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 hover:-translate-y-px"
              >
                Return to Home <ArrowRight size={16} />
              </Link>
            </div>

            {/* Requested path */}
            <p className="text-xs text-muted-foreground pt-2">
              Requested path:{" "}
              <span className="font-mono font-semibold text-foreground/80 bg-muted px-2 py-0.5 rounded">
                {pathname}
              </span>
            </p>
          </motion.div>

          {/* Right — animation */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="relative flex items-center justify-center"
          >
            <NotFoundAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default NotFoundView;
