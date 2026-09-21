import { Search, PencilRuler, Code, Rocket, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, revealItem } from "@/components/site/motion/Reveal";
import { TextReveal } from "@/components/site/motion/TextReveal";
import { ProcessRobot } from "@/components/site/ProcessRobot";

type Step = {
  no: string;
  title: string;
  desc: string;
  icon: LucideIcon;
};

const STEPS: Step[] = [
  {
    no: "01",
    title: "Discovery",
    desc: "We start with a deep dive into your goals, users, constraints and market to define the right scope.",
    icon: Search,
  },
  {
    no: "02",
    title: "Design & Prototype",
    desc: "We craft wireframes, interactive prototypes and a visual system for your review and approval.",
    icon: PencilRuler,
  },
  {
    no: "03",
    title: "Development",
    desc: "Engineers bring the design to life with clean, tested, scalable code and continuous demos.",
    icon: Code,
  },
  {
    no: "04",
    title: "Launch & Support",
    desc: "We ship to production and stay on — monitoring, iterating and supporting your product post-launch.",
    icon: Rocket,
  },
];

export function Process() {
  return (
    <section id="process" className="bg-base py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              How We Work
            </p>
            <div className="relative mt-4 inline-block">
              <TextReveal
                as="h2"
                className="relative font-serif text-4xl font-bold tracking-tight text-charcoal sm:text-6xl"
                lines={[[{ text: "Our Process" }]]}
              />
              <span aria-hidden className="ghost-word text-5xl sm:text-7xl">
                PROCESS
              </span>
            </div>
          </Reveal>
          <div className="mt-6 lg:mt-0">
            <ProcessRobot />
          </div>
        </div>

        <div className="relative">
          {/* connecting line */}
          <motion.div
            className="absolute left-0 right-0 top-7 hidden h-px origin-left bg-border md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />

          <RevealGroup
            className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-6"
            stagger={0.15}
          >
            {STEPS.map((s) => (
              <motion.div
                key={s.no}
                variants={revealItem}
                className="relative flex flex-col items-center text-center md:px-3"
              >
                <motion.span
                  whileHover={{ scale: 1.1, borderColor: "var(--gold)" }}
                  className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-border bg-base text-charcoal"
                >
                  <s.icon size={22} strokeWidth={1.5} />
                </motion.span>
                <span className="mt-6 font-serif text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                  Step {s.no}
                </span>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-charcoal">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
