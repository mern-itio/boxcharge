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
    metaTitle: "Global Merchant Account Services | Multi-Currency Acquiring — BoxCharge",
    metaDescription:
      "Open international merchant accounts with BoxCharge. Multi-currency acquiring, structured onboarding, and global payment acceptance for legitimate businesses expanding across borders.",
    keywords: [
      "global merchant services",
      "international merchant account",
      "multi-currency acquiring",
      "cross-border merchant account",
    ],
    summary:
      "International merchant account enablement and acquiring connectivity for businesses operating across global markets — with structured onboarding and partner-led activation.",
    breadcrumbs: baseCrumbs("Global Merchant Services", "global-merchant-services"),
    supports:
      "Cross-border payment acceptance, merchant connectivity through trusted acquiring relationships, multi-currency processing flows, and secure transaction handling for legitimate businesses operating under applicable local laws. BoxCharge coordinates documentation, risk review, and partner activation so you can accept cards and local methods in the markets that matter to your customers.",
    detail:
      "Growing brands often need more than a single domestic acquirer. Global Merchant Services helps you establish payment connectivity across regions without stitching together unrelated providers. From first application through integration and go-live, our team aligns your business profile with suitable acquiring partners, currencies, and reporting so operations stay clear as volume scales.",
    capabilities: [
      {
        title: "International Acquiring",
        body: "Connectivity to acquiring partners across multiple regions and currencies for card and local payment flows.",
      },
      {
        title: "Multi-Currency Processing",
        body: "Accept and settle in multiple currencies through partner relationships aligned with your sales corridors.",
      },
      {
        title: "Merchant Onboarding",
        body: "Structured KYB and documentation review designed to reduce delays and keep activation predictable.",
      },
      {
        title: "Risk-Aware Setup",
        body: "Risk and compliance review applied to every merchant profile before live processing begins.",
      },
      {
        title: "Reporting & Analytics",
        body: "Centralized transaction visibility across merchant accounts, corridors, and settlement cycles.",
      },
      {
        title: "Operational Support",
        body: "Coordinated support during business hours or agreed windows for onboarding and production issues.",
      },
    ],
    steps: ["Application", "Review", "Integration", "Activation"],
    techLayer: ["Smart Routing", "Tokenization", "3DS Authentication", "Fraud Prevention", "S2S API", "Hosted Checkout"],
    faq: [
      {
        q: "Who can apply?",
        a: "Legitimate businesses operating in accordance with applicable laws. Availability depends on jurisdiction, documentation, and partner review.",
      },
      {
        q: "How long does activation take?",
        a: "Activation timelines depend on onboarding review, documentation completeness, and partner availability.",
      },
      {
        q: "Do you support multiple currencies?",
        a: "Yes, multi-currency processing is supported through partner acquiring relationships, subject to corridor availability.",
      },
    ],
    related: [
      {
        label: "Cross-Border Payment Gateway",
        to: "/solutions/cross-border-payment-gateway",
        description: "Secure multi-currency gateway connectivity for international checkout.",
      },
      {
        label: "Payment Orchestration",
        to: "/solutions/payment-orchestration",
        description: "Route payments across acquirers to improve approval efficiency.",
      },
      {
        label: "Offshore Merchant Accounts",
        to: "/solutions/offshore-merchant-accounts",
        description: "Partner-led offshore merchant enablement for multi-jurisdiction businesses.",
      },
      {
        label: "Payment insights on the blog",
        to: "/blog",
        description: "Guides on merchant accounts, gateways, and global payment operations.",
      },
    ],
  },

  "offshore-merchant-accounts": {
    eyebrow: "Solution",
    title: "Offshore Merchant Accounts",
    metaTitle: "Offshore Merchant Account Provider | High-Risk Friendly Setup — BoxCharge",
    metaDescription:
      "Apply for an offshore merchant account with BoxCharge. Partner-led onboarding, multi-jurisdiction acquiring, and structured compliance review for international payment processing.",
    keywords: [
      "offshore merchant account",
      "offshore payment processing",
      "high risk merchant account",
      "international merchant account provider",
    ],
    summary:
      "Structured offshore merchant account enablement through partner-led onboarding for businesses that need multi-jurisdiction payment connectivity.",
    breadcrumbs: baseCrumbs("Offshore Merchant Accounts", "offshore-merchant-accounts"),
    supports:
      "International merchant enablement, multi-jurisdiction payment connectivity, and structured documentation review for businesses with cross-border processing requirements. Ideal when domestic acquiring options are limited, when you sell into multiple regions, or when your operating model needs flexible settlement corridors.",
    detail:
      "An offshore merchant account is not a shortcut around compliance — it is a structured path to partner acquiring that fits international business models. BoxCharge coordinates documentation, risk review, and activation with acquiring partners so you understand requirements up front and can move from application to live payments with clearer expectations.",
    capabilities: [
      {
        title: "Multi-Jurisdiction Setup",
        body: "Partner connectivity across multiple international jurisdictions aligned with your operating model.",
      },
      {
        title: "Documentation Review",
        body: "Structured KYB and compliance documentation collection coordinated with partner requirements.",
      },
      {
        title: "Currency Flexibility",
        body: "Multi-currency support through partner acquiring relationships where corridors are available.",
      },
      {
        title: "Centralized Operations",
        body: "Single point of contact for setup, integration, settlement questions, and ongoing operations.",
      },
      {
        title: "Risk Framework",
        body: "Risk-aware profile review for each merchant application before processing is enabled.",
      },
      {
        title: "Settlement Flexibility",
        body: "Settlement flows aligned with corridor availability, payout preferences, and partner banking rails.",
      },
    ],
    steps: ["Application", "Documentation", "Partner Review", "Activation"],
    techLayer: ["Hosted Checkout", "S2S API", "Webhooks", "Tokenization", "Smart Routing"],
    faq: [
      {
        q: "Is approval guaranteed?",
        a: "No. Applications are reviewed through onboarding and compliance checks before activation.",
      },
      {
        q: "What documentation is required?",
        a: "Documentation requirements vary by jurisdiction and partner. Our team coordinates the full list during onboarding.",
      },
      {
        q: "Is this suitable for high-risk verticals?",
        a: "Certain higher-risk verticals may be considered where partners allow. Availability depends on business model, documentation, and partner appetite.",
      },
    ],
    related: [
      {
        label: "Global Merchant Services",
        to: "/solutions/global-merchant-services",
        description: "International merchant enablement and multi-currency acquiring.",
      },
      {
        label: "IBAN & SEPA Settlement",
        to: "/solutions/iban-settlement",
        description: "Collect and pay out across the SEPA zone with dedicated IBANs.",
      },
      {
        label: "Contact a specialist",
        to: "/contact",
        description: "Discuss offshore merchant account options for your business model.",
      },
      {
        label: "BoxCharge Blog",
        to: "/blog",
        description: "Read practical guides on merchant accounts and payment setup.",
      },
    ],
  },

  "cross-border-payment-gateway": {
    eyebrow: "Solution",
    title: "Cross-Border Payment Gateway",
    metaTitle: "Cross-Border Payment Gateway | Multi-Currency Online Payments — BoxCharge",
    metaDescription:
      "Accept cross-border payments with BoxCharge. Card and APM gateway connectivity, multi-currency presentment, 3DS security, and hosted or server-to-server checkout.",
    keywords: [
      "cross-border payment gateway",
      "international payment gateway",
      "multi-currency payment gateway",
      "online payment processing",
    ],
    summary:
      "Secure gateway connectivity for accepting and processing payments across regions with multi-currency support and partner-led acquiring.",
    breadcrumbs: baseCrumbs("Cross-Border Payment Gateway", "cross-border-payment-gateway"),
    supports:
      "Card and APM acceptance across multiple corridors, multi-currency presentment and processing, and secure transaction flows through partner acquiring relationships. Merchants can launch with hosted checkout or integrate server-to-server APIs while keeping authentication, tokenization, and reporting in one layer.",
    detail:
      "Cross-border checkout fails when currency, method, or issuer friction is ignored. BoxCharge’s gateway layer combines acquiring connectivity with 3DS, tokenization, and routing so international customers can pay in familiar currencies and methods — while your teams get unified status webhooks and reconciliation.",
    capabilities: [
      {
        title: "Card Acceptance",
        body: "Accept major card networks through partner acquiring connectivity with authentication support.",
      },
      {
        title: "APM Connectivity",
        body: "Local and regional alternative payment methods where partner coverage exists.",
      },
      {
        title: "Multi-Currency Presentment",
        body: "Display and process amounts in multiple presentation currencies for better conversion.",
      },
      {
        title: "Secure Gateway Layer",
        body: "3DS, tokenization, and transaction-level security controls built into the payment flow.",
      },
      {
        title: "Hosted & S2S Flows",
        body: "Choose PCI-friendly hosted checkout or full server-to-server API control.",
      },
      {
        title: "Reporting",
        body: "Unified transaction reporting across regions, methods, and settlement cycles.",
      },
    ],
    steps: ["Application", "Integration", "Testing", "Activation"],
    techLayer: ["Hosted Checkout", "S2S API", "3DS Authentication", "Tokenization", "Smart Routing", "Webhooks"],
    faq: [
      {
        q: "Which regions are supported?",
        a: "Coverage depends on merchant profile, region, partner availability, and onboarding review.",
      },
      {
        q: "Do you support 3DS?",
        a: "Yes, the gateway includes a 3DS authentication layer for supported networks.",
      },
      {
        q: "Can I use hosted checkout and APIs together?",
        a: "Yes. Many merchants start with hosted checkout and expand to S2S for custom flows.",
      },
    ],
    related: [
      {
        label: "Alternative Payment Methods",
        to: "/solutions/apm-connectivity",
        description: "Add local wallets, bank transfers, and regional methods.",
      },
      {
        label: "3DS Authentication",
        to: "/technology/3ds-authentication",
        description: "Cardholder authentication for supported networks.",
      },
      {
        label: "Hosted Checkout",
        to: "/developers/hosted-checkout",
        description: "PCI-friendly checkout pages with branding controls.",
      },
      {
        label: "Developer docs",
        to: "/developers",
        description: "APIs, webhooks, and integration guides for your stack.",
      },
    ],
  },

  "payment-orchestration": {
    eyebrow: "Solution",
    title: "Payment Orchestration",
    metaTitle: "Payment Orchestration Platform | Smart Routing & Cascading — BoxCharge",
    metaDescription:
      "Improve payment outcomes with BoxCharge orchestration. Multi-acquirer routing, cascading retries, MDR-aware rules, and failover designed for higher approval efficiency.",
    keywords: [
      "payment orchestration",
      "payment smart routing",
      "cascading payments",
      "multi-acquirer routing",
    ],
    summary:
      "Route transactions intelligently using cascading logic, multi-acquirer connectivity, and performance-based routing designed to improve payment outcomes.",
    breadcrumbs: baseCrumbs("Payment Orchestration", "payment-orchestration"),
    supports:
      "Multi-acquirer routing, cascading payment logic, MDR-aware routing, regional optimization, failover handling, and approval performance monitoring. Orchestration helps reduce avoidable declines and single-acquirer dependency without forcing a full stack rewrite.",
    detail:
      "When one acquirer declines or underperforms, revenue is left on the table. BoxCharge orchestration evaluates configured rules and live signals to choose routes, then cascades eligible declines to alternative partners. Teams keep one integration while gaining multi-acquirer resilience and clearer performance visibility.",
    capabilities: [
      {
        title: "Cascading Routing",
        body: "Automatic retry across acquirers when an initial attempt does not authorize and cascading is eligible.",
      },
      {
        title: "Multi-Acquirer Connectivity",
        body: "Single integration with multiple acquiring partners behind one payment layer.",
      },
      {
        title: "MDR-Based Routing",
        body: "Route based on configured cost and performance preferences where rules allow.",
      },
      {
        title: "Failover Logic",
        body: "Transaction failover when a preferred route is unavailable or degraded.",
      },
      {
        title: "Regional Optimization",
        body: "Route toward acquirers better aligned with the customer’s region and method.",
      },
      {
        title: "Performance Monitoring",
        body: "Approval performance visibility across acquirers, corridors, and time windows.",
      },
    ],
    steps: ["Connect", "Configure Rules", "Test", "Go Live"],
    techLayer: ["Smart Routing", "Cascading Payments", "S2S API", "Webhooks", "Transaction Monitoring"],
    faq: [
      {
        q: "Does orchestration guarantee higher approvals?",
        a: "No. Orchestration is designed to improve routing efficiency and payment outcomes, but performance depends on acquirer and corridor conditions.",
      },
      {
        q: "Can routing rules be customized?",
        a: "Yes, routing rules can be configured to reflect cost, region, and performance preferences.",
      },
    ],
    related: [
      {
        label: "Smart Routing",
        to: "/technology/smart-routing",
        description: "Performance-aware route selection across acquirers.",
      },
      {
        label: "Cascading Payments",
        to: "/technology/cascading-payments",
        description: "Automatic retries on eligible soft declines.",
      },
      {
        label: "Cross-Border Gateway",
        to: "/solutions/cross-border-payment-gateway",
        description: "Gateway connectivity that pairs with orchestration.",
      },
      {
        label: "Blog & guides",
        to: "/blog",
        description: "Read more about routing, approvals, and payment ops.",
      },
    ],
  },

  "apm-connectivity": {
    eyebrow: "Solution",
    title: "Alternative Payment Methods",
    metaTitle: "Alternative Payment Methods (APMs) | Local Wallets & Bank Rails — BoxCharge",
    metaDescription:
      "Expand checkout with BoxCharge APM connectivity. Local wallets, bank transfers, and regional payment methods across selected corridors in Asia, Africa, Europe, and more.",
    keywords: [
      "alternative payment methods",
      "local payment methods",
      "apm payment gateway",
      "wallet payment integration",
    ],
    summary:
      "Expand payment acceptance with regional APM connectivity across selected markets in Asia, Africa, Europe, and additional corridors as they become available.",
    breadcrumbs: baseCrumbs("Alternative Payment Methods", "apm-connectivity"),
    supports:
      "Local and regional payment method acceptance, bank transfer flows, wallet integrations, and customer-preferred payment options where available through partner infrastructure. Offer methods buyers already trust — without managing a separate integration for every corridor.",
    detail:
      "Card-only checkout leaves conversion on the table in markets where wallets and account-to-account rails dominate. BoxCharge APM connectivity lets you enable regional methods through one payment layer, with settlement coordination and webhook status events aligned to each method’s processing model.",
    capabilities: [
      {
        title: "Bank Transfer APMs",
        body: "Account-to-account payment methods across selected corridors where partners support them.",
      },
      {
        title: "Wallet Connectivity",
        body: "Regional wallet integrations that match local customer payment habits.",
      },
      {
        title: "Localized Checkout",
        body: "Show payment options aligned with customer region and currency preferences.",
      },
      {
        title: "Single Integration",
        body: "Connect once and enable multiple APMs through one BoxCharge layer.",
      },
      {
        title: "Settlement Coordination",
        body: "Settlement flows aligned with each APM’s processing and payout model.",
      },
      {
        title: "Coverage Reviews",
        body: "Coverage updates as new corridors and partners are enabled over time.",
      },
    ],
    steps: ["Select APMs", "Configure", "Integrate", "Go Live"],
    techLayer: ["Hosted Checkout", "S2S API", "Webhooks", "Tokenization"],
    faq: [
      {
        q: "Which APMs are available?",
        a: "APM availability depends on merchant profile, region, partner availability, and onboarding review.",
      },
      {
        q: "Can APMs run alongside cards?",
        a: "Yes. Most merchants combine cards and APMs in the same checkout experience.",
      },
    ],
    related: [
      {
        label: "Cross-Border Payment Gateway",
        to: "/solutions/cross-border-payment-gateway",
        description: "Card and APM gateway connectivity in one stack.",
      },
      {
        label: "Hosted Checkout",
        to: "/developers/hosted-checkout",
        description: "Present local methods on a PCI-friendly payment page.",
      },
      {
        label: "Global Merchant Services",
        to: "/solutions/global-merchant-services",
        description: "Merchant enablement that supports multi-market acceptance.",
      },
      {
        label: "Contact sales",
        to: "/contact",
        description: "Ask which APM corridors fit your customer base.",
      },
    ],
  },

  "iban-settlement": {
    eyebrow: "Solution",
    title: "IBAN & SEPA Settlement Solutions",
    metaTitle: "IBAN & SEPA Settlement Solutions | EUR Collections & Payouts — BoxCharge",
    metaDescription:
      "Collect and pay out across SEPA with BoxCharge IBAN solutions. Dedicated or virtual IBANs, SEPA Instant, multi-currency settlement, and reconciled euro-area flows.",
    keywords: [
      "iban settlement",
      "sepa payment solution",
      "sepa instant",
      "virtual iban provider",
      "eur settlement",
    ],
    summary:
      "Collect and pay out across the SEPA zone via dedicated IBANs — EUR settlement, SEPA Instant where supported, and SEPA Credit Transfer to any euro-area beneficiary.",
    breadcrumbs: baseCrumbs("IBAN & SEPA Settlement Solutions", "iban-settlement"),
    supports:
      "Dedicated and virtual IBANs for SEPA pay-in and pay-out, multi-currency settlement, and structured payout flows for businesses operating across the SEPA zone (36 countries) and wider international corridors.",
    detail:
      "SEPA collections and payouts need clean reconciliation, not just an account number. BoxCharge IBAN solutions help merchants issue dedicated or virtual IBANs, accept SEPA pay-ins, send SCT and SCT Inst payouts, and reconcile every credit and debit with statements and webhooks — subject to KYB and partner availability.",
    capabilities: [
      {
        title: "SEPA Pay-in",
        body: "Accept SEPA Direct Debit and SEPA Instant Credit Transfer into your IBAN, with auto-reconciliation by reference.",
      },
      {
        title: "SEPA Pay-out",
        body: "Send SEPA Credit Transfers (SCT) and SEPA Instant (SCT Inst) to any euro IBAN — T+0 where supported, T+1 standard.",
      },
      {
        title: "Dedicated & Virtual IBANs",
        body: "Issue per-merchant or per-customer IBANs for clean reconciliation and segregated flows.",
      },
      {
        title: "Multi-Currency Settlement",
        body: "Settle in EUR, GBP, USD and more through partner relationships where available.",
      },
      {
        title: "Reporting & Reconciliation",
        body: "Daily statements, transaction-level reporting, and webhook events for every credit and debit.",
      },
      {
        title: "Partner Connectivity",
        body: "Account infrastructure powered by regulated EU and UK banking partners.",
      },
    ],
    steps: ["Application", "KYB Review", "IBAN Issuance", "Activation"],
    techLayer: ["SEPA SCT", "SEPA SCT Inst", "SEPA Direct Debit", "S2S API", "Webhooks", "Transaction Monitoring"],
    faq: [
      {
        q: "Which SEPA countries are covered?",
        a: "All 36 SEPA-zone countries for SEPA Credit Transfer and SEPA Direct Debit, including all 27 EU states plus the UK, Switzerland, Norway, Iceland, Liechtenstein, Monaco, Andorra, San Marino and Vatican City.",
      },
      {
        q: "Can I pay out to my customers via SEPA?",
        a: "Yes. You can send SEPA Credit Transfers and SEPA Instant payments to any euro IBAN — typically arriving within seconds for SCT Inst, or T+1 for standard SCT.",
      },
      {
        q: "What is the difference between dedicated and virtual IBANs?",
        a: "A dedicated IBAN is issued in your company name; virtual IBANs are sub-accounts under a master IBAN, useful for per-customer or per-invoice reconciliation.",
      },
      {
        q: "Are IBAN accounts always available?",
        a: "Availability depends on jurisdiction, merchant profile, and partner infrastructure. KYB review is required.",
      },
    ],
    related: [
      {
        label: "Payouts",
        to: "/payouts",
        description: "SEPA, local rails, and crypto disbursement options.",
      },
      {
        label: "Offshore Merchant Accounts",
        to: "/solutions/offshore-merchant-accounts",
        description: "International merchant enablement that pairs with settlement.",
      },
      {
        label: "Global Merchant Services",
        to: "/solutions/global-merchant-services",
        description: "Acquiring connectivity for multi-market businesses.",
      },
      {
        label: "Contact BoxCharge",
        to: "/contact",
        description: "Ask about IBAN issuance and SEPA coverage for your entity.",
      },
    ],
  },
};
