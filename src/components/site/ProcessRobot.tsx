import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import robotImg from "@/assets/process/process-robot.png";

/**
 * ARTIXO-branded robot illustration for the Process section. Fades and
 * slides into place, then drifts gently, as the section scrolls through
 * the viewport.
 */
export function ProcessRobot() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const enterY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const floatY = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const y = useTransform([enterY, floatY], ([a, b]: number[]) => (a ?? 0) + (b ?? 0));

  return (
    <div ref={ref} className="pointer-events-none mx-auto max-w-[200px] select-none sm:max-w-[240px] lg:max-w-[280px]">
      <motion.img
        src={robotImg}
        alt="ARTIXO ONE robot illustration"
        style={{ opacity, y }}
        className="h-auto w-full object-contain"
      />
    </div>
  );
}
