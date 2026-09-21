import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/motion/Reveal";
import { TextReveal } from "@/components/site/motion/TextReveal";
import { getBlogPost, getLatestPosts } from "@/data/blog-posts";

const SITE_URL = "https://artixo-one.vercel.app";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — ARTIXO ONE Blog` },
          { name: "description", content: loaderData.seoDescription },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.seoDescription },
          { property: "og:type", content: "article" },
          { property: "og:url", content: `${SITE_URL}/blog/${loaderData.slug}` },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:title", content: loaderData.title },
          { name: "twitter:description", content: loaderData.seoDescription },
        ]
      : [],
    links: loaderData
      ? [{ rel: "canonical", href: `${SITE_URL}/blog/${loaderData.slug}` }]
      : [],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: loaderData.title,
              description: loaderData.seoDescription,
              datePublished: loaderData.publishedAt,
              dateModified: loaderData.publishedAt,
              author: { "@type": "Organization", name: "ARTIXO ONE" },
              publisher: { "@type": "Organization", name: "ARTIXO ONE" },
              mainEntityOfPage: `${SITE_URL}/blog/${loaderData.slug}`,
              keywords: loaderData.tags.join(", "),
            }),
          },
        ]
      : [],
  }),
  component: BlogPostPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center bg-base px-4 py-32">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-4xl font-bold text-charcoal">Post not found</h1>
          <p className="mt-3 text-sm text-charcoal/65">
            We couldn't find that article. It may have moved.
          </p>
          <Link
            to="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-deep"
          >
            Back to Blog <ArrowRight size={16} />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  ),
});

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogPostPage() {
  const post = Route.useLoaderData();
  const more = getLatestPosts(post.slug, 2);

  return (
    <div className="min-h-screen bg-base text-charcoal">
      <Navbar />
      <main>
        <section className="pt-32 sm:pt-40">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-charcoal/60 transition-colors hover:text-gold"
              >
                <ArrowLeft size={16} />
                Back to Blog
              </Link>

              <p className="mt-8 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                <span>{post.category}</span>
                <span className="text-charcoal/30">·</span>
                <span className="font-normal tracking-normal text-charcoal/50">
                  {post.publishedAt ? formatDate(post.publishedAt) : ""} · {post.readingTime}
                </span>
              </p>
              <TextReveal
                as="h1"
                className="mt-4 font-serif text-3xl font-bold leading-tight tracking-tight text-charcoal sm:text-5xl"
                lines={[[{ text: post.title }]]}
              />
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-charcoal/70">
                {post.excerpt}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-cream px-4 py-1.5 text-xs font-medium text-charcoal/75"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6">
            {post.sections.map((section, i) => (
              <Reveal key={section.heading} delay={i * 0.05} className="mb-12 last:mb-0">
                <h2 className="font-serif text-2xl font-bold tracking-tight text-charcoal sm:text-3xl">
                  {section.heading}
                </h2>
                <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-charcoal/80">
                  {section.body}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {more.length > 0 && (
          <section className="bg-cream py-20 sm:py-28">
            <div className="mx-auto max-w-5xl px-6">
              <Reveal className="mb-10 flex items-end justify-between gap-6">
                <TextReveal
                  as="h2"
                  className="font-serif text-2xl font-bold tracking-tight text-charcoal sm:text-3xl"
                  lines={[[{ text: "More from the blog" }]]}
                />
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal/70 transition-colors hover:text-gold"
                >
                  View all <ArrowRight size={16} />
                </Link>
              </Reveal>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {more.map((p) => (
                  <Link
                    key={p.slug}
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="group block rounded-3xl border border-border bg-base p-6 transition-colors hover:border-gold"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
                      {p.category}
                    </p>
                    <h3 className="mt-2 font-serif text-lg font-semibold text-charcoal transition-colors group-hover:text-gold-deep">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

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
