/**
 * Site content — single source of truth for every string, link and asset
 * path used by the moda.studio clone. Content mirrors the source site
 * (https://moda-studio-a6695d6f.base44.app/) verbatim; images are
 * self-hosted under /public (CSP: img-src 'self').
 */

export const SITE = {
  name: "Moda Studio",
  wordmark: "moda.studio",
  tagline: "Contemporary fashion with purpose",
  description:
    "A curated fashion platform showcasing sustainable, minimalist seasonal collections that blend contemporary design with ethical production.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const HERO = {
  eyebrow: "Designed with intention",
  heading: "Contemporary fashion with purpose",
  subtitle:
    "Curated seasonal collections and sustainable essentials that define modern minimalism",
  backgroundImage: "/images/hero-bg.png",
} as const;

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Collections", href: "/#collections" },
  { label: "Essentials", href: "/#essentials" },
  { label: "Sustainability", href: "/#sustainability" },
  { label: "About", href: "/#about" },
] as const;

export interface Product {
  title: string;
  description: string;
  image: string;
  alt: string;
}

export const COLLECTIONS = {
  label: "Seasonal Collections",
  heading: "Autumn / Winter",
  highlightedYear: "2025",
  description:
    "A thoughtful exploration of texture and form, our latest collection balances bold silhouettes with a restrained palette of olive, sand, and charcoal.",
  cta: "Explore the collection",
  viewAll: "View Full Collection",
  products: [
    {
      title: "Oversized Wool Coat",
      description: "Tailored silhouette in heavyweight merino wool",
      image: "/images/wool-coat.jpg",
      alt: "Oversized wool coat with tailored silhouette",
    },
    {
      title: "Structured Blazer",
      description: "Architectural lines with subtle texture",
      image: "/images/blazer.jpg",
      alt: "Structured blazer with architectural lines",
    },
    {
      title: "Pleated Trousers",
      description: "Fluid movement in organic cotton",
      image: "/images/trousers.jpg",
      alt: "Pleated trousers in organic cotton",
    },
  ],
} as const;

export const SUSTAINABILITY = {
  label: "Sustainability",
  heading: "A commitment to better practices",
  description:
    "We believe fashion can be both beautiful and responsible. Our production methods minimize waste and prioritize natural, renewable materials sourced from ethical partners.",
  image: "/images/sustainability.jpg",
  alt: "Sustainable fashion",
  points: [
    "95% natural or recycled materials in every product",
    "Carbon-neutral manufacturing practices",
    "Plastic-free packaging and shipping",
  ],
} as const;

export const ESSENTIALS = {
  label: "Timeless Design",
  heading: "The Essentials",
  description:
    "Cornerstone pieces that transcend seasons, designed to last in both style and construction.",
  items: [
    {
      title: "The Classic Tee",
      description: "Organic cotton in three versatile shades",
      image: "/images/essential-tee.png",
      alt: "The classic tee in organic cotton",
    },
    {
      title: "Relaxed Shirt",
      description: "Breathable linen blend with minimal detail",
      image: "/images/shirt.jpg",
      alt: "Relaxed shirt in breathable linen blend",
    },
    {
      title: "Straight Leg Denim",
      description: "Medium weight with subtle texture",
      image: "/images/denim.jpg",
      alt: "Straight leg denim with subtle texture",
    },
  ],
} as const;

export const ABOUT = {
  label: "About",
  heading: "Our approach to fashion",
  paragraphs: [
    "Founded in 2018, moda.studio began with a simple premise: fashion should inspire without excess. Our design philosophy embraces deliberate minimalism—each piece considered in its purpose, material, and longevity.",
    "Working with a select group of ethical manufacturers across Europe, we create collections that balance contemporary aesthetics with lasting quality. These relationships, built on shared values and transparency, allow us to maintain exceptional standards while reducing environmental impact.",
  ],
  cta: "Learn More About Our Story",
} as const;

export const NEWSLETTER = {
  label: "Stay Connected",
  heading: "Subscribe for early collection access and studio insights",
  placeholder: "Your email address",
  cta: "Subscribe",
} as const;

export interface FooterColumn {
  title: string;
  links: readonly NavLink[];
}

export const FOOTER = {
  description: "Contemporary fashion with purpose, designed in Berlin and crafted ethically.",
  columns: [
    {
      title: "Collections",
      links: [
        { label: "Winter 2025", href: "/#collections" },
        { label: "Spring / Summer 2025", href: "/#collections" },
        { label: "Archive", href: "/#collections" },
      ],
    },
    {
      title: "Information",
      links: [
        { label: "About Us", href: "/#about" },
        { label: "Sustainability", href: "/#sustainability" },
        { label: "Production", href: "/#sustainability" },
        { label: "Stockists", href: "#" },
        { label: "Contact", href: "/#newsletter" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Shipping & Returns", href: "#" },
      ],
    },
  ] as readonly FooterColumn[],
  copyright: "© 2023 moda.studio. All rights reserved.",
} as const;
