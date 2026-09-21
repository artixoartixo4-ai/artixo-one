import { Gem, Users, MessageSquare, TrendingUp, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, revealItem } from "@/components/site/motion/Reveal";
import { TextReveal } from "@/components/site/motion/TextReveal";

type Value = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const VALUES: Value[] = [
  {
    icon: Gem,
    title: "Quality First",
    desc: "We'd rather ship something excellent a little later than something average on time.",
  },
  {
    icon: Users,
    title: "Client-Centered",
    desc: "Every decision starts with your users and your business goals — not what's trendy.",
  },
  {
    icon: MessageSquare,
    title: "Transparent Communication",
    desc: "Clear timelines, honest scoping, and no surprises — you always know where your project stands.",
  },
  {
    icon: TrendingUp,
    title: "Built to Scale",
    desc: "We design and engineer for where your business is headed, not just where it is today.",
  },
];

export function AboutStory() {
  return (
    <section id="about" className="bg-base py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              About Us
            </p>
            <TextReveal
              as="h2"
              className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-5xl"
              lines={[[{ text: "From Mannar," }], [{ text: "To The World" }]]}
            />
            <p className="mt-6 text-base leading-relaxed text-charcoal/70">
              ARTIXO ONE started with a simple belief: great software and
              great design shouldn't be separate disciplines. Too many
              digital products feel like they were engineered by one team and
              designed by another — ours are built by people who care about
              both from day one.
            </p>
            <p className="mt-4 text-base leading-relaxed text-charcoal/70">
              Based in Mannar, Sri Lanka, we work with founders and teams
              across the region and beyond — from fintech platforms to
              wellness apps to e-commerce brands — bringing the same
              hands-on care to every project, regardless of size.
            </p>
          </Reveal>

          <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2" stagger={0.1}>
            {VALUES.map((v) => (
              <motion.div
                key={v.title}
                variants={revealItem}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="rounded-3xl border border-border bg-cream p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-charcoal text-base">
                  <v.icon size={20} strokeWidth={1.5} />
                </span>
                <h3 className="mt-4 font-serif text-lg font-semibold text-charcoal">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/65">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
