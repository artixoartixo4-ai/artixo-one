import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { AboutStory } from "@/components/site/AboutStory";
import { TechStack } from "@/components/site/TechStack";
import { Stats } from "@/components/site/Stats";
import { Services } from "@/components/site/Services";
import { OurProduct } from "@/components/site/OurProduct";
import { Philosophy } from "@/components/site/Philosophy";
import { Process } from "@/components/site/Process";
import { Pricing } from "@/components/site/Pricing";
import { Industries } from "@/components/site/Industries";
import { Projects } from "@/components/site/Projects";
import { Testimonial } from "@/components/site/Testimonial";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARTIXO ONE — Software & Design Studio" },
      {
        name: "description",
        content:
          "ARTIXO ONE is a software & design studio in Mannar, Sri Lanka crafting software development, UI/UX design, brand design, cloud solutions and mobile apps.",
      },
      { property: "og:title", content: "ARTIXO ONE — Software & Design Studio" },
      {
        property: "og:description",
        content:
          "We build digital products and brand experiences — software development, UI/UX design, brand design, cloud solutions and mobile apps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "ARTIXO ONE — Software & Design Studio" },
      {
        name: "twitter:description",
        content:
          "We build digital products and brand experiences — software development, UI/UX design, brand design, cloud solutions and mobile apps.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://artixo-one.vercel.app" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-base text-charcoal">
      <Navbar />
      <main>
        <Hero />
        <AboutStory />
        <TechStack />
        <Stats />
        <Services />
        <OurProduct />
        <Philosophy />
        <Process />
        <Pricing />
        <Industries />
        <Projects />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}