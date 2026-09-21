import { motion } from "framer-motion";
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/components/site/motion/Reveal";
import { TextReveal } from "@/components/site/motion/TextReveal";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    if (!next) {
      // Unmuting is a direct user gesture, so this is always allowed to play.
      video.play().catch(() => {});
    }
    setIsMuted(next);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Some browsers don't reliably honor the autoPlay attribute after
    // client-side hydration (the very first play() attempt can be aborted
    // by a still-in-flight load), so kick playback off explicitly and keep
    // retrying via the media lifecycle events plus a user-gesture fallback.
    video.muted = true;
    let settled = false;

    const attemptPlay = () => {
      if (settled) return;
      video
        .play()
        .then(() => {
          settled = true;
        })
        .catch(() => {
          /* will retry on the next event or user gesture */
        });
    };

    const resume = () => attemptPlay();

    attemptPlay();
    video.addEventListener("loadeddata", attemptPlay);
    video.addEventListener("canplay", attemptPlay);
    window.addEventListener("pointerdown", resume);
    window.addEventListener("touchstart", resume);

    return () => {
      video.removeEventListener("loadeddata", attemptPlay);
      video.removeEventListener("canplay", attemptPlay);
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("touchstart", resume);
    };
  }, []);

  return (
    <motion.section
      id="top"
      className="isolate relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="absolute inset-0 -z-20">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/videos/hero-welcome.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, color-mix(in oklab, var(--paper) 30%, transparent) 0%, color-mix(in oklab, var(--paper) 50%, transparent) 45%, color-mix(in oklab, var(--paper) 78%, transparent) 100%)",
        }}
      />

      <motion.button
        type="button"
        onClick={toggleMute}
        variants={item}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        className="absolute right-5 top-24 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 bg-base/60 text-charcoal backdrop-blur-sm sm:right-8 sm:top-28"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </motion.button>

      <motion.span
        variants={item}
        className="relative mb-8 inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-base/40 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-charcoal/70 backdrop-blur-sm"
      >
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-gold"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        Premier Software & Design Studio
      </motion.span>

      <TextReveal
        as="h1"
        className="relative font-serif text-5xl font-bold leading-[0.95] tracking-tight text-charcoal sm:text-7xl md:text-8xl"
        style={{ textShadow: "0 2px 24px color-mix(in oklab, var(--paper) 70%, transparent)" }}
        lines={[
          [{ text: "BUILD YOUR" }],
          [{ text: "DIGITAL FUTURE", className: "text-gold" }],
        ]}
        delay={0.15}
        stagger={0.06}
      />

      <motion.p
        variants={item}
        className="relative mt-8 max-w-xl text-sm font-medium uppercase tracking-[0.2em] text-charcoal/70 sm:text-base"
      >
        Software Development · UI/UX Design · Brand Design · Since 2026
      </motion.p>

      <motion.div
        variants={item}
        className="relative mt-10 flex flex-col items-center gap-3 sm:flex-row"
      >
        <motion.a
          href="#work"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-deep"
        >
          View Our Work
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </motion.a>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 rounded-full bg-base px-7 py-3.5 text-sm font-semibold text-charcoal ring-1 ring-charcoal/10 transition-colors hover:bg-cream"
        >
          Free Consultation
        </motion.a>
      </motion.div>

      <motion.a
        variants={item}
        href="#services"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-charcoal/50"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-charcoal/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-full bg-charcoal/60"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </motion.section>
  );
}
