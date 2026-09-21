import { useRef } from "react";
import type { MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";

const TILT_SPRING = { stiffness: 260, damping: 22, mass: 0.6 };
const GLARE_SPRING = { stiffness: 220, damping: 26 };

/**
 * Cursor-driven 3D tilt for cards — the card leans away from wherever the
 * pointer sits inside it, with a soft light sheen that tracks the same
 * point and fades in/out on enter/leave. Spread `handlers` and `style` onto
 * a `motion.*` element (and attach `ref`), then render `<TiltGlare {...glare} />`
 * as its last child.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(maxDeg = 8) {
  const ref = useRef<T>(null);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, TILT_SPRING);
  const rotateY = useSpring(rawRotateY, TILT_SPRING);

  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const rawGlareOpacity = useMotionValue(0);
  const glareOpacity = useSpring(rawGlareOpacity, GLARE_SPRING);
  const glareBackground = useTransform([glareX, glareY], (latest) => {
    const [gx, gy] = latest as [number, number];
    return `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.3), transparent 60%)`;
  });

  function onMouseMove(e: MouseEvent<T>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rawRotateY.set((px - 0.5) * maxDeg * 2);
    rawRotateX.set((0.5 - py) * maxDeg * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
    rawGlareOpacity.set(1);
  }

  function onMouseLeave() {
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawGlareOpacity.set(0);
  }

  return {
    ref,
    handlers: { onMouseMove, onMouseLeave },
    style: { rotateX, rotateY, transformPerspective: 900 },
    glare: { background: glareBackground, opacity: glareOpacity },
  };
}

export function TiltGlare({
  background,
  opacity,
}: {
  background: MotionValue<string>;
  opacity: MotionValue<number>;
}) {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit]"
      style={{ background, opacity }}
    />
  );
}
