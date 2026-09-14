/**
 * Design System page content — documents the brand identity, tokens and
 * interaction patterns implemented by this codebase. Structure mirrors the
 * source site's /DesignSystem page; snippets describe the CSS/React
 * implementation used here (not framer-motion).
 */

export interface BrandValue {
  title: string;
  description: string;
}

export const BRAND_ESSENCE =
  "Moda.Studio embodies contemporary luxury with a focus on minimalist, sustainable fashion. The brand exudes sophistication through clean aesthetics, thoughtful design, and a sense of intentional simplicity that feels both modern and timeless.";

export const BRAND_VALUES: readonly BrandValue[] = [
  {
    title: "Intentional Design",
    description: "Every element serves a purpose, every design choice is deliberate.",
  },
  {
    title: "Sustainable Luxury",
    description: "Premium quality that honors ethical practices and environmental responsibility.",
  },
  {
    title: "Refined Minimalism",
    description: "Beauty in simplicity, with attention to subtle details and textures.",
  },
];

export const HEADLINE_EXAMPLES = [
  "Contemporary fashion with purpose",
  "A commitment to better practices",
  "Designed with intention",
] as const;

export const BODY_COPY_EXAMPLES = [
  "Curated seasonal collections and sustainable essentials that define modern minimalism",
  "We believe fashion can be both beautiful and responsible. Our production methods minimize waste and prioritize natural, renewable materials sourced from ethical partners.",
  "A thoughtful exploration of texture and form, our latest collection balances bold silhouettes with a restrained palette of olive, sand, and charcoal.",
] as const;

export interface TypeScaleItem {
  label: string;
  className: string;
  sample: string;
}

export const TYPE_SCALE: readonly TypeScaleItem[] = [
  {
    label: "H1 - Page Title",
    className: "font-display text-5xl md:text-8xl",
    sample: "Contemporary fashion",
  },
  {
    label: "H2 - Section Title",
    className: "font-display text-3xl md:text-5xl",
    sample: "A commitment to better practices",
  },
  {
    label: "H3 - Component Title",
    className: "font-medium text-xl",
    sample: "Oversized Wool Coat",
  },
  {
    label: "Paragraph",
    className: "font-light text-lg leading-relaxed",
    sample: "Cornerstone pieces that transcend seasons, designed to last in both style and construction.",
  },
];

export interface FontCard {
  name: string;
  role: string;
  cssStack: string;
  weights: string[];
}

export const FONT_CARDS: readonly FontCard[] = [
  {
    name: "Space Grotesk",
    role: "Display / Headings",
    cssStack: "var(--font-space-grotesk), system-ui, sans-serif",
    weights: ["Light", "Regular", "Medium", "Semi Bold"],
  },
  {
    name: "System UI",
    role: "Body / Interface",
    cssStack: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    weights: ["Light", "Regular", "Medium"],
  },
];

export interface ColorSwatch {
  name: string;
  hex: string;
  usage: string;
}

export const COLOR_PALETTE: readonly ColorSwatch[] = [
  { name: "Background", hex: "#f8f7f4", usage: "Primary background color" },
  { name: "Text Primary", hex: "#2c2c2c", usage: "Primary text color" },
  { name: "Text Secondary", hex: "#555555", usage: "Secondary text, descriptions" },
  { name: "Text Tertiary", hex: "#666666", usage: "Labels, less important text (WCAG AA)" },
  { name: "Accent Beige", hex: "#d2c3b4", usage: "Subtle accents, highlights" },
  { name: "Accent Light", hex: "#e9e5de", usage: "Section backgrounds, cards" },
  { name: "White", hex: "#ffffff", usage: "UI elements, cards" },
  { name: "Black", hex: "#000000", usage: "Strong accents, buttons" },
];

export interface AnimationSpec {
  name: string;
  description: string;
  snippet: string;
}

export const ANIMATIONS: readonly AnimationSpec[] = [
  {
    name: "letterAnimation",
    description: "Letter-by-letter animated reveal used for hero headings with custom easing.",
    snippet: `.hero-letter {
  display: inline-block;
  animation: hero-letter 0.8s var(--ease-brand) both;
  animation-delay: calc(var(--i) * 0.04s);
}

@keyframes hero-letter {
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}`,
  },
  {
    name: "fadeIn",
    description: "Subtle animation used for text and UI elements as they enter the viewport.",
    snippet: `[data-reveal] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s var(--ease-brand),
              transform 0.6s var(--ease-brand);
}

[data-reveal][data-visible="true"] {
  opacity: 1;
  transform: translateY(0);
}`,
  },
  {
    name: "staggerContainer",
    description: "Sequential animation of multiple elements with a staggered delay.",
    snippet: `{products.map((product, index) => (
  <Reveal variant="card" delay={index * 120}>
    <ProductCard product={product} />
  </Reveal>
))}`,
  },
  {
    name: "hoverInteractions",
    description: "Subtle scale animations on hover for images and call-to-action buttons.",
    snippet: `.group .card-image {
  transition: transform 0.7s var(--ease-brand);
}

.group:hover .card-image {
  transform: scale(1.05);
}`,
  },
];

export const LAYOUT_RULES = [
  "Max content width: 1280px (max-w-screen-xl)",
  "Section padding: 96px vertical, 24-48px horizontal (py-24 md:py-32 px-6 md:px-12)",
  "Content margin: centered with mx-auto",
  "Grid system: 1 column mobile, 2-4 columns desktop",
] as const;

export const VISUAL_LANGUAGE = [
  "Neutral, desaturated tones that complement the color palette",
  "Clean compositions with ample negative space",
  "Natural lighting that emphasizes texture and form",
  "Minimal props, focusing on the garments themselves",
] as const;

export const GUIDELINE_DO = [
  "Dynamic background media for hero sections, with static fallback images",
  "CSS-powered scroll animations that create visual rhythm and hierarchy",
  "Fully responsive layout with mobile-first approach and adaptive typography",
  "Self-hosted assets served under a strict Content-Security-Policy",
] as const;

export const GUIDELINE_DONT = [
  "Heavy or \"loud\" UI elements that distract from the content",
  "Default-looking form elements and generic buttons",
  "Bright, saturated colors that clash with the neutral palette",
  "Cluttered layouts with insufficient spacing between elements",
  "Generic stock photography that feels inauthentic",
] as const;
