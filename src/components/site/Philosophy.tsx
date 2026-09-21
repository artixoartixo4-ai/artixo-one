import { useCallback, useRef } from "react";
import { Reveal } from "@/components/site/motion/Reveal";
import { TextReveal } from "@/components/site/motion/TextReveal";

// Flat-top hexagon grid, tiled as an SVG pattern (66 x 38.105 repeat unit).
const HEX_DIM = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="66" height="38.105" viewBox="0 0 66 38.105">
    <polygon points="22,19.05 11,38.11 -11,38.11 -22,19.05 -11,0 11,0" fill="none" stroke="#2D2D2D" stroke-opacity="0.35" stroke-width="1"/>
    <polygon points="55,0 44,19.05 22,19.05 11,0 22,-19.05 44,-19.05" fill="none" stroke="#2D2D2D" stroke-opacity="0.35" stroke-width="1"/>
  </svg>`
);

const HEX_BRIGHT = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="66" height="38.105" viewBox="0 0 66 38.105">
    <polygon points="22,19.05 11,38.11 -11,38.11 -22,19.05 -11,0 11,0" fill="#C29C53" fill-opacity="0.14" stroke="#C29C53" stroke-opacity="0.8" stroke-width="1"/>
    <polygon points="55,0 44,19.05 22,19.05 11,0 22,-19.05 44,-19.05" fill="#C29C53" fill-opacity="0.14" stroke="#C29C53" stroke-opacity="0.8" stroke-width="1"/>
  </svg>`
);

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);

  const handlePointerMove = useCallback((clientX: number, clientY: number) => {
    const section = sectionRef.current;
    if (!section) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = section.getBoundingClientRect();
      section.style.setProperty("--mx", `${clientX - rect.left}px`);
      section.style.setProperty("--my", `${clientY - rect.top}px`);
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
      onTouchMove={(e) => {
        const t = e.touches[0];
        if (t) handlePointerMove(t.clientX, t.clientY);
      }}
      className="relative overflow-hidden py-28 text-center sm:py-36"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, var(--paper) 0%, color-mix(in oklab, var(--paper) 70%, var(--charcoal)) 100%)",
      }}
    >
      {/* Faint hexagon grid, always visible */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,${HEX_DIM}")`,
          backgroundRepeat: "repeat",
        }}
      />
      {/* Warm glow that follows the cursor, sitting under the bright hex layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--gold) 35%, transparent) 0%, transparent 70%)",
        }}
      />
      {/* Gold hexagon grid, revealed only in a spotlight that follows the cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,${HEX_BRIGHT}")`,
          backgroundRepeat: "repeat",
          WebkitMaskImage:
            "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), black 0%, transparent 75%)",
          maskImage:
            "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), black 0%, transparent 75%)",
        }}
      />

      <div className="relative">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-charcoal/60">
            Our Philosophy
          </p>
        </Reveal>
        <TextReveal
          as="h2"
          className="mx-auto mt-6 max-w-4xl font-serif text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-6xl"
          lines={[
            [{ text: "We don't just build software." }],
            [{ text: "We build experiences.", className: "text-gold" }],
          ]}
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-charcoal/70">
            Every line of code and every pixel serves a purpose — to make your product
            feel effortless for the people who use it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
