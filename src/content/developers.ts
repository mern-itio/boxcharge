import { DeveloperPageConfig } from "@/components/site/DeveloperPage";

const baseCrumbs = (name: string, slug: string) => [
  { name: "Home", path: "/" },
  { name: "Developers", path: "/developers" },
  { name, path: `/developers/${slug}` },
];

export const developerConfigs: Record<string, DeveloperPageConfig> = {
  "api-integration": {
    eyebrow: "Developers",
    title: "API Integration",
    metaTitle: "Payment API Integration Guide | REST Endpoints — BoxCharge",
    metaDescription:
      "Integrate BoxCharge payment APIs for transaction creation, status checks, tokenization, and webhooks. HTTPS, bearer auth, and developer-ready examples.",
    keywords: ["payment api integration", "boxcharge api", "rest payment api"],
    summary: "RESTful payment APIs for creating transactions, retrieving status, and managing tokenized references.",
    breadcrumbs: baseCrumbs("API Integration", "api-integration"),
    overview: "The BoxCharge API exposes endpoints for payment creation, status retrieval, tokenization, and webhook configuration. All requests use HTTPS and bearer authentication.",
    flow: [
      { title: "1. Authenticate", body: "Use a secure bearer key to authenticate requests." },
      { title: "2. Create Payment", body: "Send a payment intent with amount, currency, and method." },
      { title: "3. Handle Response", body: "Process the response and any required next action." },
    ],
    sampleTitle: "POST /v1/payments",
    sampleCode: `POST https://api.boxchrge.com/v1/payments
Authorization: Bearer sk_live_***
Content-Type: application/json

{
  "amount": 12480,
  "currency": "EUR",
  "method": "card",
  "routing": "smart",
  "customer": { "country": "DE" },
  "return_url": "https://merchant.com/return",
  "webhook_url": "https://merchant.com/hooks/bx"
}

// 200 OK
{
  "id": "pay_8f2c...",
  "status": "authorized",
  "acquirer": "best_available"
}`,
    securityNotes: [
      "Never expose secret keys in client-side code.",
      "Validate webhook signatures before processing.",
      "Use HTTPS for all integration endpoints.",
    ],
    authentication: "All API calls require a bearer token sent in the Authorization header. Production and test keys are isolated.",
    implementationNotes: [
      "Use idempotency keys for retried requests.",
      "Implement exponential backoff on 5xx responses.",
      "Subscribe to webhooks for asynchronous status updates.",
    ],
    faq: [
      { q: "Is there a sandbox environment?", a: "Yes. Sandbox credentials are provided during onboarding and integration coordination." },
    ],
    related: [
      { label: "Server-to-Server", to: "/developers/s2s-integration", description: "Backend card payments with 3DS handling." },
      { label: "Webhooks", to: "/developers/webhooks", description: "Signed lifecycle events for payment status." },
      { label: "Cross-Border Gateway", to: "/solutions/cross-border-payment-gateway", description: "Commercial gateway product powered by these APIs." },
    ],
  },
  "s2s-integration": {
    eyebrow: "Developers",
    title: "Server-to-Server Integration",
    metaTitle: "Server-to-Server Payment API (S2S) | Card Processing — BoxCharge",
    metaDescription:
      "Build BoxCharge S2S card payments with POST /api/s2s, 3DS authurl redirects, and webhook confirmation. Simple JSON or encrypted payload modes.",
    keywords: ["s2s payment api", "server to server payments", "3ds payment integration"],
    summary: "PAYIN S2S — POST /api/s2s with public_key, terNO, and card details. 3DS via authurl.",
    breadcrumbs: baseCrumbs("Server-to-Server Integration", "s2s-integration"),
    overview: "Server-to-server integration posts payment data from your backend to BoxCharge. Use Simple S2S (JSON) or Encrypted S2S (AES-256-CBC). Full reference: /developers/api-reference",
    flow: [
      { title: "1. Prepare credentials", body: "Obtain baseUrl, terNO, public_key (and private_key for encrypted mode)." },
      { title: "2. POST /api/s2s", body: "Send bill_amt, reference, mop, card fields, webhook_url, return_url." },
      { title: "3. Handle 3DS + webhook", body: "Redirect to authurl; confirm final status via webhook_url." },
    ],
    sampleTitle: "POST /api/s2s",
    sampleCode: `POST https://api.boxchrge.com/api/s2s
Content-Type: application/json

{
  "reference": "1DEVJAVA250422",
  "public_key": "YOUR_TERMINAL_PUBLIC_KEY",
  "terNO": 42,
  "bill_amt": "124.80",
  "bill_currency": "EUR",
  "mop": "CC",
  "ccno": "4111111111111111",
  "ccvv": "123",
  "month": "01",
  "year": "30",
  "webhook_url": "https://merchant.com/hooks/bx",
  "return_url": "https://merchant.com/return"
}

// Response → redirect customer to authurl for 3DS`,
    securityNotes: [
      "S2S with raw card data requires PCI scope on the merchant side.",
      "Tokenized S2S flows are preferred where supported.",
      "All payloads are encrypted in transit.",
    ],
    authentication: "Bearer token plus optional IP allow-listing for production keys.",
    implementationNotes: [
      "Prefer tokenized S2S over raw PAN where possible.",
      "Handle 3DS challenge redirects on the merchant side.",
      "Persist payment IDs for reconciliation.",
    ],
    faq: [
      { q: "Do I need PCI certification?", a: "S2S with raw card data requires appropriate PCI scope. Tokenized flows reduce that scope." },
    ],
    related: [
      { label: "API Reference", to: "/developers/api-reference", description: "Full PAYIN endpoint reference." },
      { label: "Tokenization", to: "/technology/tokenization", description: "Prefer tokens over raw PAN where possible." },
      { label: "Hosted Checkout", to: "/developers/hosted-checkout", description: "Lower PCI scope with a hosted payment page." },
    ],
  },
  "webhooks": {
    eyebrow: "Developers",
    title: "Webhook Notifications",
    metaTitle: "Payment Webhooks | Signed Event Notifications — BoxCharge",
    metaDescription:
      "Receive signed BoxCharge webhooks for payment status, refunds, chargebacks, and settlement. HMAC SHA-256 verification with retry-safe handlers.",
    keywords: ["payment webhooks", "hmac webhook verification", "payment event notifications"],
    summary: "Asynchronous event notifications for payment lifecycle and settlement events.",
    breadcrumbs: baseCrumbs("Webhook Notifications", "webhooks"),
    overview: "BoxCharge delivers signed webhook events for payment status changes, refunds, chargebacks, and settlement updates. Each event is signed with HMAC SHA-256 for verification.",
    flow: [
      { title: "1. Configure URL", body: "Register your endpoint and event subscriptions." },
      { title: "2. Receive Event", body: "BoxCharge POSTs a signed JSON payload." },
      { title: "3. Verify + Act", body: "Verify the signature, then update internal state." },
    ],
    sampleTitle: "POST {your-webhook-url}",
    sampleCode: `POST /your-webhook-endpoint
X-BX-Signature: sha256=...
Content-Type: application/json

{
  "event": "payment.authorized",
  "id": "evt_98b3...",
  "data": {
    "payment_id": "pay_8f2c...",
    "status": "authorized",
    "amount": 12480,
    "currency": "EUR"
  },
  "created_at": "2026-05-25T08:42:11Z"
}`,
    securityNotes: [
      "Always verify the X-BX-Signature header before processing.",
      "Respond with 2xx within 5 seconds to acknowledge receipt.",
      "Implement idempotent handlers — events may be retried.",
    ],
    authentication: "Signed payloads using a per-merchant secret. Optional mutual TLS available on request.",
    implementationNotes: [
      "Store the latest event ID per resource to handle out-of-order delivery.",
      "Use a queue to decouple webhook receipt from downstream processing.",
      "Subscribe only to events you need.",
    ],
    faq: [
      { q: "How are retries handled?", a: "Failed deliveries are retried with exponential backoff over a defined window." },
    ],
    related: [
      { label: "API Integration", to: "/developers/api-integration", description: "Create payments that emit webhook events." },
      { label: "S2S Integration", to: "/developers/s2s-integration", description: "Confirm final S2S status via webhooks." },
      { label: "Payouts", to: "/payouts", description: "Disbursement rails that also emit status events." },
    ],
  },
  "hosted-checkout": {
    eyebrow: "Developers",
    title: "Hosted Checkout",
    metaTitle: "Hosted Checkout Payment Page | PCI-Friendly — BoxCharge",
    metaDescription:
      "Launch BoxCharge hosted checkout for cards and APMs. Reduce PCI scope with a branded payment page, session APIs, and webhook-confirmed results.",
    keywords: ["hosted checkout", "pci friendly checkout", "payment page api"],
    summary: "PCI-friendly hosted payment page with customizable branding and supported methods.",
    breadcrumbs: baseCrumbs("Hosted Checkout", "hosted-checkout"),
    overview: "Hosted Checkout offloads PAN entry to a BoxCharge-hosted page, reducing PCI scope on the merchant side while supporting cards, APMs, and tokenized flows.",
    flow: [
      { title: "1. Create Session", body: "Create a checkout session via API with amount, currency, and methods." },
      { title: "2. Redirect Customer", body: "Send the customer to the returned hosted URL." },
      { title: "3. Receive Result", body: "Customer returns to your return_url and you receive a webhook." },
    ],
    sampleTitle: "POST /v1/checkout/sessions",
    sampleCode: `POST https://api.boxchrge.com/v1/checkout/sessions
Authorization: Bearer sk_live_***
Content-Type: application/json

{
  "amount": 19900,
  "currency": "EUR",
  "methods": ["card", "ideal", "sepa"],
  "branding": { "logo_url": "https://merchant.com/logo.svg" },
  "return_url": "https://merchant.com/return"
}

// 200 OK
{
  "id": "cs_a1b2...",
  "url": "https://checkout.boxchrge.com/cs_a1b2..."
}`,
    securityNotes: [
      "Hosted Checkout reduces PCI scope significantly.",
      "All sensitive entry happens on BoxCharge infrastructure.",
      "Session URLs expire and are single-use.",
    ],
    authentication: "Sessions are created server-side with the bearer key. The session URL is short-lived.",
    implementationNotes: [
      "Always trust the webhook for final state — not the return_url query.",
      "Customize branding through session parameters.",
      "Use one session per checkout attempt.",
    ],
    faq: [
      { q: "Can I customize the page?", a: "Yes. Branding parameters and supported methods can be configured per session." },
    ],
    related: [
      { label: "Alternative Payment Methods", to: "/solutions/apm-connectivity", description: "Enable local methods in checkout." },
      { label: "3DS Authentication", to: "/technology/3ds-authentication", description: "Cardholder authentication in hosted flows." },
      { label: "API Integration", to: "/developers/api-integration", description: "Create sessions and handle return states." },
    ],
  },
};
