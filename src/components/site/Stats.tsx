import { RevealGroup, revealItem } from "@/components/site/motion/Reveal";
import { CountUp } from "@/components/site/motion/CountUp";
import { motion } from "framer-motion";

const STATS = [
  { value: "120+", label: "Projects Delivered" },
  { value: "7+", label: "Years Experience" },
  { value: "30+", label: "Team Members" },
  { value: "98%", label: "Client Satisfaction" },
];

export function Stats() {
  return (
    <section className="border-y border-border bg-base">
      <RevealGroup
        className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-border md:grid-cols-4"
        stagger={0.1}
      >
        {STATS.map((s) => (
          <motion.div
            key={s.label}
            variants={revealItem}
            className="px-6 py-10 text-center"
          >
            <div className="font-serif text-4xl font-bold text-gold sm:text-5xl">
              <CountUp value={s.value} />
            </div>
            <div className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-charcoal/60">
              {s.label}
            </div>
          </motion.div>
        ))}
      </RevealGroup>
    </section>
  );
}
