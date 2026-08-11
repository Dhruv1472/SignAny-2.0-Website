import { Link, useRouterState } from "@tanstack/react-router";
import { HelpCircle, Sparkles } from "lucide-react";

export function FloatingLifecycleButton() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Hide button when already on the lifecycle page
  if (pathname === "/lifecycle") return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 group">
      <Link
        to="/lifecycle"
        className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary text-primary-foreground shadow-xl border-background transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95"
        aria-label="Understanding Document Signing Lifecycle"
      >
        <HelpCircle size={24} className="group-hover:scale-110 transition-transform duration-300" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-background">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        </span>
      </Link>

      {/* Tooltip Popup */}
      <div className="absolute left-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap">
        <div className="bg-popover/95 backdrop-blur-md text-popover-foreground text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border border-border flex items-center gap-1.5">
          <Sparkles size={13} className="text-primary" />
          Signing Lifecycle Guide
        </div>
      </div>
    </div>
  );
}

export default FloatingLifecycleButton;
