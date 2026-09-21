import { useEffect, useRef } from "react";
import mandala from "@/assets/decor/mandala-side.png";

/**
 * Decorative mandala doodle fixed to both edges of the viewport. Present at
 * the root layout (not inside any single section) so it stays visible while
 * scrolling through the whole page, not just the hero. Spins a full 360°+
 * as the page scrolls, tied directly to scroll distance.
 */
export function SideMandala() {
  const leftRef = useRef<HTMLImageElement>(null);
  const rightRef = useRef<HTMLImageElement>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      const angle = window.scrollY * 0.2;
      // Shift each mandala partly past the viewport edge (25% of its own
      // width) so it reads as clipped by the screen — while the underlying
      // image stays the full, uncropped design, so as it rotates, different
      // parts of the full mandala sweep into view.
      if (leftRef.current) {
        leftRef.current.style.transform = `translate(-40%, -50%) rotate(${angle}deg)`;
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translate(40%, -50%) scaleX(-1) rotate(${angle}deg)`;
      }
    };

    const onScroll = () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <>
      <img
        ref={leftRef}
        src={mandala}
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-1/2 z-[1] block w-[130px] opacity-[0.1] mix-blend-multiply sm:w-[180px] md:w-[240px] lg:w-[320px] 2xl:w-[420px]"
      />
      <img
        ref={rightRef}
        src={mandala}
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-1/2 z-[1] block w-[130px] opacity-[0.1] mix-blend-multiply sm:w-[180px] md:w-[240px] lg:w-[320px] 2xl:w-[420px]"
      />
    </>
  );
}