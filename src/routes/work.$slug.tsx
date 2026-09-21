import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal, RevealGroup, revealItem } from "@/components/site/motion/Reveal";
import { TextReveal } from "@/components/site/motion/TextReveal";
import { CASE_STUDIES, getCaseStudy } from "@/data/case-studies";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return study;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — ARTIXO ONE Case Study` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: `${loaderData.name} — ARTIXO ONE Case Study` },
          { property: "og:description", content: loaderData.summary },
          { property: "og:type", content: "article" },
          { property: "og:url", content: `https://artixo-one.vercel.app/work/${loaderData.slug}` },
        ]
      : [],
    links: loaderData
      ? [{ rel: "canonical", href: `https://artixo-one.vercel.app/work/${loaderData.slug}` }]
      : [],
  }),
  component: CaseStudyPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center bg-base px-4 py-32">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-4xl font-bold text-charcoal">
            Project not found
          </h1>
          <p className="mt-3 text-sm text-charcoal/65">
            We couldn't find that case study. It may have moved.
          </p>
          <a
            href="/#work"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-deep"
          >
            Back to Work <ArrowRight size={16} />
          </a>
        </div>
      </main>
      <Footer />
    </div>
  ),
});

function CaseStudyPage() {
  const study = Route.useLoaderData();
  const more = CASE_STUDIES.filter((c) => c.slug !== study.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-base text-charcoal">
      <Navbar />
      <main>
        <section className="pt-32 sm:pt-40">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <a
                href="/#work"
                className="inline-flex items-center gap-2 text-sm font-medium text-charcoal/60 transition-colors hover:text-gold"
              >
                <ArrowLeft size={16} />
                Back to Work
              </a>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                {study.type} · {study.location}
              </p>
              <TextReveal
                as="h1"
                className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-6xl"
                lines={[[{ text: study.name }]]}
              />
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-charcoal/70">
                {study.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {study.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-cream px-4 py-1.5 text-xs font-medium text-charcoal/75"
                  >
                    {s}
                  </span>
                ))}
                <span className="rounded-full border border-border bg-cream px-4 py-1.5 text-xs font-medium text-charcoal/75">
                  Timeline · {study.timeline}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-12">
              <img
                src={study.img}
                alt={`${study.name} case study cover`}
                className="h-[280px] w-full rounded-3xl object-cover sm:h-[480px]"
              />
            </Reveal>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 lg:grid-cols-2">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                The Challenge
              </p>
              <p className="mt-4 text-lg leading-relaxed text-charcoal/80">
                {study.problem}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                Our Approach
              </p>
              <p className="mt-4 text-lg leading-relaxed text-charcoal/80">
                {study.solution}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                Highlights
              </p>
              <TextReveal
                as="h2"
                className="mt-4 font-serif text-3xl font-bold tracking-tight text-charcoal sm:text-4xl"
                lines={[[{ text: "What we delivered" }]]}
              />
            </Reveal>
            <RevealGroup
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
              stagger={0.1}
            >
              {study.highlights.map((h) => (
                <motion.div
                  key={h}
                  variants={revealItem}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-base p-5"
                >
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-gold" />
                  <span className="text-sm leading-relaxed text-charcoal/80">{h}</span>
                </motion.div>
              ))}
            </RevealGroup>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal className="mb-10 flex items-end justify-between gap-6">
              <TextReveal
                as="h2"
                className="font-serif text-2xl font-bold tracking-tight text-charcoal sm:text-3xl"
                lines={[[{ text: "More Work" }]]}
              />
              <a
                href="/#work"
                className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal/70 transition-colors hover:text-gold"
              >
                View all <ArrowRight size={16} />
              </a>
            </Reveal>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {more.map((p) => (
                <Link
                  key={p.slug}
                  to="/work/$slug"
                  params={{ slug: p.slug }}
                  className="group relative block overflow-hidden rounded-3xl"
                >
                  <img
                    src={p.img}
                    alt={`${p.name} — ${p.type}`}
                    loading="lazy"
                    className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent p-5">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
                      {p.type} · {p.location}
                    </p>
                    <h3 className="mt-1 font-serif text-lg font-semibold text-base">
                      {p.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-charcoal py-20 text-base sm:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <TextReveal
              as="h2"
              className="font-serif text-3xl font-bold tracking-tight sm:text-4xl"
              lines={[[{ text: "Have a project in mind?" }]]}
            />
            <p className="mt-4 text-base/70">
              Let's talk about what you're building — we'll help you scope it, design it and ship it.
            </p>
            <a
              href="/#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-deep"
            >
              Start a Project <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}