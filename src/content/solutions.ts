import { SolutionPageConfig } from "@/components/site/SolutionPage";

const baseCrumbs = (name: string, slug: string) => [
  { name: "Home", path: "/" },
  { name: "Solutions", path: "/solutions" },
  { name, path: `/solutions/${slug}` },
];

export const solutionConfigs: Record<string, SolutionPageConfig> = {
  "global-merchant-services": {
    eyebrow: "Solution",
    title: "Global Merchant Services",
    summary:
      "International merchant account enablement and acquiring connectivity for businesses operating across global markets, subject to onboarding and partner review.",
    breadcrumbs: baseCrumbs("Global Merchant Services", "global-merchant-services"),
    supports:
      "Cross-border payment acceptance, merchant connectivity through trusted acquiring relationships, multi-currency processing flows, and secure transaction handling for legitimate businesses operating under applicable local laws.",
    capabilities: [
      { title: "International Acquiring", body: "Connectivity to acquiring partners across multiple regions and currencies." },
      { title: "Multi-Currency Processing", body: "Accept and settle in multiple currencies through partner relationships." },
      { title: "Merchant Onboarding", body: "Structured onboarding aligned with documentation and compliance review." },
      { title: "Risk-Aware Setup", body: "Risk and compliance review applied to every merchant profile." },
      { title: "Reporting & Analytics", body: "Centralized transaction view across merchant accounts and corridors." },
      { title: "Operational Support", body: "Coordinated support during business hours or agreed support windows." },
    ],
    steps: ["Application", "Review", "Integration", "Activation"],
    techLayer: ["Smart Routing", "Tokenization", "3DS Authentication", "Fraud Prevention", "S2S API", "Hosted Checkout"],
    faq: [
      { q: "Who can apply?", a: "Legitimate businesses operating in accordance with applicable laws. Availability depends on jurisdiction, documentation, and partner review." },
      { q: "How long does activation take?", a: "Activation timelines depend on onboarding review, documentation completeness, and partner availability." },
      { q: "Do you support multiple currencies?", a: "Yes, multi-currency processing is supported through partner acquiring relationships, subject to corridor availability." },
    ],
  },

  "offshore-merchant-accounts": {
    eyebrow: "Solution",
    title: "Offshore Merchant Accounts",
    summary:
      "Structured offshore merchant account enablement through partner-led onboarding for businesses operating across multiple jurisdictions.",
    breadcrumbs: baseCrumbs("Offshore Merchant Accounts", "offshore-merchant-accounts"),
    supports:
      "International merchant enablement, multi-jurisdiction payment connectivity, and structured documentation review for businesses with cross-border processing requirements.",
    capabilities: [
      { title: "Multi-Jurisdiction Setup", body: "Partner connectivity across multiple international jurisdictions." },
      { title: "Documentation Review", body: "Structured review aligned with partner and compliance requirements." },
      { title: "Currency Flexibility", body: "Multi-currency support through partner acquiring relationships." },
      { title: "Centralized Operations", body: "Single point of contact for setup, integration, and ongoing operations." },
      { title: "Risk Framework", body: "Risk-aware profile review for each merchant application." },
      { title: "Settlement Flexibility", body: "Settlement flows aligned with corridor and partner availability." },
    ],
    steps: ["Application", "Documentation", "Partner Review", "Activation"],
    techLayer: ["Hosted Checkout", "S2S API", "Webhooks", "Tokenization", "Smart Routing"],
    faq: [
      { q: "Is approval guaranteed?", a: "No. Applications are reviewed through onboarding and compliance checks before activation." },
      { q: "What documentation is required?", a: "Documentation requirements vary by jurisdiction and partner. Our team coordinates the full list during onboarding." },
    ],
  },

  "cross-border-payment-gateway": {
    eyebrow: "Solution",
    title: "Cross-Border Payment Gateway",
    summary:
      "Secure gateway connectivity for accepting and processing payments across regions with multi-currency support and partner-led acquiring.",
    breadcrumbs: baseCrumbs("Cross-Border Payment Gateway", "cross-border-payment-gateway"),
    supports:
      "Card and APM acceptance across multiple corridors, multi-currency presentment and processing, and secure transaction flows through partner acquiring relationships.",
    capabilities: [
      { title: "Card Acceptance", body: "Accept major card networks through partner acquiring connectivity." },
      { title: "APM Connectivity", body: "Local and regional alternative payment methods where available." },
      { title: "Multi-Currency Presentment", body: "Display and process amounts in multiple presentation currencies." },
      { title: "Secure Gateway Layer", body: "3DS, tokenization, and transaction-level security controls." },
      { title: "Hosted & S2S Flows", body: "Hosted checkout and server-to-server integration options." },
      { title: "Reporting", body: "Unified transaction reporting across regions and methods." },
    ],
    steps: ["Application", "Integration", "Testing", "Activation"],
    techLayer: ["Hosted Checkout", "S2S API", "3DS Authentication", "Tokenization", "Smart Routing", "Webhooks"],
    faq: [
      { q: "Which regions are supported?", a: "Coverage depends on merchant profile, region, partner availability, and onboarding review." },
      { q: "Do you support 3DS?", a: "Yes, the gateway includes a 3DS authentication layer for supported networks." },
    ],
  },

  "payment-orchestration": {
    eyebrow: "Solution",
    title: "Payment Orchestration",
    summary:
      "Route transactions intelligently using cascading logic, multi-acquirer connectivity, and performance-based routing designed to improve payment outcomes.",
    breadcrumbs: baseCrumbs("Payment Orchestration", "payment-orchestration"),
    supports:
      "Multi-acquirer routing, cascading payment logic, MDR-aware routing, regional optimization, failover handling, and approval performance monitoring.",
    capabilities: [
      { title: "Cascading Routing", body: "Automatic retry across acquirers when an initial attempt does not authorize." },
      { title: "Multi-Acquirer Connectivity", body: "Single integration, multiple acquiring partners." },
      { title: "MDR-Based Routing", body: "Route based on configured cost and performance preferences." },
      { title: "Failover Logic", body: "Transaction failover when a route is unavailable." },
      { title: "Regional Optimization", body: "Route to the acquirer best aligned with the customer's region." },
      { title: "Performance Monitoring", body: "Approval performance visibility across acquirers and corridors." },
    ],
    steps: ["Connect", "Configure Rules", "Test", "Go Live"],
    techLayer: ["Smart Routing", "Cascading Payments", "S2S API", "Webhooks", "Transaction Monitoring"],
    faq: [
      { q: "Does orchestration guarantee higher approvals?", a: "No. Orchestration is designed to improve routing efficiency and payment outcomes, but performance depends on acquirer and corridor conditions." },
      { q: "Can routing rules be customized?", a: "Yes, routing rules can be configured to reflect cost, region, and performance preferences." },
    ],
  },

  "apm-connectivity": {
    eyebrow: "Solution",
    title: "Alternative Payment Methods",
    summary:
      "Expand payment acceptance with regional APM connectivity across selected markets in Asia, Africa, Europe, and additional corridors as they become available.",
    breadcrumbs: baseCrumbs("Alternative Payment Methods", "apm-connectivity"),
    supports:
      "Local and regional payment method acceptance, bank transfer flows, wallet integrations, and customer-preferred payment options where available through partner infrastructure.",
    capabilities: [
      { title: "Bank Transfer APMs", body: "Account-to-account payment methods across selected corridors." },
      { title: "Wallet Connectivity", body: "Regional wallet integrations where available." },
      { title: "Localized Checkout", body: "Show payment options aligned with customer region and currency." },
      { title: "Single Integration", body: "Connect once and enable multiple APMs through one layer." },
      { title: "Settlement Coordination", body: "Settlement flows aligned with each APM's processing model." },
      { title: "Coverage Reviews", body: "Coverage updates as new corridors and partners are enabled." },
    ],
    steps: ["Select APMs", "Configure", "Integrate", "Go Live"],
    techLayer: ["Hosted Checkout", "S2S API", "Webhooks", "Tokenization"],
    faq: [
      { q: "Which APMs are available?", a: "APM availability depends on merchant profile, region, partner availability, and onboarding review." },
    ],
  },

  "iban-settlement": {
    eyebrow: "Solution",
    title: "IBAN & SEPA Settlement Solutions",
    summary:
      "Collect and pay out across the SEPA zone via dedicated IBANs — EUR settlement, SEPA Instant where supported, and SEPA Credit Transfer to any euro-area beneficiary.",
    breadcrumbs: baseCrumbs("IBAN & SEPA Settlement Solutions", "iban-settlement"),
    supports:
      "Dedicated and virtual IBANs for SEPA pay-in and pay-out, multi-currency settlement, and structured payout flows for businesses operating across the SEPA zone (36 countries) and wider international corridors.",
    capabilities: [
      { title: "SEPA Pay-in", body: "Accept SEPA Direct Debit and SEPA Instant Credit Transfer into your IBAN, with auto-reconciliation by reference." },
      { title: "SEPA Pay-out", body: "Send SEPA Credit Transfers (SCT) and SEPA Instant (SCT Inst) to any euro IBAN — T+0 where supported, T+1 standard." },
      { title: "Dedicated & Virtual IBANs", body: "Issue per-merchant or per-customer IBANs for clean reconciliation and segregated flows." },
      { title: "Multi-Currency Settlement", body: "Settle in EUR, GBP, USD and more through partner relationships." },
      { title: "Reporting & Reconciliation", body: "Daily statements, transaction-level reporting, and webhook events for every credit and debit." },
      { title: "Partner Connectivity", body: "Account infrastructure powered by regulated EU and UK banking partners." },
    ],
    steps: ["Application", "KYB Review", "IBAN Issuance", "Activation"],
    techLayer: ["SEPA SCT", "SEPA SCT Inst", "SEPA Direct Debit", "S2S API", "Webhooks", "Transaction Monitoring"],
    faq: [
      { q: "Which SEPA countries are covered?", a: "All 36 SEPA-zone countries for SEPA Credit Transfer and SEPA Direct Debit, including all 27 EU states plus the UK, Switzerland, Norway, Iceland, Liechtenstein, Monaco, Andorra, San Marino and Vatican City." },
      { q: "Can I pay out to my customers via SEPA?", a: "Yes. You can send SEPA Credit Transfers and SEPA Instant payments to any euro IBAN — typically arriving within seconds for SCT Inst, or T+1 for standard SCT." },
      { q: "What is the difference between dedicated and virtual IBANs?", a: "A dedicated IBAN is issued in your company name; virtual IBANs are sub-accounts under a master IBAN, useful for per-customer or per-invoice reconciliation." },
      { q: "Are IBAN accounts always available?", a: "Availability depends on jurisdiction, merchant profile, and partner infrastructure. KYB review is required." },
    ],
  },
};
