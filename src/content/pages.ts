// Pages registry — the single source of truth for editable content blocks.
// Add a new editable region by adding an entry below, then read it on the page
// with useContent('slug').c('block_key', 'fallback').

export type BlockType =
  | "text"
  | "textarea"
  | "markdown"
  | "html"
  | "image"
  | "list";

export interface BlockDef {
  key: string;
  label: string;
  type: BlockType;
  help?: string;
  itemFields?: { key: string; label: string; type: "text" | "textarea" | "markdown" | "image" }[];
}

export interface PageDef {
  slug: string;
  label: string;
  blocks: BlockDef[];
}

// Standard hero block set used by most pages.
function heroBlocks(): BlockDef[] {
  return [
    { key: "hero_eyebrow", label: "Hero eyebrow", type: "text" },
    { key: "hero_headline", label: "Hero headline", type: "text" },
    { key: "hero_subheadline", label: "Hero subheadline / subtitle", type: "textarea" },
    { key: "hero_cta_primary_label", label: "Primary CTA label", type: "text" },
    { key: "hero_cta_primary_href", label: "Primary CTA link", type: "text" },
    { key: "hero_cta_secondary_label", label: "Secondary CTA label", type: "text" },
    { key: "hero_cta_secondary_href", label: "Secondary CTA link", type: "text" },
  ];
}

function metaBlocks(): BlockDef[] {
  return [
    { key: "meta_title", label: "SEO title", type: "text", help: "Used in <title> + OG title. Brand suffix is added only if BoxCharge is not already in the title." },
    {
      key: "meta_description",
      label: "SEO description",
      type: "textarea",
      help: "Used in meta description + og:description + twitter:description.",
    },
    {
      key: "og_image",
      label: "OG / social share image",
      type: "image",
      help: "Open Graph + Twitter image (recommended 1200×630). Falls back to the site default if empty.",
    },
  ];
}

function contentHtmlBlock(help?: string): BlockDef {
  return {
    key: "content_html",
    label: "Full page content",
    type: "html",
    help:
      help ??
      "Rich editor — when saved, this replaces the default page sections on the live site.",
  };
}

function sectionHeaderBlocks(prefix: string, label: string): BlockDef[] {
  return [
    { key: `${prefix}_eyebrow`, label: `${label} — eyebrow`, type: "text" },
    { key: `${prefix}_title`, label: `${label} — title`, type: "text" },
    { key: `${prefix}_subtitle`, label: `${label} — subtitle`, type: "textarea" },
  ];
}

function simplePage(slug: string, label: string, extra: BlockDef[] = []): PageDef {
  const html =
    slug === "home"
      ? contentHtmlBlock(
          "Replaces the ENTIRE homepage (hero + all sections). Leave empty to use section fields below.",
        )
      : contentHtmlBlock();
  return { slug, label, blocks: [html, ...metaBlocks(), ...heroBlocks(), ...extra] };
}

/** Public URL for a built-in page slug (null for site-wide only slugs). */
export function getPublicPath(slug: string): string | null {
  if (slug === "global") return null;
  if (slug === "home") return "/";
  return `/${slug}`;
}

export function getPageCategory(slug: string): string {
  if (slug === "global") return "Site-wide";
  if (slug === "home") return "Main";
  const top = slug.split("/")[0];
  const map: Record<string, string> = {
    about: "Main",
    contact: "Main",
    faq: "Main",
    payouts: "Main",
    blog: "Blog",
    solutions: "Solutions",
    technology: "Technology",
    developers: "Developers",
    policies: "Policies",
  };
  return map[top] ?? "Other";
}

const SOLUTION_SLUGS: Array<[string, string]> = [
  ["global-merchant-services", "Global Merchant Services"],
  ["offshore-merchant-accounts", "Offshore Merchant Accounts"],
  ["cross-border-payment-gateway", "Cross-Border Payment Gateway"],
  ["payment-orchestration", "Payment Orchestration"],
  ["apm-connectivity", "APM Connectivity"],
  ["iban-settlement", "IBAN & SEPA Settlement"],
];

