import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, revealItem } from "@/components/site/motion/Reveal";
import { TextReveal } from "@/components/site/motion/TextReveal";
import posProduct from "@/assets/product/pos-product.jpg";
import storeProduct from "@/assets/product/store-product.jpg";

type Product = {
  badge: string;
  name: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
};

const PRODUCTS: Product[] = [
  {
    badge: "Built In-House",
    name: "ARTIXO POS",
    description:
      "Beyond client work, we build and run our own products. ARTIXO POS is the point-of-sale system we designed in-house for retail and hospitality businesses — the same software powering the solutions we deliver to clients, now available as a product of its own.",
    features: [
      "Fast billing & invoicing at the counter",
      "Real-time inventory across every branch",
      "Sales, staff & shift reporting dashboard",
      "Works offline, syncs when you're back online",
      "Card, QR and mobile-pay ready",
    ],
    image: posProduct,
    imageAlt: "ARTIXO POS in use at a retail checkout counter",
  },
  {
    badge: "Built In-House",
    name: "ARTIXO Store",
    description:
      "ARTIXO Store is our own e-commerce platform for businesses that want to sell online without stitching together plugins. Product catalogs, checkout and order fulfillment in one system — built by us, used by us, and ready for your store.",
    features: [
      "Storefront, catalog & checkout out of the box",
      "Order tracking and shipment updates for customers",
      "Inventory synced with your ARTIXO POS counter sales",
      "Secure payments — cards, wallets and mobile pay",
      "Built to scale from a handful of products to thousands",
    ],
    image: storeProduct,
    imageAlt: "Small business owner managing online orders and packages",
  },
];

function ProductRow({ product, reverse }: { product: Product; reverse: boolean }) {
  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <Reveal className={reverse ? "order-2 lg:order-2" : "order-2 lg:order-1"}>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Our Product
        </p>
        <TextReveal
          as="h3"
          className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-5xl"
          lines={[[{ text: product.name }]]}
        />
        <p className="mt-5 max-w-lg text-base leading-relaxed text-charcoal/70">
          {product.description}
        </p>

        <RevealGroup className="mt-8 flex flex-col gap-3" stagger={0.08}>
          {product.features.map((f) => (
            <motion.div key={f} variants={revealItem} className="flex items-start gap-3">
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 text-gold"
                strokeWidth={2}
              />
              <span className="text-sm leading-relaxed text-charcoal/80">{f}</span>
            </motion.div>
          ))}
        </RevealGroup>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-deep"
        >
          Get a Demo
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </motion.a>
      </Reveal>

      <Reveal className={reverse ? "order-1 lg:order-1" : "order-1 lg:order-2"} delay={0.1}>
        <div className="relative overflow-hidden rounded-3xl border border-border shadow-[0_30px_70px_-30px_rgba(45,45,45,0.45)]">
          <img
            src={product.image}
            alt={product.imageAlt}
            loading="lazy"
            className="h-[420px] w-full object-cover sm:h-[520px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
          <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-base/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-charcoal backdrop-blur-sm">
            {product.badge}
          </span>
        </div>
      </Reveal>
    </div>
  );
}

export function OurProduct() {
  return (
    <section id="product" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-24 px-6 sm:gap-32">
        {PRODUCTS.map((product, i) => (
          <ProductRow key={product.name} product={product} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
