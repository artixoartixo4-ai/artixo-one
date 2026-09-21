import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type CountUpProps = {
  value: string;
  duration?: number;
  className?: string;
};

/** Animates a "120+" / "98%" style stat counting up once it scrolls into view. */
export function CountUp({ value, duration = 1600, className }: CountUpProps) {
  const match = value.match(/^([\d,.]+)(.*)$/);
  const numericPart = match?.[1] ?? "0";
  const target = parseFloat(numericPart.replace(/,/g, ""));
  const suffix = match?.[2] ?? "";
  const decimals = numericPart.includes(".") ? numericPart.split(".")[1]?.length ?? 0 : 0;

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || !match) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (!match) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
