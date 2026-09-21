import {
  Landmark,
  ShoppingCart,
  Truck,
  Building2,
  HeartPulse,
  GraduationCap,
  Rocket,
  Hotel,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, revealItem } from "@/components/site/motion/Reveal";
import { TextReveal } from "@/components/site/motion/TextReveal";

type Industry = {
  icon: LucideIcon;
  label: string;
};

const INDUSTRIES: Industry[] = [
  { icon: Landmark, label: "Fintech" },
  { icon: ShoppingCart, label: "E-commerce & Retail" },
  { icon: Truck, label: "Logistics & Supply Chain" },
  { icon: Building2, label: "Real Estate" },
  { icon: HeartPulse, label: "Health & Wellness" },
  { icon: GraduationCap, label: "EdTech" },
  { icon: Hotel, label: "Hospitality" },
  { icon: Rocket, label: "Startups & SaaS" },
];

export function Industries() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Where We've Delivered
          </p>
          <TextReveal
            as="h2"
            className="mt-4 font-serif text-3xl font-bold leading-tight tracking-tight text-charcoal sm:text-4xl"
            lines={[[{ text: "Industries We Serve" }]]}
          />
        </Reveal>

        <RevealGroup
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          stagger={0.06}
        >
          {INDUSTRIES.map((ind) => (
            <motion.div
              key={ind.label}
              variants={revealItem}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="flex flex-col items-center gap-3 rounded-3xl border border-border bg-base px-4 py-8 text-center"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-charcoal text-base">
                <ind.icon size={22} strokeWidth={1.5} />
              </span>
              <span className="text-sm font-medium text-charcoal/80">
                {ind.label}
              </span>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
