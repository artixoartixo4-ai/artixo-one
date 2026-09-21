import { Reveal } from "@/components/site/motion/Reveal";
import { TextReveal } from "@/components/site/motion/TextReveal";

type Tech = {
  name: string;
  icon: string;
};

const TECHNOLOGIES: Tech[] = [
  { name: "React", icon: "/tech-icons/react.svg" },
  { name: "Next.js", icon: "/tech-icons/nextjs.svg" },
  { name: "TypeScript", icon: "/tech-icons/ts.svg" },
  { name: "Node.js", icon: "/tech-icons/nodejs.svg" },
  { name: "Python", icon: "/tech-icons/python.svg" },
  { name: "Flutter", icon: "/tech-icons/flutter.svg" },
  { name: "Tailwind CSS", icon: "/tech-icons/tailwind.svg" },
  { name: "Supabase", icon: "/tech-icons/supabase.svg" },
  { name: "PostgreSQL", icon: "/tech-icons/postgres.svg" },
  { name: "AWS", icon: "/tech-icons/aws.svg" },
  { name: "Docker", icon: "/tech-icons/docker.svg" },
  { name: "Figma", icon: "/tech-icons/figma.svg" },
  { name: "n8n", icon: "/tech-icons/n8n.svg" },
  { name: "Claude", icon: "/tech-icons/claude.svg" },
];

// Duplicated once so the strip can loop seamlessly at -50% translateX.
const LOOP = [...TECHNOLOGIES, ...TECHNOLOGIES];

export function TechStack() {
  return (
    <section className="border-y border-border bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto mb-10 max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Our Toolkit
          </p>
          <TextReveal
            as="h2"
            className="mt-4 font-serif text-3xl font-bold leading-tight tracking-tight text-charcoal sm:text-4xl"
            lines={[[{ text: "Technologies We Work With" }]]}
          />
        </Reveal>
      </div>

      <div
        className="group relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="animate-marquee flex w-max items-center gap-5 group-hover:[animation-play-state:paused]">
          {LOOP.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex shrink-0 items-center gap-3 rounded-2xl border border-border bg-base px-6 py-4"
            >
              <img
                src={tech.icon}
                alt={tech.name}
                loading="lazy"
                className="h-8 w-8 shrink-0"
              />
              <span className="whitespace-nowrap text-sm font-semibold text-charcoal/80">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
