import { TechnologyPageConfig } from "@/components/site/TechnologyPage";

const baseCrumbs = (name: string, slug: string) => [
  { name: "Home", path: "/" },
  { name: "Technology", path: "/technology" },
  { name, path: `/technology/${slug}` },
];

export const technologyConfigs: Record<string, TechnologyPageConfig> = {
  "smart-routing": {
    eyebrow: "Technology",
    title: "Smart Routing",
    metaTitle: "Payment Smart Routing | Multi-Acquirer Optimization — BoxCharge",
    metaDescription:
      "Route each transaction with BoxCharge smart routing. Use live approval signals, cost rules, and regional preferences to improve payment outcomes across acquirers.",
    keywords: ["payment smart routing", "multi-acquirer routing", "payment optimization"],
    summary:
      "Performance-aware transaction routing across acquirers and corridors, designed to improve payment outcomes without forcing a full stack rewrite.",
    breadcrumbs: baseCrumbs("Smart Routing", "smart-routing"),
    overview:
      "Smart Routing analyzes acquirer performance, regional context, and merchant configuration to direct each transaction toward the route most likely to succeed. Routing decisions adapt to live performance signals across the BoxCharge acquiring network so teams can balance approval rates, cost, and coverage.",
    howItWorks: [
      { title: "Performance Signals", body: "Live approval performance, latency, and acceptance data inform routing decisions." },
      { title: "Configurable Rules", body: "Routing rules can reflect cost, region, or method preferences." },
      { title: "Adaptive Selection", body: "The routing layer adapts as acquirer and corridor conditions change." },
    ],
    useCases: ["Multi-acquirer merchants", "Regional optimization", "Cost-aware routing", "Card and APM mixed flows"],
    securityBenefits: [
      "Routing decisions audited per transaction.",
      "Operates above tokenized payment data.",
      "No additional PAN exposure introduced by routing.",
    ],
    faq: [
      { q: "Can rules be customized?", a: "Yes. Routing rules can be configured to reflect cost, region, and performance preferences." },
      {
        q: "Does Smart Routing guarantee approvals?",
        a: "No. It is designed to improve routing efficiency and payment outcomes, but performance depends on acquirer and corridor conditions.",
      },
    ],
    related: [
      { label: "Payment Orchestration", to: "/solutions/payment-orchestration", description: "Full orchestration with cascading and failover." },
      { label: "Cascading Payments", to: "/technology/cascading-payments", description: "Retry eligible declines on alternate acquirers." },
      { label: "Cross-Border Gateway", to: "/solutions/cross-border-payment-gateway", description: "Gateway layer that benefits from smarter routes." },
    ],
  },
  "cascading-payments": {
    eyebrow: "Technology",
    title: "Cascading Payments",
    metaTitle: "Cascading Payments | Soft-Decline Recovery Across Acquirers — BoxCharge",
    metaDescription:
      "Recover more approvals with BoxCharge cascading payments. Automatically retry eligible declines across alternative acquirers while respecting network and partner rules.",
    keywords: ["cascading payments", "payment retry logic", "soft decline recovery"],
    summary:
      "Automatic retry across alternative acquirers when an initial transaction attempt is not authorized — helping reduce avoidable declines.",
    breadcrumbs: baseCrumbs("Cascading Payments", "cascading-payments"),
    overview:
      "Cascading payments retry declined transactions through alternative acquirers configured for the merchant, helping reduce avoidable declines while respecting card network and acquirer rules. Each attempt is logged for monitoring and reconciliation.",
    howItWorks: [
      { title: "Initial Attempt", body: "Transaction is routed to the primary acquirer based on rules." },
      { title: "Cascade Trigger", body: "When eligible, declined attempts cascade to a secondary acquirer." },
      { title: "Outcome Logging", body: "Each attempt is logged for monitoring and reconciliation." },
    ],
    useCases: ["Soft-decline recovery", "Acquirer outages", "Corridor-specific failover"],
    securityBenefits: [
      "Cascading respects 3DS context.",
      "Operates on tokenized references where available.",
      "Compliant with acquirer cascading rules.",
    ],
    faq: [
      {
        q: "Is cascading always triggered?",
        a: "No. Cascading runs only for eligible decline reasons and configured fallback paths.",
      },
    ],
    related: [
      { label: "Smart Routing", to: "/technology/smart-routing", description: "Choose the best first route before cascading." },
      { label: "Payment Orchestration", to: "/solutions/payment-orchestration", description: "Combine routing, cascading, and monitoring." },
      { label: "Tokenization", to: "/technology/tokenization", description: "Reuse secure tokens across cascade attempts." },
    ],
  },
  "fraud-prevention": {
    eyebrow: "Technology",
    title: "Fraud Prevention Layer",
    metaTitle: "Payment Fraud Prevention | Velocity Rules & Monitoring — BoxCharge",
    metaDescription:
      "Reduce payment risk with BoxCharge fraud controls. Configurable rules, velocity limits, and transaction monitoring tuned for card-not-present and high-velocity flows.",
    keywords: ["payment fraud prevention", "transaction monitoring", "velocity checks"],
    summary:
      "Rule-based fraud controls, velocity limits, and transaction monitoring designed to support secure payment operations.",
    breadcrumbs: baseCrumbs("Fraud Prevention", "fraud-prevention"),
    overview:
      "The fraud prevention layer combines configurable rules, velocity checks, and monitoring signals applied to inbound transactions. Controls can be tuned per merchant profile in coordination with partner compliance workflows.",
    howItWorks: [
      { title: "Rule Engine", body: "Configurable rules evaluated on each transaction." },
      { title: "Velocity Controls", body: "Frequency and volume thresholds at customer and merchant levels." },
      { title: "Monitoring Signals", body: "Live transaction signals surfaced for operational review." },
    ],
    useCases: ["High-velocity card-not-present", "New customer screening", "Geo and BIN controls"],
    securityBenefits: [
      "Operates pre-authorization where applicable.",
      "Aligned with partner compliance workflows.",
      "No PAN persistence beyond authorized flows.",
    ],
    faq: [
      {
        q: "Is the platform fraud-free?",
        a: "No platform can be fraud-free. The layer is designed to reduce risk through controls and monitoring.",
      },
    ],
    related: [
      { label: "3DS Authentication", to: "/technology/3ds-authentication", description: "Add cardholder authentication where required." },
      { label: "PCI Security", to: "/technology/pci-security", description: "Infrastructure designed for PCI DSS aligned operations." },
      { label: "Contact risk team", to: "/contact", description: "Discuss controls for your vertical and volume profile." },
    ],
  },
  "3ds-authentication": {
    eyebrow: "Technology",
    title: "3DS Authentication",
    metaTitle: "3D Secure (3DS) Authentication for Card Payments — BoxCharge",
    metaDescription:
      "Add 3D Secure to BoxCharge card flows. Support frictionless and challenge authentication for eligible networks, with outcomes passed into authorization.",
    keywords: ["3ds authentication", "3d secure payment", "psd2 sca"],
    summary:
      "3D Secure authentication layer for supported card networks, integrated into the gateway flow for stronger cardholder verification.",
    breadcrumbs: baseCrumbs("3DS Authentication", "3ds-authentication"),
    overview:
      "BoxCharge integrates 3DS authentication for supported card networks, helping align transaction flows with cardholder authentication requirements and regional regulations where applicable.",
    howItWorks: [
      { title: "Frictionless Path", body: "Eligible transactions complete without explicit challenge." },
      { title: "Challenge Flow", body: "Issuers may request additional authentication when required." },
      { title: "Result Handling", body: "Authentication outcome propagates into the authorization request." },
    ],
    useCases: ["EU PSD2 SCA contexts", "High-value transactions", "Issuer-required challenges"],
    securityBenefits: [
      "Cardholder authentication through issuer.",
      "Reduces certain CNP risk categories.",
      "Operates alongside tokenization.",
    ],
    faq: [{ q: "Is 3DS always required?", a: "Requirements vary by region, network, and issuer." }],
    related: [
      { label: "Cross-Border Gateway", to: "/solutions/cross-border-payment-gateway", description: "Gateway flows with built-in 3DS support." },
      { label: "Fraud Prevention", to: "/technology/fraud-prevention", description: "Complement authentication with rule-based controls." },
      { label: "Hosted Checkout", to: "/developers/hosted-checkout", description: "Present 3DS-ready checkout without heavy PCI scope." },
    ],
  },
  "tokenization": {
    eyebrow: "Technology",
    title: "Tokenization",
    metaTitle: "Card Tokenization | Secure Card-on-File Payments — BoxCharge",
    metaDescription:
      "Replace sensitive card data with BoxCharge tokens. Enable safer card-on-file, subscriptions, and cascading retries while reducing PAN exposure in merchant systems.",
    keywords: ["card tokenization", "payment tokenization", "card on file"],
    summary:
      "Advanced card tokenization replaces sensitive card data with secure references for downstream payment operations.",
    breadcrumbs: baseCrumbs("Tokenization", "tokenization"),
    overview:
      "Tokenization replaces card data with non-sensitive references that can be safely stored and reused for repeat transactions, cascading flows, and orchestration decisions without exposing PAN to merchant systems.",
    howItWorks: [
      { title: "Capture", body: "Card data is captured via hosted checkout or compliant flows." },
      { title: "Token Issuance", body: "A secure token is issued and returned." },
      { title: "Reuse", body: "The token is used for subsequent payment operations." },
    ],
    useCases: ["Card-on-file", "Subscriptions", "Cascading retries"],
    securityBenefits: [
      "Reduces PAN scope in merchant systems.",
      "Supports PCI DSS aligned operations.",
      "Enables tokenized cascading.",
    ],
    faq: [
      {
        q: "Where are tokens stored?",
        a: "Tokens are managed inside the BoxCharge platform with secure access controls.",
      },
    ],
    related: [
      { label: "PCI Security", to: "/technology/pci-security", description: "Infrastructure designed to minimize sensitive data exposure." },
      { label: "Cascading Payments", to: "/technology/cascading-payments", description: "Retry using tokenized references." },
      { label: "S2S Integration", to: "/developers/s2s-integration", description: "Use tokens in server-to-server payment flows." },
    ],
  },
  "pci-security": {
    eyebrow: "Technology",
    title: "PCI DSS Aligned Infrastructure",
    metaTitle: "PCI DSS Aligned Payment Infrastructure — BoxCharge",
    metaDescription:
      "Process payments on BoxCharge infrastructure designed for PCI DSS aligned operations — segmented environments, access controls, monitoring, and tokenization.",
    keywords: ["pci dss payment", "secure payment infrastructure", "pci aligned gateway"],
    summary:
      "Infrastructure designed to support PCI DSS aligned operations and partner compliance workflows for card processing merchants.",
    breadcrumbs: baseCrumbs("PCI DSS Aligned Infrastructure", "pci-security"),
    overview:
      "BoxCharge operates infrastructure designed to support PCI DSS aligned payment operations, including segmented environments, access controls, monitoring, and tokenization to minimize PAN exposure.",
    howItWorks: [
      { title: "Segmented Environments", body: "Payment processing components are logically segmented." },
      { title: "Access Controls", body: "Role-based access to sensitive systems." },
      { title: "Monitoring", body: "Operational monitoring and logging of access and transactions." },
    ],
    useCases: ["Card processing merchants", "Tokenized card-on-file flows", "Multi-acquirer integrations"],
    securityBenefits: [
      "Designed for PCI DSS aligned operations.",
      "Minimized PAN exposure through tokenization.",
      "Access and activity monitoring.",
    ],
    faq: [
      {
        q: "Is BoxCharge a card network?",
        a: "No. BoxCharge operates as a payment infrastructure provider working with acquiring and partner relationships.",
      },
    ],
    related: [
      { label: "Tokenization", to: "/technology/tokenization", description: "Reduce PAN scope with secure tokens." },
      { label: "Fraud Prevention", to: "/technology/fraud-prevention", description: "Add rules and velocity controls." },
      { label: "Merchant Protection", to: "/policies/merchant-protection", description: "Read how we approach merchant safeguards." },
    ],
  },
};
