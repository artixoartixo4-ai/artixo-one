import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal, RevealGroup, revealItem } from "@/components/site/motion/Reveal";
import { TextReveal } from "@/components/site/motion/TextReveal";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "@/data/blog-posts";

const SITE_URL = "https://artixo-one.vercel.app";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — ARTIXO ONE" },
      {
        name: "description",
        content:
          "Insights on software development, UI/UX design, cloud solutions and mobile apps from the ARTIXO ONE team in Mannar, Sri Lanka.",
      },
      { property: "og:title", content: "Blog — ARTIXO ONE" },
      {
        property: "og:description",
        content:
          "Insights on software development, UI/UX design, cloud solutions and mobile apps from the ARTIXO ONE team.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
  component: BlogIndexPage,
});

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-base text-charcoal">
      <Navbar />
      <main>
        <section className="pt-32 sm:pt-40">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                Insights
              </p>
              <TextReveal
                as="h1"
                className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-6xl"
                lines={[[{ text: "The ARTIXO ONE Blog" }]]}
              />
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-charcoal/70">
                Notes on software development, UI/UX design, cloud solutions and mobile apps —
                written from real projects we've shipped in Sri Lanka and beyond.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-6">
            {BLOG_POSTS.length === 0 ? (
              <p className="text-sm text-charcoal/60">
                No posts published yet — check back soon.
              </p>
            ) : (
              <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2" stagger={0.08}>
                {BLOG_POSTS.map((post) => (
                  <motion.div key={post.slug} variants={revealItem}>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="group flex h-full flex-col rounded-3xl border border-border bg-cream p-6 transition-colors hover:border-gold"
                    >
                      <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-gold">
                        <span>{post.category}</span>
                        <span className="text-charcoal/30">·</span>
                        <span className="text-charcoal/50">{post.readingTime}</span>
                      </div>
                      <h2 className="mt-4 font-serif text-xl font-semibold leading-snug text-charcoal transition-colors group-hover:text-gold-deep sm:text-2xl">
                        {post.title}
                      </h2>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/70">
                        {post.excerpt}
                      </p>
                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-xs text-charcoal/50">
                          {post.publishedAt ? formatDate(post.publishedAt) : ""}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal/80 transition-colors group-hover:text-gold-deep">
                          Read <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </RevealGroup>
            )}
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
