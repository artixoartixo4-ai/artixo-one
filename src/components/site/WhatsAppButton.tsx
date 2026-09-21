import { motion } from "framer-motion";

// Business WhatsApp number — same one listed in the Contact section
// ("+94 75 412 0403"), in wa.me format (no spaces, no leading +).
// Update this if the business uses a different number for WhatsApp chats.
const WHATSAPP_NUMBER = "94754120403";
const DEFAULT_MESSAGE = "Hi ARTIXO ONE! I'd like to know more about your services.";

const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  DEFAULT_MESSAGE
)}`;

/**
 * Floating WhatsApp click-to-chat button, fixed to the bottom-left of the
 * viewport on every page (bottom-right is reserved for the Botpress webchat
 * bubble, so the two never overlap).
 */
export function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.8, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 left-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)]"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-40" />
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.68 4.522 1.86 6.36L4 29l7.83-1.82A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm6.99 16.86c-.3.84-1.72 1.6-2.37 1.68-.61.08-1.36.11-2.2-.14-.5-.15-1.15-.37-1.98-.72-3.48-1.5-5.75-4.98-5.92-5.21-.17-.23-1.42-1.89-1.42-3.6 0-1.72.9-2.56 1.22-2.91.31-.34.68-.43.9-.43.23 0 .46 0 .66.01.21.01.5-.08.78.6.3.7.99 2.42 1.08 2.6.09.17.15.38.03.61-.12.23-.18.38-.35.58-.17.21-.36.46-.52.62-.17.17-.35.35-.15.69.2.34.9 1.48 1.93 2.4 1.33 1.18 2.44 1.55 2.78 1.72.34.17.54.15.74-.09.2-.23.85-.99 1.08-1.33.23-.34.46-.28.77-.17.31.11 1.98.93 2.32 1.1.34.17.56.26.65.4.09.15.09.86-.21 1.7Z" />
      </svg>
    </motion.a>
  );
}