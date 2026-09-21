import project1 from "@/assets/projects/project-1.jpg";
import project2 from "@/assets/projects/project-2.jpg";
import project3 from "@/assets/projects/project-3.jpg";
import project4 from "@/assets/projects/project-4.jpg";
import project5 from "@/assets/projects/project-5.jpg";

export type CaseStudy = {
  slug: string;
  name: string;
  type: string;
  location: string;
  img: string;
  summary: string;
  problem: string;
  solution: string;
  highlights: string[];
  services: string[];
  timeline: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "ledger-point",
    name: "Ledger Point",
    type: "Fintech Platform",
    location: "Colombo",
    img: project1,
    summary:
      "A digital ledger & payments platform for a Colombo-based fintech, built for speed, security and scale.",
    problem:
      "The client's existing ledger process was spreadsheet-driven and couldn't keep up with growing transaction volume — leading to reconciliation delays and manual errors.",
    solution:
      "We designed and built a cloud-native ledger platform with real-time transaction processing, role-based access control and automated reconciliation, backed by a PostgreSQL data layer and a modern React dashboard.",
    highlights: [
      "Real-time transaction dashboard",
      "Automated daily reconciliation",
      "Bank-grade role-based security",
      "Built to scale with transaction volume",
    ],
    services: ["Software Development", "Cloud Solutions", "UI/UX Design"],
    timeline: "10 weeks",
  },
  {
    slug: "pulse",
    name: "Pulse",
    type: "Mobile App",
    location: "Dubai",
    img: project2,
    summary:
      "A cross-platform mobile app for a Dubai wellness brand, connecting members to classes, trainers and progress tracking.",
    problem:
      "The brand relied on manual bookings over WhatsApp and phone calls, making it hard to scale membership or track attendance accurately.",
    solution:
      "We built a cross-platform mobile app with one-tap class booking, push notifications and a trainer dashboard, integrated with their existing membership system.",
    highlights: [
      "One-tap class booking",
      "Push notifications for reminders",
      "Trainer & attendance dashboard",
      "iOS & Android from one codebase",
    ],
    services: ["Mobile App", "UI/UX Design"],
    timeline: "8 weeks",
  },
  {
    slug: "maison-co",
    name: "Maison&Co",
    type: "Brand Identity",
    location: "Chennai",
    img: project3,
    summary:
      "A full brand identity system for a Chennai interiors studio — from logo to packaging to digital presence.",
    problem:
      "The studio's visual identity felt inconsistent across print, signage and social media, undercutting its premium positioning.",
    solution:
      "We crafted a cohesive brand system — logo, typography, colour palette and templates — then applied it consistently across their website, social media and print collateral.",
    highlights: [
      "Unified brand system across channels",
      "New logo & typography suite",
      "Social media & print templates",
      "Refreshed website presence",
    ],
    services: ["Brand Design", "UI/UX Design"],
    timeline: "6 weeks",
  },
  {
    slug: "nimbus",
    name: "Nimbus",
    type: "Cloud SaaS",
    location: "Singapore",
    img: project4,
    summary:
      "A multi-tenant SaaS platform for a Singapore logistics startup, built to onboard new customers self-serve.",
    problem:
      "The startup's MVP was a single-tenant prototype — every new customer needed manual engineering work before they could go live.",
    solution:
      "We re-architected the platform for multi-tenancy on the cloud, adding self-serve onboarding, usage-based billing and an admin console so the team could onboard customers without engineering involvement.",
    highlights: [
      "Self-serve customer onboarding",
      "Multi-tenant cloud architecture",
      "Usage-based billing integration",
      "Admin console for the ops team",
    ],
    services: ["Software Development", "Cloud Solutions"],
    timeline: "12 weeks",
  },
  {
    slug: "signal",
    name: "Signal",
    type: "Analytics UI",
    location: "Berlin",
    img: project5,
    summary:
      "A data analytics dashboard for a Berlin B2B team, turning raw product data into decisions.",
    problem:
      "Stakeholders were exporting raw data into spreadsheets to build reports — a slow, error-prone process that delayed decisions.",
    solution:
      "We designed and built an analytics dashboard with customisable views, saved filters and shareable reports, connected directly to their data warehouse.",
    highlights: [
      "Customisable analytics dashboards",
      "Saved filters & shareable reports",
      "Direct data warehouse connection",
      "Faster, self-serve reporting",
    ],
    services: ["UI/UX Design", "Software Development"],
    timeline: "9 weeks",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
