/** Default commercial SEO titles and descriptions for built-in public pages. */

export const pageSeoDefaults: Record<
  string,
  { title: string; description: string; keywords?: string[] }
> = {
  home: {
    title: "BoxCharge — Global Merchant Services & Cross-Border Payment Gateway",
    description:
      "Accept payments worldwide with BoxCharge. Offshore and onshore merchant accounts, payment orchestration, APMs, and IBAN settlement through one secure platform.",
    keywords: [
      "global merchant services",
      "cross-border payment gateway",
      "payment orchestration",
      "offshore merchant account",
      "alternative payment methods",
    ],
  },
  about: {
    title: "About BoxCharge | Global Payment Infrastructure Company",
    description:
      "Learn how BoxCharge helps businesses accept cross-border payments with merchant enablement, smart routing, APMs, and secure payment infrastructure.",
    keywords: ["about boxcharge", "payment infrastructure company", "global merchant services provider"],
  },
  contact: {
    title: "Contact BoxCharge | Merchant Account & Payment Consultation",
    description:
      "Talk to a BoxCharge specialist about merchant accounts, cross-border payments, APMs, or integration. Typical response within one business day.",
    keywords: ["contact boxcharge", "merchant account consultation", "payment gateway support"],
  },
  blog: {
    title: "BoxCharge Blog | Payment Gateway & Merchant Account Insights",
    description:
      "Guides on offshore merchant accounts, cross-border payments, IBAN settlement, payment orchestration, and high-risk payment processing.",
    keywords: ["payment gateway blog", "offshore merchant account guide", "cross-border payments"],
  },
  solutions: {
    title: "Payment Solutions | Merchant Accounts, Gateway & Orchestration",
    description:
      "Explore BoxCharge solutions for global merchant services, offshore accounts, cross-border gateways, orchestration, APMs, and IBAN settlement.",
    keywords: ["payment solutions", "merchant account provider", "payment orchestration platform"],
  },
  technology: {
    title: "Payment Technology | Smart Routing, 3DS, Tokenization & Fraud Controls",
    description:
      "See how BoxCharge technology layers improve approvals and security with smart routing, cascading payments, 3DS, tokenization, and fraud prevention.",
    keywords: ["payment smart routing", "cascading payments", "3ds authentication", "card tokenization"],
  },
  developers: {
    title: "Developers | BoxCharge Payment APIs, Hosted Checkout & Webhooks",
    description:
      "Integrate BoxCharge with hosted checkout, server-to-server APIs, webhooks, and developer-ready payment flows for global acceptance.",
    keywords: ["payment api", "hosted checkout", "s2s payment integration", "payment webhooks"],
  },
  payouts: {
    title: "Payouts | SEPA, Local Rails & Crypto Disbursements — BoxCharge",
    description:
      "Send money globally with BoxCharge payouts. SEPA transfers, local bank rails, wallets, and crypto disbursements from one settlement balance.",
    keywords: ["payment payouts", "sepa payout", "cross-border disbursements"],
  },
  faq: {
    title: "FAQ | BoxCharge Merchant Services & Payment Processing",
    description:
      "Answers about BoxCharge onboarding, merchant accounts, APMs, settlement timelines, pricing, and payment infrastructure support.",
    keywords: ["boxcharge faq", "merchant account questions", "payment processing faq"],
  },
  "policies/privacy": {
    title: "Privacy Policy | BoxCharge Payment Platform",
    description:
      "Read how BoxCharge collects, uses, and protects merchant, applicant, and visitor information across payment services and boxchrge.com.",
    keywords: ["boxcharge privacy policy", "payment data privacy"],
  },
  "policies/terms": {
    title: "Terms of Use | BoxCharge Website & Services",
    description:
      "Terms governing access to BoxCharge documentation, website content, and payment infrastructure services.",
    keywords: ["boxcharge terms of use", "merchant services terms"],
  },
  "policies/aml": {
    title: "AML Policy | BoxCharge Compliance & KYC",
    description:
      "BoxCharge anti-money-laundering controls, KYC expectations, and partner compliance coordination for merchant onboarding.",
    keywords: ["boxcharge aml policy", "payment kyc compliance"],
  },
  "policies/chargeback": {
    title: "Chargeback Policy | BoxCharge Dispute Handling",
    description:
      "Guidance on BoxCharge chargeback workflows, merchant responsibilities, and dispute coordination with acquiring partners.",
    keywords: ["chargeback policy", "payment dispute handling"],
  },
  "policies/merchant-protection": {
    title: "Merchant Protection Policy | BoxCharge Safeguards",
    description:
      "How BoxCharge supports merchants through monitoring, dispute coordination, and protective controls across payment operations.",
    keywords: ["merchant protection policy", "payment merchant safeguards"],
  },
};
