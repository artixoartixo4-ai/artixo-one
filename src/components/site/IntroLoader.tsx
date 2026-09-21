import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const SESSION_KEY = "artixo-intro-seen";
// Safety net only — the intro normally ends on the video's own "ended" event.
// Set a little past the clip's actual runtime in case autoplay ever stalls.
const FALLBACK_MS = 9000;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Effects never run during SSR, so this is safe — it just avoids the
// (harmless but noisy) "useLayoutEffect does nothing on the server" warning.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Full-screen cinematic brand intro that plays once per browser session,
 * right before the page's own content/entrance animations settle. The
 * logo-reveal clip drifts and tilts slightly toward the cursor for a subtle
 * parallax feel, plus a soft light that follows the pointer. Skips itself
 * instantly (no flash, no fade) on repeat views within the same session and
 * for visitors who prefer reduced motion.
 */
export function IntroLoader() {
  const [show, setShow] = useState(true);
  const [skip, setSkip] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Raw pointer position, normalized to roughly [-0.5, 0.5] on each axis.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  // Spring-smoothed so the video eases toward the cursor instead of snapping.
  const springX = useSpring(pointerX, { stiffness: 55, damping: 18, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 55, damping: 18, mass: 0.6 });

  const videoX = useTransform(springX, [-0.5, 0.5], [-28, 28]);
  const videoY = useTransform(springY, [-0.5, 0.5], [-20, 20]);
  const videoRotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);
  const videoRotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);

  // The glow tracks the raw (un-sprung) pointer for a snappier highlight.
  const glowX = useTransform(pointerX, [-0.5, 0.5], ["15%", "85%"]);
  const glowY = useTransform(pointerY, [-0.5, 0.5], ["15%", "85%"]);

  useIsomorphicLayoutEffect(() => {
    let alreadySeen = false;
    let reducedMotion = false;
    try {
      alreadySeen = sessionStorage.getItem(SESSION_KEY) === "true";
      reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      // Storage/matchMedia can throw in locked-down private browsing modes —
      // fall back to always showing the animation once.
    }

    if (alreadySeen || reducedMotion) {
      setSkip(true);
      setShow(false);
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // Non-fatal — worst case the intro plays again next load.
    }

    document.body.style.overflow = "hidden";
    const fallback = setTimeout(() => setShow(false), FALLBACK_MS);
    return () => clearTimeout(fallback);
  }, []);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    pointerX.set(e.clientX / window.innerWidth - 0.5);
    pointerY.set(e.clientY / window.innerHeight - 0.5);
  }

  function toggleMute(e: React.MouseEvent) {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    if (!next) video.play().catch(() => {});
    setIsMuted(next);
  }

  if (skip) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          onClick={() => setShow(false)}
          onPointerMove={handlePointerMove}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="fixed inset-0 z-[100] cursor-pointer select-none overflow-hidden bg-black"
          style={{ perspective: 1200 }}
        >
          <motion.video
            ref={videoRef}
            src="/videos/artixo-logo-reveal.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => setShow(false)}
            onError={() => setShow(false)}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              x: videoX,
              y: videoY,
              rotateX: videoRotateX,
              rotateY: videoRotateY,
              scale: 1.1,
            }}
          />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 mix-blend-screen blur-3xl"
            style={{
              left: glowX,
              top: glowY,
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--gold) 55%, transparent), transparent 70%)",
            }}
          />

          <motion.button
            type="button"
            onClick={toggleMute}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            aria-label={isMuted ? "Unmute intro" : "Mute intro"}
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-base/15 bg-black/40 text-base backdrop-blur-sm transition-colors hover:bg-black/60 sm:right-8 sm:top-8"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </motion.button>

          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShow(false);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="absolute bottom-6 right-6 z-10 rounded-full border border-base/15 bg-black/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-base/75 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-base sm:bottom-8 sm:right-8"
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
