import rawPosts from "./blog-posts-data.json";

export type BlogPostSection = { heading: string; body: string };

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  seoDescription: string;
  tags: string[];
  readingTime: string;
  publishedAt: string | null;
  sections: BlogPostSection[];
};

const ALL_POSTS = rawPosts as BlogPost[];

export const BLOG_POSTS: BlogPost[] = ALL_POSTS.filter((p) => p.publishedAt).sort((a, b) =>
  (b.publishedAt as string).localeCompare(a.publishedAt as string),
);

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getLatestPosts(excludeSlug?: string, limit = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== excludeSlug).slice(0, limit);
}