const TECHNOLOGY_SLUGS: Array<[string, string]> = [
  ["smart-routing", "Smart Routing"],
  ["cascading-payments", "Cascading Payments"],
  ["fraud-prevention", "Fraud Prevention"],
  ["3ds-authentication", "3DS Authentication"],
  ["tokenization", "Tokenization"],
  ["pci-security", "PCI-Aligned Security"],
];

const DEVELOPER_SLUGS: Array<[string, string]> = [
  ["api-integration", "API Integration"],
  ["s2s-integration", "S2S Integration"],
  ["webhooks", "Webhooks"],
  ["hosted-checkout", "Hosted Checkout"],
];

const POLICY_SLUGS: Array<[string, string]> = [
  ["privacy", "Privacy Policy"],
  ["terms", "Terms of Use"],
  ["aml", "AML Policy"],
  ["merchant-protection", "Merchant Protection"],
  ["chargeback", "Chargeback Management"],
];

const BLOG_POST_SLUGS: Array<[string, string]> = [
  ["understanding-payment-orchestration", "Understanding Payment Orchestration"],
  ["apm-connectivity-explained", "APM Connectivity Explained"],
  ["designing-for-pci-aligned-operations", "Designing for PCI DSS Aligned Operations"],
];

export const PAGES: PageDef[] = [
  {
    slug: "global",
    label: "Global (site-wide)",
    blocks: [
      { key: "site_name", label: "Site name", type: "text" },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "header_cta_label", label: "Header CTA label", type: "text", help: "Top-right Apply button." },
      { key: "header_cta_href", label: "Header CTA link", type: "text" },
      { key: "footer_blurb", label: "Footer blurb", type: "textarea" },
      { key: "footer_email", label: "Footer email", type: "text" },
      { key: "footer_domain", label: "Footer domain text", type: "text" },
      { key: "whatsapp_number", label: "WhatsApp number", type: "text", help: "International format, digits only (e.g. 447700900123)." },
      { key: "expert_band_title", label: "Expert band title", type: "text" },
      { key: "expert_band_subtitle", label: "Expert band subtitle", type: "text" },
    ],
  },

  simplePage("home", "Home page", [
    {
      key: "badge_lines",
      label: "Hero rotating badge lines",
      type: "list",
      itemFields: [{ key: "text", label: "Line", type: "text" }],
    },
    { key: "hero_tagline", label: "Hero tagline (below subtitle)", type: "text" },
    {
      key: "stats",
      label: "Stats strip",
      type: "list",
      itemFields: [
        { key: "value", label: "Value", type: "text" },
        { key: "suffix", label: "Suffix (e.g. +, %)", type: "text" },
        { key: "label", label: "Label", type: "text" },
        { key: "decimals", label: "Decimal places", type: "text" },
      ],
    },
    {
      key: "stats_footer",
      label: "Stats strip — footer note",
      type: "text",
    },
    ...sectionHeaderBlocks("solutions", "Solutions section"),
    {
      key: "solutions_cards",
      label: "Solutions — cards",
      type: "list",
      itemFields: [
        { key: "title", label: "Title", type: "text" },
        { key: "body", label: "Description", type: "textarea" },
      ],
    },
    ...sectionHeaderBlocks("routing", "Routing section"),
    {
      key: "routing_points",
      label: "Routing — bullet points",
      type: "list",
      itemFields: [{ key: "text", label: "Point", type: "text" }],
    },
    ...sectionHeaderBlocks("security", "Security section"),
    {
      key: "security_items",
      label: "Security — feature labels",
      type: "list",
      itemFields: [{ key: "text", label: "Label", type: "text" }],
    },
    { key: "security_footer", label: "Security — footer note", type: "text" },
    ...sectionHeaderBlocks("apm", "APM section"),
    {
      key: "apm_methods",
      label: "APM — payment method names",
      type: "list",
      itemFields: [{ key: "name", label: "Name", type: "text" }],
    },
    { key: "apm_footer", label: "APM — footer note", type: "text" },
    ...sectionHeaderBlocks("developers", "Developers section"),
    {
      key: "developers_chips",
      label: "Developers — feature chips",
      type: "list",
      itemFields: [{ key: "text", label: "Chip label", type: "text" }],
    },
    ...sectionHeaderBlocks("why", "Why BoxCharge section"),
    {
      key: "why_cards",
      label: "Why — cards",
      type: "list",
      itemFields: [
        { key: "title", label: "Title", type: "text" },
        { key: "body", label: "Description", type: "textarea" },
      ],
    },
    ...sectionHeaderBlocks("launch", "Launch CTA section"),
    {
      key: "launch_bullets",
      label: "Launch CTA — bullets",
      type: "list",
      itemFields: [{ key: "text", label: "Bullet", type: "text" }],
    },
    {
      key: "launch_steps",
      label: "Launch CTA — steps",
      type: "list",
      itemFields: [{ key: "text", label: "Step", type: "text" }],
    },
    { key: "launch_cta_label", label: "Launch CTA — button label", type: "text" },
    { key: "mini_cta_1_text", label: "Mini CTA 1 — text", type: "textarea" },
    { key: "mini_cta_1_label", label: "Mini CTA 1 — button", type: "text" },
    { key: "mini_cta_2_text", label: "Mini CTA 2 — text", type: "textarea" },
    { key: "mini_cta_2_label", label: "Mini CTA 2 — button", type: "text" },
    {
      key: "faq_items",
      label: "FAQ — questions (General tab)",
      type: "list",
      itemFields: [
        { key: "q", label: "Question", type: "text" },
        { key: "a", label: "Answer", type: "textarea" },
      ],
    },
    {
      key: "hidden_sections",
      label: "Hide sections",
      type: "list",
      help:
        "Section IDs: logo_wall, stats, partner_wall, solutions, mini_cta_1, payin_payout, routing, transaction_flow, console_tour, security_badges, coverage_map, industries, testimonials, mini_cta_2, roi, security, compare, apm, checkout_tour, developers, why, insights, launch, faq",
      itemFields: [{ key: "id", label: "Section ID", type: "text" }],
    },
  ]),

  simplePage("about", "About page", [
    { key: "body", label: "About body (markdown)", type: "markdown" },
  ]),

  simplePage("contact", "Contact page", [
    { key: "intro", label: "Intro paragraph", type: "textarea" },
    { key: "contact_email", label: "Contact email", type: "text" },
  ]),

  simplePage("faq", "FAQ page"),
  simplePage("payouts", "Payouts page"),
  simplePage("blog", "Blog index"),
  simplePage("solutions", "Solutions index"),
  simplePage("technology", "Technology index"),
  simplePage("developers", "Developers index"),

  ...BLOG_POST_SLUGS.map(([s, label]) =>
    simplePage(`blog/${s}`, `Post — ${label}`, [
      { key: "post_tag", label: "Post tag", type: "text" },
      { key: "post_date", label: "Post date", type: "text", help: "YYYY-MM-DD" },
      { key: "post_body", label: "Post body (markdown)", type: "markdown" },
    ]),
  ),

  ...SOLUTION_SLUGS.map(([s, label]) => simplePage(`solutions/${s}`, `Solution — ${label}`)),
  ...TECHNOLOGY_SLUGS.map(([s, label]) => simplePage(`technology/${s}`, `Technology — ${label}`)),
  ...DEVELOPER_SLUGS.map(([s, label]) => simplePage(`developers/${s}`, `Developers — ${label}`)),
  ...POLICY_SLUGS.map(([s, label]) =>
    simplePage(`policies/${s}`, `Policy — ${label}`, [
      { key: "intro", label: "Intro paragraph", type: "textarea" },
      { key: "body", label: "Policy body (markdown)", type: "markdown" },
    ]),
  ),
];

export function getPageDef(slug: string): PageDef | undefined {
  return PAGES.find((p) => p.slug === slug);
}
