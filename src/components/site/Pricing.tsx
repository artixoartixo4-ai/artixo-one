import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, revealItem } from "@/components/site/motion/Reveal";
import { TextReveal } from "@/components/site/motion/TextReveal";
import { useTilt, TiltGlare } from "@/components/site/motion/Tilt";
import { TIERS, PACKAGE_SELECTED_EVENT } from "@/data/pricing";

function selectPackage(name: string) {
  window.dispatchEvent(new CustomEvent(PACKAGE_SELECTED_EVENT, { detail: { name } }));
}

function PricingCard({ tier }: { tier: (typeof TIERS)[number] }) {
  const { ref, handlers, style, glare } = useTilt<HTMLDivElement>(7);

  return (
    <motion.div
      ref={ref}
      {...handlers}
      variants={revealItem}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={style}
      className={`relative flex flex-col rounded-3xl border p-8 ${
        tier.highlighted
          ? "border-gold bg-charcoal text-base shadow-[0_30px_80px_-30px_rgba(45,45,45,0.5)]"
          : "border-border bg-base text-charcoal"
      }`}
    >
      {tier.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-charcoal">
          Most Popular
        </span>
      )}

      <h3
        className={`font-serif text-2xl font-semibold ${
          tier.highlighted ? "text-base" : "text-charcoal"
        }`}
      >
        {tier.name}
      </h3>
      <p
        className={`mt-2 text-sm leading-relaxed ${
          tier.highlighted ? "text-base/65" : "text-charcoal/60"
        }`}
      >
        {tier.tagline}
      </p>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-serif text-4xl font-bold">{tier.price}</span>
        {tier.price !== "Custom" && (
          <span
            className={`text-sm ${
              tier.highlighted ? "text-base/55" : "text-charcoal/50"
            }`}
          >
            starting
          </span>
        )}
      </div>

      <ul className="mt-8 flex-1 space-y-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <Check size={16} className="mt-0.5 shrink-0 text-gold" />
            <span className={tier.highlighted ? "text-base/85" : "text-charcoal/75"}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        href="#contact"
        onClick={() => selectPackage(tier.name)}
        className={`mt-8 flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors ${
          tier.highlighted
            ? "bg-gold text-charcoal hover:bg-gold-deep"
            : "bg-charcoal text-base hover:bg-charcoal/85"
        }`}
      >
        {tier.cta}
        <ArrowRight size={16} />
      </motion.a>

      <TiltGlare {...glare} />
    </motion.div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Pricing
          </p>
          <TextReveal
            as="h2"
            className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-5xl"
            lines={[[{ text: "Packages That Fit" }], [{ text: "Your Stage" }]]}
          />
          <p className="mt-6 text-base leading-relaxed text-charcoal/70">
            Starting prices below — every project gets a fixed quote after a
            quick scoping call, so there are no surprises. Pick a package to
            auto-fill a proposal you can take away.
          </p>
        </Reveal>

        <RevealGroup
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
          stagger={0.12}
        >
          {TIERS.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </RevealGroup>

        <p className="mt-10 text-center text-xs text-charcoal/50">
          Prices are indicative starting points and vary with scope — get an
          exact quote after a free scoping call.
        </p>
      </div>
    </section>
  );
}
