import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Users,
  Scale,
  Building2,
  Landmark,
  Briefcase,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { signanyIndustries } from "@/lib/industries-data";
import { SectionHeading } from "@/components/site/Sections";

const iconMap: Record<string, React.ElementType> = {
  Stethoscope,
  Users,
  Scale,
  Building2,
  Landmark,
  Briefcase,
};

export function IndustriesSection() {
  return (
    <section id="use-cases" className="bg-cloud/60 py-20 md:py-28 relative overflow-hidden">
      {/* Background Ambient Orbs */}
      <div className="glow-orb top-1/4 -left-20 h-72 w-72 bg-primary/15" />
      <div className="glow-orb bottom-10 right-10 h-80 w-80 bg-brand-soft/15" />

      <div className="section-shell relative z-10">
        <SectionHeading
          eyebrow="Industries & Use Cases"
          title="Built for every industry that demands"
          highlight="speed & proof"
          desc="Discover how organizations eliminate document bottlenecks with SignAny 2.0's tailored workflow solutions."
        />

        {/* Square Cards Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {signanyIndustries.map((ind, index) => {
            const IconComponent = iconMap[ind.iconName] || Briefcase;

            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link
                  to="/use-cases/$id"
                  params={{ id: ind.id }}
                  className="group card-soft card-soft-hover relative flex flex-col justify-between p-7 h-full min-h-[320px] transition-all duration-300 border-border/80 hover:border-primary/50"
                >
                  {/* Top Badge & Icon */}
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="w-13 h-13 rounded-2xl bg-accent p-3 flex items-center justify-center text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg transition-all duration-300">
                        <IconComponent size={24} />
                      </div>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-border bg-background text-[11px] font-semibold text-muted-foreground group-hover:border-primary/30 group-hover:text-primary transition-colors">
                        <Layers size={12} className="text-primary" />
                        4-Step Workflow
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                      {ind.name}
                    </h3>
                    <p className="mt-2 text-xs font-semibold text-primary/90 tracking-wide uppercase">
                      {ind.tagline}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {ind.description}
                    </p>
                  </div>

                  {/* Bottom Action Line */}
                  <div className="mt-8 pt-5 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-primary" />
                      {ind.featuresList[0]}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                      Explore Use Case <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
