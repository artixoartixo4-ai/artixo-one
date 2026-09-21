import { MapPin, Phone, Mail, ArrowRight, Package, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Reveal, RevealGroup, revealItem } from "@/components/site/motion/Reveal";
import { TextReveal } from "@/components/site/motion/TextReveal";
import { getTier, PACKAGE_SELECTED_EVENT, type Tier } from "@/data/pricing";
import { generateProposalPdf } from "@/lib/generate-proposal-pdf";

const CONTACTS = [
  { icon: MapPin, label: "Visit Us", value: "Mannar, Sri Lanka 41000" },
  { icon: Phone, label: "Call Us", value: "+94 75 412 0403" },
  { icon: Mail, label: "Email Us", value: "artixoartixo46@gmail.com" },
];

const PROJECT_TYPES = [
  "Software Development",
  "UI/UX Design",
  "Brand Design",
  "Cloud Solutions",
  "Mobile App",
  "Strategy & Consulting",
  "Other",
];

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);

  useEffect(() => {
    function onPackageSelected(e: Event) {
      const detail = (e as CustomEvent<{ name: string }>).detail;
      const tier = detail ? getTier(detail.name) : undefined;
      if (tier) setSelectedTier(tier);
    }
    window.addEventListener(PACKAGE_SELECTED_EVENT, onPackageSelected);
    return () => window.removeEventListener(PACKAGE_SELECTED_EVENT, onPackageSelected);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const projectType = String(data.get("projectType") ?? "").trim();
    const messageRaw = String(data.get("message") ?? "").trim();
    const message = selectedTier
      ? `[Interested in the ${selectedTier.name} package]${messageRaw ? " " + messageRaw : ""}`
      : messageRaw;

    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone || null,
      project_type: projectType || null,
      message: message || null,
    });
    setSubmitting(false);

    if (error) {
      // eslint-disable-next-line no-console
      console.error("Contact form submission failed:", error);
      toast.error("Something went wrong sending your enquiry. Please try again.");
      return;
    }

    try {
      generateProposalPdf({
        firstName,
        lastName,
        email,
        phone,
        projectType,
        message: messageRaw,
        tier: selectedTier ?? undefined,
      });
    } catch (pdfError) {
      // eslint-disable-next-line no-console
      console.error("Proposal PDF generation failed:", pdfError);
    }

    form.reset();
    setSelectedTier(null);
    toast.success(
      selectedTier
        ? "Thanks! Your proposal PDF is downloading — we'll also be in touch shortly."
        : "Thanks! Your enquiry has been received — we'll be in touch shortly."
    );
  }

  return (
    <section id="contact" className="bg-base py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-14 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Get In Touch
          </p>
          <TextReveal
            as="h2"
            className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-6xl"
            lines={[[{ text: "Let's Build" }], [{ text: "Together", className: "text-gold" }]]}
          />
          <p className="mt-6 text-base leading-relaxed text-charcoal/70">
            Ready to build your digital product? Our team is here to guide you every
            step of the way — from first conversation to final launch.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <RevealGroup className="flex flex-col gap-4" stagger={0.1}>
            {CONTACTS.map((c) => (
              <motion.div
                key={c.label}
                variants={revealItem}
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="flex items-center gap-5 rounded-3xl border border-border bg-cream p-6"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-charcoal text-base">
                  <c.icon size={20} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-charcoal/55">
                    {c.label}
                  </p>
                  <p className="mt-1 font-serif text-lg font-medium text-charcoal">
                    {c.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </RevealGroup>

          <Reveal y={40} delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-base p-6 shadow-[0_30px_80px_-40px_rgba(45,45,45,0.35)] sm:p-8"
            >
              {selectedTier && (
                <div className="mb-5 flex items-center justify-between gap-3 rounded-2xl border border-gold/40 bg-gold/10 px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Package size={18} className="shrink-0 text-gold" />
                    <p className="text-sm font-medium text-charcoal">
                      {selectedTier.name} package selected
                      <span className="ml-1.5 font-normal text-charcoal/60">
                        — a proposal PDF will download when you submit.
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedTier(null)}
                    aria-label="Remove selected package"
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-charcoal/50 transition-colors hover:bg-charcoal/10 hover:text-charcoal"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="First Name" name="firstName" placeholder="John" />
                <Field label="Last Name" name="lastName" placeholder="Doe" />
                <Field label="Email Address" name="email" type="email" placeholder="john@company.com" />
                <Field label="Phone Number" name="phone" type="tel" placeholder="+94 75 412 0403" />
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-charcoal/55">
                  Project Type
                </label>
                <select
                  name="projectType"
                  defaultValue=""
                  className="w-full rounded-2xl border border-border bg-cream px-4 py-3 text-sm text-charcoal outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
                >
                  <option value="" disabled>
                    Select a service…
                  </option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-charcoal/55">
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about your project…"
                  className="w-full resize-none rounded-2xl border border-border bg-cream px-4 py-3 text-sm text-charcoal outline-none transition placeholder:text-charcoal/35 focus:border-gold focus:ring-2 focus:ring-gold/30"
                />
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-deep disabled:opacity-70"
              >
                {submitting ? "Sending…" : selectedTier ? "Send & Download Proposal" : "Send Enquiry"}
                {!submitting && <ArrowRight size={16} />}
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-charcoal/55">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border bg-cream px-4 py-3 text-sm text-charcoal outline-none transition placeholder:text-charcoal/35 focus:border-gold focus:ring-2 focus:ring-gold/30"
      />
    </div>
  );
}
