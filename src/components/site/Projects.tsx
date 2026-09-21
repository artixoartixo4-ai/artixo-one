import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Reveal, RevealGroup, revealItem } from "@/components/site/motion/Reveal";
import { TextReveal } from "@/components/site/motion/TextReveal";
import { useTilt, TiltGlare } from "@/components/site/motion/Tilt";
import { CASE_STUDIES, type CaseStudy } from "@/data/case-studies";

const FEATURED = CASE_STUDIES[0]!;
const GRID = CASE_STUDIES.slice(1);

function ProjectCard({
  project,
  featured = false,
}: {
  project: CaseStudy;
  featured?: boolean;
}) {
  const { ref, handlers, style, glare } = useTilt<HTMLElement>(6);

  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      className="group relative block overflow-hidden rounded-3xl"
    >
      <motion.article
        ref={ref}
        {...handlers}
        variants={revealItem}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        style={style}
        className="relative"
      >
        <img
          src={project.img}
          alt={`${project.name} — ${project.type} case study`}
          loading="lazy"
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            featured ? "h-[320px] sm:h-[560px]" : "h-[260px]"
          }`}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent p-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
            {project.type} · {project.location}
          </p>
          <h3 className="mt-1 flex items-center gap-1.5 font-serif text-xl font-semibold text-base sm:text-2xl">
            {project.name}
            <ArrowUpRight
              size={18}
              className="opacity-0 transition-opacity group-hover:opacity-100"
            />
          </h3>
        </div>

        <TiltGlare {...glare} />
      </motion.article>
    </Link>
  );
}

export function Projects() {
  return (
    <section id="work" className="bg-base py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Our Portfolio
            </p>
            <TextReveal
              as="h2"
              className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-5xl"
              lines={[[{ text: "Featured Projects" }]]}
            />
          </div>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-cream px-5 py-2.5 text-sm font-semibold text-charcoal transition-colors hover:bg-gold"
          >
            Start a Project
            <ArrowUpRight size={16} />
          </motion.a>
        </Reveal>

        <RevealGroup
          className="grid grid-cols-1 gap-5 lg:grid-cols-3"
          stagger={0.12}
        >
          <ProjectCard project={FEATURED} featured />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
            {GRID.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
