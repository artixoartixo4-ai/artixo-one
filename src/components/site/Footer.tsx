import { Instagram, Linkedin, Github, Figma } from "lucide-react";
import { motion } from "framer-motion";
import artixoIcon from "@/assets/artixo-icon.png";
import { Reveal, RevealGroup, revealItem } from "@/components/site/motion/Reveal";

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Figma, label: "Behance", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-base">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Reveal className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <img src={artixoIcon} alt="ARTIXO ONE" className="h-10 w-10 object-contain" />
              <span className="font-serif text-xl font-bold tracking-tight">
                ARTIXO <span className="text-gold">ONE</span>
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-base/60">
              A software & design studio building digital products and brand
              experiences — from concept to launch and beyond.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            <a href="#about" className="text-sm text-base/70 transition-colors hover:text-gold">About</a>
            <a href="#services" className="text-sm text-base/70 transition-colors hover:text-gold">Services</a>
            <a href="#process" className="text-sm text-base/70 transition-colors hover:text-gold">Process</a>
            <a href="#pricing" className="text-sm text-base/70 transition-colors hover:text-gold">Pricing</a>
            <a href="#work" className="text-sm text-base/70 transition-colors hover:text-gold">Work</a>
            <a href="/blog" className="text-sm text-base/70 transition-colors hover:text-gold">Blog</a>
            <a href="#contact" className="text-sm text-base/70 transition-colors hover:text-gold">Contact</a>
          </nav>
        </Reveal>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-base/15 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs uppercase tracking-[0.15em] text-base/40">
            © {new Date().getFullYear()} ARTIXO ONE · Mannar, Sri Lanka
          </p>
          <RevealGroup className="flex gap-3" stagger={0.08}>
            {SOCIALS.map((s) => (
              <motion.a
                key={s.label}
                variants={revealItem}
                href={s.href}
                aria-label={s.label}
                whileHover={{ scale: 1.12, rotate: -6 }}
                whileTap={{ scale: 0.95 }}
                className="grid h-10 w-10 place-items-center rounded-full border border-base/15 text-base/70 transition-colors hover:border-gold hover:text-gold"
              >
                <s.icon size={18} strokeWidth={1.5} />
              </motion.a>
            ))}
          </RevealGroup>
        </div>
      </div>
    </footer>
  );
}
