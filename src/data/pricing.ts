export type Tier = {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export const TIERS: Tier[] = [
  {
    name: "Starter",
    price: "LKR 25,000",
    tagline: "For MVPs, landing pages & small business sites.",
    features: [
      "Up to 5 pages / screens",
      "Responsive design, mobile-first",
      "Basic SEO setup",
      "1 round of revisions",
      "2 week delivery",
      "Email support",
    ],
    cta: "Get Started",
  },
  {
    name: "Growth",
    price: "LKR 300,000",
    tagline: "For businesses ready to scale their product.",
    features: [
      "Custom web / mobile app development",
      "Full UI/UX design system",
      "E-commerce or app integrations",
      "3 rounds of revisions",
      "4 week delivery",
      "30 days of post-launch support",
      "Priority support channel",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    tagline: "For complex products, platforms & ongoing work.",
    features: [
      "Full-stack development at scale",
      "Cloud architecture & DevOps",
      "Dedicated project manager",
      "Unlimited revisions during build",
      "Ongoing maintenance & SLA",
      "Dedicated support channel",
    ],
    cta: "Talk to Us",
  },
];

export function getTier(name: string): Tier | undefined {
  return TIERS.find((t) => t.name === name);
}

/** Fired on `window` when a visitor picks a package from the Pricing section. */
export const PACKAGE_SELECTED_EVENT = "artixo:package-selected";
