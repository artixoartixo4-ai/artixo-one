/**
 * Generates public/sitemap.xml before every build.
 *
 * Reads section anchors + case study slugs directly from the site's own
 * data so the sitemap can never drift out of sync with what's actually on
 * the page — add a case study to `src/data/case-studies.ts` and it shows
 * up here automatically on the next build.
 */
import { writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE_URL = "https://artixo-one.vercel.app";
const TODAY = new Date().toISOString().slice(0, 10);

type Entry = { path: string; changefreq: string; priority: string };

const HOME_SECTIONS: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/#about", changefreq: "monthly", priority: "0.6" },
  { path: "/#services", changefreq: "monthly", priority: "0.8" },
  { path: "/#process", changefreq: "monthly", priority: "0.6" },
  { path: "/#pricing", changefreq: "monthly", priority: "0.8" },
  { path: "/#work", changefreq: "weekly", priority: "0.8" },
  { path: "/#contact", changefreq: "monthly", priority: "0.7" },
];

// Read slugs directly from the source text rather than importing the module
// — case-studies.ts also imports image assets via Vite's `@/assets/...`
// resolution, which plain Node/tsx (no Vite pipeline) can't load.
const caseStudiesSource = readFileSync(
  resolve(import.meta.dirname, "../src/data/case-studies.ts"),
  "utf-8",
);
const slugs = [...caseStudiesSource.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

const CASE_STUDY_ENTRIES: Entry[] = slugs.map((slug) => ({
  path: `/work/${slug}`,
  changefreq: "monthly",
  priority: "0.7",
}));

const entries = [...HOME_SECTIONS, ...CASE_STUDY_ENTRIES];

const urlset = entries
  .map(
    (entry) => `  <url>
    <loc>${SITE_URL}${entry.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>
`;

const outPath = resolve(import.meta.dirname, "../public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`sitemap.xml written with ${entries.length} URLs -> ${outPath}`);