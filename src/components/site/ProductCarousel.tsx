import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import screen1 from "@/assets/Compliances & Acts.jpeg";
import screen2 from "@/assets/Smart Field Configuration.jpeg";
import screen3 from "@/assets/Salesforce Integration.jpeg";
import screen4 from "@/assets/Mobile Signing Experience.jpeg";
import screen5 from "@/assets/Signature Pad.jpeg";
import screen6 from "@/assets/Multi-Signer Workflow.jpeg";

const screens = [
  {
    title: "Compliances & Acts",
    shortTitle: "Compliances",
    desc: "Ensure every agreement is legally sound with our built-in compliance checks.",
    image: screen1,
  },
  {
    title: "Smart Field Configuration",
    shortTitle: "Smart Fields",
    desc: "Automatically detect and map fields for any document. Save time with AI-driven field placement.",
    image: screen2,
  },
  {
    title: "Salesforce Integration",
    shortTitle: "Salesforce",
    desc: "Seamlessly send documents for signature directly from Salesforce objects.",
    image: screen3,
  },
  {
    title: "Mobile Signing Experience",
    shortTitle: "Mobile Sign",
    desc: "Give your signers a premium, mobile-first experience. Sign documents on the go with speed and ease.",
    image: screen4,
  },
  {
    title: "Signature Pad",
    shortTitle: "Signature Pad",
    desc: "Modern, intuitive signing pad. Choose from draw, type, or upload modes with a responsive stroke.",
    image: screen5,
  },
  {
    title: "Multi-Signer Workflow",
    shortTitle: "Multi-Signer",
    desc: "Manage complex signing orders and multiple parties and track real-time progress for every signer.",
    image: screen6,
  },
];

const ease = [0.2, 0, 0, 1] as const;

export const ProductCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % screens.length), 5000);
    return () => clearInterval(t);
  }, [current]);

  useEffect(() => {
    setImageLoaded(false);
  }, [current]);

  return (
    <section id="how-it-works" className="pb-24 pt-12 md:pb-28">
      <div className="section-shell">
        <motion.div
          className="text-center max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex justify-center mb-5">
            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-primary to-brand" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Experience <span className="text-primary">SignAny 2.0</span> Live
          </h2>
          <p className="text-muted-foreground text-base md:text-lg text-pretty leading-relaxed">
            Take a closer look at how SignAny 2.0 helps you prepare documents quickly, collect signatures efficiently, and track progress in real time through a simple and intuitive dashboard. Manage your entire signing workflow from a single place with clarity and control.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-brand/10 blur-3xl rounded-[36px]" />
          <div className="relative rounded-[28px] border border-border bg-card p-4 md:p-6 lg:p-8 overflow-hidden shadow-xl">
            {/* Header Background Gradient */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-0" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 md:mb-6">
              <div className="space-y-2 max-w-3xl min-h-[120px] sm:min-h-[75px] lg:min-h-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">{screens[current].title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base text-pretty leading-relaxed">{screens[current].desc}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="relative z-10 w-full aspect-[16/9] overflow-hidden rounded-xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current}
                  src={screens[current].image}
                  alt={screens[current].title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: imageLoaded ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                  onLoad={() => setImageLoaded(true)}
                  className="w-full h-full object-contain"
                />
              </AnimatePresence>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted/40 animate-pulse rounded-xl" />
              )}
            </div>
            <div className="relative z-10 grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2.5 sm:gap-4 mt-6">
              {screens.map((screen, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`group relative flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-xl transition-all duration-300 w-full sm:w-auto ${
                    i === current 
                      ? 'border-primary/40 shadow-sm bg-primary/10' 
                      : 'bg-muted/50 border-transparent hover:bg-muted'
                  } border overflow-hidden`}
                >
                  {/* Progress Background Fill */}
                  {i === current && (
                    <motion.div 
                      className="absolute inset-0 bg-primary/15 pointer-events-none"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      style={{ originX: 0 }}
                      key={`bg-timer-${current}`}
                    />
                  )}

                  <div className={`relative z-10 w-2 h-2 shrink-0 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-primary scale-110' : 'bg-muted-foreground/40 group-hover:bg-muted-foreground/60'
                  }`} />
                  <span className={`relative z-10 text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-colors duration-300 truncate ${
                    i === current ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    <span className="sm:hidden">{screen.shortTitle}</span>
                    <span className="hidden sm:inline">{screen.title.split(' ')[0]}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
