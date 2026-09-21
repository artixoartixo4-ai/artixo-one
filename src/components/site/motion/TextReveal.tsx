import { motion, type Variants } from "framer-motion";
import type { CSSProperties, ElementType } from "react";
import { EASE } from "@/components/site/motion/Reveal";

export type TextPart = { text: string; className?: string };

type TextRevealProps = {
  /** Each inner array is one visual line (mirrors a <br/>), rendered as a block. */
  lines: TextPart[][];
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Seconds between each word's animation start. */
  stagger?: number;
  /** Extra delay before the first word starts, in seconds. */
  delay?: number;
  amount?: number;
  once?: boolean;
};

/**
 * Animates heading/paragraph text in word-by-word as it scrolls into view —
 * each word slides up out of a clipped mask rather than the whole line
 * fading at once. `lines` lets a heading keep its existing line breaks and
 * per-segment coloring (e.g. a gold-highlighted word) while still animating
 * every word in sequence across the whole heading.
 *
 * A single `whileInView` observer sits on the outer heading element, and
 * every word animates via variant propagation (staggerChildren) rather than
 * each word running its own viewport observer — dozens of tiny per-word
 * IntersectionObserver targets turned out to be unreliable in practice (they
 * could remain permanently unfired), so the heading itself is the only
 * element whose visibility is actually observed.
 */
export function TextReveal({
  lines,
  as: Tag = "span",
  className,
  style,
  stagger = 0.045,
  delay = 0,
  amount = 0.4,
  once = true,
}: TextRevealProps) {
  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.span;

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const word: Variants = {
    hidden: { y: "115%", opacity: 0 },
    show: { y: "0%", opacity: 1, transition: { duration: 0.6, ease: EASE } },
  };

  let wordIndex = 0;

  return (
    <MotionTag
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block">
          {line.map((part, partIdx) => {
            const words = part.text.split(" ");
            return (
              <span key={partIdx} className={part.className}>
                {words.flatMap((w, i) => {
                  const idx = wordIndex++;
                  const wordSpan = (
                    <span
                      key={`w-${idx}`}
                      className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] align-bottom"
                    >
                      <motion.span className="inline-block" variants={word}>
                        {w}
                      </motion.span>
                    </span>
                  );
                  // The trailing space is a plain text node OUTSIDE the
                  // clipped/animated wrapper, so normal inline whitespace
                  // layout applies and words don't run together.
                  return i < words.length - 1 ? [wordSpan, " "] : [wordSpan];
                })}
              </span>
            );
          })}
        </span>
      ))}
    </MotionTag>
  );
}
