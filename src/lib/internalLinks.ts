/** Map solution card titles to public routes for internal linking. */
export const solutionCardPaths: Record<string, string> = {
  "Global Merchant Services": "/solutions/global-merchant-services",
  "Cross-Border Payment Gateway": "/solutions/cross-border-payment-gateway",
  "Payment Orchestration": "/solutions/payment-orchestration",
  "Alternative Payment Methods": "/solutions/apm-connectivity",
  "IBAN & Settlement Solutions": "/solutions/iban-settlement",
  "Developer-Ready APIs": "/developers",
};

export function solutionCardPath(title: string): string | undefined {
  return solutionCardPaths[title];
}

/** Map technology layer labels on solution pages to docs or technology routes. */
export const techLayerPaths: Record<string, string> = {
  "Smart Routing": "/technology/smart-routing",
  "Cascading Payments": "/technology/cascading-payments",
  "Fraud Prevention": "/technology/fraud-prevention",
  "3DS Authentication": "/technology/3ds-authentication",
  Tokenization: "/technology/tokenization",
  "S2S API": "/developers/s2s-integration",
  "Hosted Checkout": "/developers/hosted-checkout",
  Webhooks: "/developers/webhooks",
  "Transaction Monitoring": "/technology/fraud-prevention",
  "SEPA SCT": "/solutions/iban-settlement",
  "SEPA SCT Inst": "/solutions/iban-settlement",
  "SEPA Direct Debit": "/solutions/iban-settlement",
};

export function techLayerPath(label: string): string | undefined {
  return techLayerPaths[label];
}
