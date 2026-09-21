import {
  Code2,
  PenTool,
  Palette,
  Cloud,
  Smartphone,
  Compass,
  ShoppingCart,
  ShoppingBag,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, revealItem } from "@/components/site/motion/Reveal";
import { TextReveal } from "@/components/site/motion/TextReveal";
import { useTilt, TiltGlare } from "@/components/site/motion/Tilt";

import imgSoftwareDev from "@/assets/services/service-software-dev.jpg";
import imgUiUx from "@/assets/services/service-ui-ux.jpg";
import imgBrand from "@/assets/services/service-brand.jpg";
import imgCloud from "@/assets/services/service-cloud.jpg";
import imgMobile from "@/assets/services/service-mobile.jpg";
import imgStrategy from "@/assets/services/service-strategy.jpg";
import imgPos from "@/assets/services/service-pos.jpg";
import imgEcommerce from "@/assets/services/service-ecommerce.jpg";

type Service = {
  no: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  image: string;
};

const SERVICES: Service[] = [
  {
    no: "01",
    icon: Code2,
    title: "Software Development",
    desc: "Robust, scalable web platforms and APIs engineered with modern frameworks, clean architecture and rigorous testing.",
    image: imgSoftwareDev,
  },
  {
    no: "02",
    icon: PenTool,
    title: "UI/UX Design",
    desc: "Research-led interface design and prototyping that turns complex flows into intuitive, delightful experiences.",
    image: imgUiUx,
  },
  {
    no: "03",
    icon: Palette,
    title: "Brand Design",
    desc: "Distinctive identity systems — logo, typography, color and guidelines — that make your product unmistakable.",
    image: imgBrand,
  },
  {
    no: "04",
    icon: Cloud,
    title: "Cloud Solutions",
    desc: "Cloud architecture, DevOps automation and infrastructure that keeps your product fast, secure and reliable.",
    image: imgCloud,
  },
  {
    no: "05",
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native-feeling iOS and Android apps built once with cross-platform tooling and a polished, performant UI.",
    image: imgMobile,
  },
  {
    no: "06",
    icon: Compass,
    title: "Strategy & Consulting",
    desc: "Product strategy, roadmapping and technical audits that align your build with measurable business goals.",
    image: imgStrategy,
  },
  {
    no: "07",
    icon: ShoppingCart,
    title: "POS System Development",
    desc: "Custom point-of-sale software for retail and hospitality — billing, inventory and reporting built to fit how you run the counter.",
    image: imgPos,
  },
  {
    no: "08",
    icon: ShoppingBag,
    title: "E-commerce Development",
    desc: "Custom online stores — product catalogs, cart, secure checkout and payments — built to convert and scale with your business.",
    image: imgEcommerce,
  },
];

function ServiceCard({ s }: { s: Service }) {
  const { ref, handlers, style, glare } = useTilt<HTMLElement>(6);

  return (
    <motion.article
      ref={ref}
      {...handlers}
      variants={revealItem}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={style}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-cream hover:shadow-[0_24px_60px_-30px_rgba(45,45,45,0.5)]"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={s.image}
          alt={s.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/0 to-charcoal/0" />
        <span className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-2xl bg-charcoal/90 text-base backdrop-blur">
          <s.icon size={20} strokeWidth={1.5} />
        </span>
        <span className="absolute bottom-4 left-4 font-serif text-2xl font-semibold text-base">
          {s.no}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-8">
        <h3 className="font-serif text-2xl font-semibold text-charcoal">
          {s.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/65">
          {s.desc}
        </p>
        <motion.a
          href="#contact"
          aria-label={`Enquire about ${s.title}`}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-flex h-10 w-10 items-center justify-center self-start rounded-full bg-gold text-charcoal"
        >
          <ArrowUpRight size={18} />
        </motion.a>
      </div>

      <TiltGlare {...glare} />
    </motion.article>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-base py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            What We Offer
          </p>
          <TextReveal
            as="h2"
            className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-5xl"
            lines={[[{ text: "Our Services" }]]}
          />
          <p className="mt-5 text-base leading-relaxed text-charcoal/70">
            From first concept to launch and beyond, we deliver complete digital
            solutions — software, design and strategy — tailored to your goals.
          </p>
        </Reveal>

        <RevealGroup
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.no} s={s} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
