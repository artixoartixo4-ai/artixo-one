import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, EASE } from "@/components/site/motion/Reveal";

export function Testimonial() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal y={40}>
          <div className="relative rounded-3xl bg-base p-10 text-center shadow-[0_30px_80px_-40px_rgba(45,45,45,0.45)] sm:p-14">
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-full bg-gold text-charcoal"
            >
              <Quote size={20} />
            </motion.span>

            <div className="mb-6 flex justify-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
                >
                  <Star size={20} fill="currentColor" strokeWidth={0} />
                </motion.span>
              ))}
            </div>

            <p className="font-serif text-2xl font-medium italic leading-relaxed text-charcoal sm:text-3xl">
              "ARTIXO ONE transformed a vague idea into a polished product that our
              users genuinely love. The craft and care across design and engineering
              were exceptional from first call to launch."
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-charcoal font-serif text-base font-bold text-gold">
                N
              </span>
              <div className="text-left">
                <p className="font-semibold text-charcoal">Nimal Perera</p>
                <p className="text-xs uppercase tracking-[0.15em] text-charcoal/55">
                  Ledger Point · Colombo · 2025
                </p>
              </div>
            </div>
          </div>
        </Reveal>
        <p className="mt-6 text-center text-xs uppercase tracking-[0.2em] text-charcoal/40">
          Sample testimonial — replace with a real client quote
        </p>
      </div>
    </section>
  );
}
