export type ApiDocSection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "endpoint"; method: "POST" | "GET"; url: string; function: string; remark?: string }
  | { type: "code"; language: string; code: string; title?: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "list"; items: string[] }
  | { type: "callout"; variant: "info" | "warning"; text: string };

export interface ApiNavItem {
  slug: string;
  title: string;
  group: string;
}

export interface ApiDocPage {
  slug: string;
  title: string;
  subtitle?: string;
  sections: ApiDocSection[];
}

export const API_BASE_URL = "https://api.boxchrge.com";
export const API_DEV_URL = "http://localhost:9003";

export const apiNav: ApiNavItem[] = [
  { slug: "", title: "↙️ PAYIN — Server Connect", group: "PAYIN" },
  { slug: "simple-s2s", title: "Simple Payment Gateway (S2S)", group: "PAYIN" },
  { slug: "encrypted-s2s", title: "Encrypted Payment Gateway (S2S)", group: "PAYIN" },
  { slug: "transaction-status", title: "Transaction Status", group: "PAYIN" },
  { slug: "webhooks", title: "📬 Webhook Notifications", group: "PAYIN" },
  { slug: "refund", title: "Refund Order Request", group: "PAYIN" },
  { slug: "payout", title: "↗️ PAYOUT — Server Connect", group: "PAYOUT" },
];

const ORDER_STATUS_ROWS: string[][] = [
  ["0", "Pending"],
  ["1", "Approved"],
  ["2", "Declined"],
  ["3", "Refunded"],
  ["5", "Chargeback"],
  ["7", "Reversed"],
  ["8", "Refund Pending"],
  ["9", "Test"],
  ["10", "Blocked"],
  ["25", "Test Approved"],
  ["26", "Test Declined"],
  ["27", "Test 3DS Authentication"],
];

const PAYIN_PARAMS: string[][] = [
  ["public_key", "str M", "Terminal public key from My Terminal → Terminal Public Key."],
  ["terNO", "int M", "Unique terminal number from My Terminal → Add New Terminal List."],
  ["integration-type", "str D", "Default fixed value: s2s."],
  ["bill_amt", "dec(10,2) M", "Bill amount in decimal format (e.g. 120.00)."],
  ["bill_currency", "str M", "ISO currency code (e.g. EUR, USD)."],
  ["product_name", "str M", "Product or service name."],
  ["reference", "str M", "Your unique order ID — returned in callbacks."],
  ["webhook_url", "str M", "Server-to-server webhook URL for status updates."],
  ["return_url", "str M", "Customer redirect URL after authentication."],
  ["bill_ip", "server D", "Customer IP — set server-side from REMOTE_ADDR."],
  ["fullname", "str C", "Customer full name (optional)."],
  ["bill_email", "str C", "Customer billing email (optional)."],
  ["mop", "str M", "Payment mode: CC, DC, NB, WALLET, UPICOLLECT, QRINTENT."],
  ["ccno", "str C", "Card number (required for mop=CC)."],
  ["ccvv", "str C", "Card CVV (required for mop=CC)."],
  ["month", "str C", "Card expiry month (required for mop=CC)."],
  ["year", "str C", "Card expiry year (required for mop=CC)."],
];

export const apiPages: Record<string, ApiDocPage> = {
  "": {
    slug: "",
    title: "↙️ PAYIN — Server Connect",
    subtitle:
      "Integrate BoxCharge into your website or app to accept customer payments via secure server-to-server API.",
    sections: [
      {
        type: "paragraph",
        text: "The PAYIN section covers how to integrate BoxCharge into your website or mobile application to accept payments from customers. This server-to-server integration enables secure and seamless payment collection through BoxCharge's API.",
      },
      {
        type: "list",
        items: [
          "Authenticate API requests",
          "Create and manage payment sessions",
          "Handle payment callbacks and verify transactions",
          "Test the PAYIN flow in sandbox mode before going live",
        ],
      },
      { type: "heading", level: 2, text: "🔖 Essential Integration Parameters" },
      {
        type: "paragraph",
        text: "To authenticate and interact with BoxCharge APIs, you need these parameters from your terminal dashboard:",
      },
      {
        type: "table",
        headers: ["Parameter", "Description"],
        rows: [
          ["baseUrl", "Root URL for all API requests (production or sandbox)."],
          ["terNO", "Unique merchant terminal identifier."],
          ["public_key", "Terminal public key for API authentication."],
          ["private_key", "Terminal private key — required for encrypted S2S flows."],
        ],
      },
      {
        type: "callout",
        variant: "info",
        text: "Always replace placeholders with exact values from your terminal. Incorrect keys will cause requests to fail.",
      },
      { type: "heading", level: 2, text: "🔖 API Endpoints Overview" },
      {
        type: "table",
        headers: ["Environment", "baseUrl"],
        rows: [
          ["Production", API_BASE_URL],
          ["Sandbox / Local", API_DEV_URL],
        ],
      },
      { type: "endpoint", method: "POST", url: "{baseUrl}/api/s2s", function: "Initiate simple S2S payment session", remark: "11 mandatory parameters" },
      { type: "endpoint", method: "POST", url: "{baseUrl}/api/s2s/encrypt", function: "Initiate encrypted S2S payment", remark: "12 mandatory parameters + AES-256-CBC" },
      { type: "endpoint", method: "GET", url: "{baseUrl}/api/authurl/s2s/{transID}", function: "Query transaction status by TransID or reference", remark: "1 mandatory parameter" },
      { type: "endpoint", method: "POST", url: "{baseUrl}/api/transactions/refund-request", function: "Request refund for a completed transaction", remark: "3 mandatory parameters" },
      { type: "heading", level: 2, text: "🔖 Mode of Payment (mop)" },
      {
        type: "table",
        headers: ["Payment Mode", "Code"],
        rows: [
          ["Credit Card", "CC"],
          ["Debit Card", "DC"],
          ["Net Banking", "NB"],
          ["Wallet", "WALLET"],
          ["UPI Collect", "UPICOLLECT"],
          ["UPI QR & Intent", "QRINTENT"],
        ],
      },
      { type: "heading", level: 2, text: "🔖 Test Card Numbers" },
      {
        type: "table",
        headers: ["Network", "Card Number", "Type"],
        rows: [
          ["Visa", "4111111111111111", "3DS"],
          ["Visa", "4012000033330026", "Test Approved"],
          ["Visa", "4043409999991437", "Test Declined"],
          ["Mastercard", "5111111111111111", "3DS"],
          ["Mastercard", "5123450000000008", "Test Approved"],
          ["Mastercard", "5555229999997722", "Test Declined"],
        ],
      },
      { type: "heading", level: 2, text: "🔖 Order Status Codes" },
      { type: "table", headers: ["order_status", "status"], rows: ORDER_STATUS_ROWS },
    ],
  },

  "simple-s2s": {
    slug: "simple-s2s",
    title: "Simple Payment Gateway (S2S)",
    subtitle: "Quick backend integration — POST JSON directly over HTTPS.",
    sections: [
      {
        type: "endpoint",
        method: "POST",
        url: `${API_DEV_URL}/api/s2s`,
        function: "Payment online from customers",
        remark: "11 mandatory parameters, others optional",
      },
      { type: "heading", level: 3, text: "Request (JSON)" },
      {
        type: "code",
        language: "json",
        title: "POST /api/s2s",
        code: `{
  "reference": "1DEVJAVA250422",
  "public_key": "WO6QnIPePdYlwbm6OjpIIwQvhsHaV4ioHp6MH2/xjlQ=",
  "bill_amt": "11.11",
  "bill_currency": "EUR",
  "bill_address": "3888 Austin Secret Lane",
  "bill_city": "Circleville 22",
  "bill_country": "US",
  "bill_email": "devops@text.com",
  "bill_ip": "222.176.92.333",
  "bill_phone": "65 62294466",
  "bill_state": "Utah",
  "bill_zip": "84723",
  "fullname": "Testing Dev Tech",
  "integration-type": "s2s",
  "mop": "CC",
  "product_name": "Testing DEV Product",
  "return_url": "https://www.google.com/",
  "source": "server-to-server integration",
  "source_url": "http://your.domain/source-url",
  "terNO": 42,
  "webhook_url": "https://webhook.site/your-webhook-id",
  "ccno": "4111111111111111",
  "ccvv": "123",
  "month": "01",
  "year": "30"
}`,
      },
      { type: "heading", level: 3, text: "Response" },
      {
        type: "code",
        language: "json",
        title: "200 OK",
        code: `{
  "authstatus": "${API_DEV_URL}/api/authurl/s2s/100135250426141606",
  "bill_currency": "EUR",
  "transID": "100135250426141606",
  "mop": "Mastercard",
  "ccno": "543889XXXXXX0229",
  "reference": "22DEVJAVA250415",
  "authurl": "${API_DEV_URL}/api/authurl/100135250426141606",
  "order_status": "0",
  "tdate": "2025-04-26 14:16:06.000657",
  "response": "Payment is pending",
  "authdata": "eyJ0cmFuc0lEIjoxMDAxMzUy...",
  "bill_amt": "120.0",
  "status": "Pending"
}`,
      },
      {
        type: "callout",
        variant: "info",
        text: "Redirect the customer to authurl for 3DS OTP authentication. Final status arrives via webhook_url.",
      },
      { type: "heading", level: 2, text: "API Parameters" },
      {
        type: "callout",
        variant: "info",
        text: "M = Merchant (required) · D = Default (fixed) · C = Customer (optional)",
      },
      { type: "table", headers: ["Parameter", "Type", "Description"], rows: PAYIN_PARAMS },
    ],
  },

  "encrypted-s2s": {
    slug: "encrypted-s2s",
    title: "Encrypted Payment Gateway (S2S)",
    subtitle: "AES-256-CBC encrypted payload for maximum data protection.",
    sections: [
      {
        type: "endpoint",
        method: "POST",
        url: `${API_DEV_URL}/api/s2s/encrypt`,
        function: "Encrypted payment online from customers",
        remark: "12 mandatory parameters — payload sent as encrypted_data",
      },
      {
        type: "paragraph",
        text: "Concatenate all parameters into a query string (e.g. &bill_amt=11.00&fullname=dev+tech), encrypt using AES-256-CBC with your private_key and public_key, append public_key to the encrypted string, and POST as encrypted_data.",
      },
      { type: "heading", level: 3, text: "Encryption flow" },
      {
        type: "list",
        items: [
          "Build query string from all payment parameters",
          "Encrypt with AES-256-CBC (IV derived from SHA-256 of public_key)",
          "Append public_key to encrypted output",
          "POST { encrypted_data: encryptedPayload + publicKey }",
          "Set encryption_method=aes256 to receive encrypted webhook responses",
        ],
      },
      { type: "heading", level: 3, text: "Request" },
      {
        type: "code",
        language: "http",
        title: "POST /api/s2s/encrypt",
        code: `POST ${API_DEV_URL}/api/s2s/encrypt
Content-Type: application/x-www-form-urlencoded

encrypted_data=Fx9PJmn4TknBmttkHe3JX...{public_key}`,
      },
      { type: "heading", level: 3, text: "Response (3DS pending)" },
      {
        type: "code",
        language: "json",
        code: `{
  "authurl": "${API_DEV_URL}/api/authurl/38FACFT0nigxaW_OyOojZoxYGlxqDzUCz_TJFL_M1nk=",
  "transID": "100135250426141606",
  "reference": "22DEVJAVA250415",
  "order_status": "0",
  "status": "Pending",
  "bill_amt": "11.11",
  "bill_currency": "EUR",
  "response": "Payment is pending"
}`,
      },
      { type: "heading", level: 3, text: "Decrypted webhook response" },
      {
        type: "code",
        language: "text",
        title: "After decrypting data parameter",
        code: `bill_currency=EUR&transID=100203250509173720&mop=Visa&ccno=411111XXXXXX1111
&reference=22PostDEVJAVA250415&order_status=25&bill_amt=130.0&status=Test Approved`,
      },
      {
        type: "callout",
        variant: "warning",
        text: "encryption_method: aes256 = encrypted webhook · none = plain text webhook. private_key is required for decryption.",
      },
      { type: "table", headers: ["Parameter", "Type", "Description"], rows: [
        ...PAYIN_PARAMS.slice(0, 10),
        ["encryption_method", "str D", "aes256 or none — controls webhook encryption."],
        ...PAYIN_PARAMS.slice(10),
      ]},
    ],
  },

  "transaction-status": {
    slug: "transaction-status",
    title: "Transaction Status",
    subtitle: "Poll payment status by TransID or merchant reference.",
    sections: [
      {
        type: "endpoint",
        method: "GET",
        url: `${API_DEV_URL}/api/authurl/s2s/{transID}`,
        function: "Request transaction status",
        remark: "1 mandatory parameter — TransID or reference (your Order ID)",
      },
      { type: "heading", level: 3, text: "Response" },
      {
        type: "code",
        language: "json",
        code: `{
  "bill_currency": "EUR",
  "transID": "100135250426141606",
  "mop": "Mastercard",
  "ccno": "543889XXXXXX0229",
  "reference": "22DEVJAVA250415",
  "authurl": "${API_DEV_URL}/api/authurl/auth_3ds/100135250426141606",
  "order_status": "0",
  "connector_status_code": "0",
  "tdate": "2025-04-26 14:16:06.000657",
  "response": "Pending",
  "bill_amt": "120.0",
  "status": "Pending"
}`,
      },
      { type: "heading", level: 2, text: "Order Status Codes" },
      { type: "table", headers: ["order_status", "status"], rows: ORDER_STATUS_ROWS },
    ],
  },

  webhooks: {
    slug: "webhooks",
    title: "📬 Webhook Notifications",
    subtitle: "Receive final transaction status even if the customer does not return.",
    sections: [
      {
        type: "paragraph",
        text: "In addition to redirecting the user to your return_url after authentication, BoxCharge also sends a webhook notification to your backend. This ensures you receive the final transaction status even if the user doesn't return to your website.",
      },
      { type: "heading", level: 2, text: "Webhook payload" },
      {
        type: "code",
        language: "json",
        title: "Plain text (encryption_method=none)",
        code: `{
  "bill_currency": "EUR",
  "transID": "100203250509173720",
  "mop": "Visa",
  "ccno": "411111XXXXXX1111",
  "reference": "22PostDEVJAVA250415",
  "order_status": "25",
  "webhook_notify_time": "2025-05-09 17:37:45.000522",
  "bill_amt": "130.0",
  "status": "Test Approved",
  "response": "3DS test card approved"
}`,
      },
      {
        type: "callout",
        variant: "info",
        text: "When encryption_method=aes256, the webhook delivers an encrypted data parameter. Decrypt with your private_key and public_key using AES-256-CBC.",
      },
      { type: "heading", level: 2, text: "Best practices" },
      {
        type: "list",
        items: [
          "Always verify webhook authenticity before updating order state",
          "Respond with HTTP 2xx within 5 seconds",
          "Implement idempotent handlers — retries may occur",
          "Use webhooks as source of truth, not return_url alone",
        ],
      },
    ],
  },

  refund: {
    slug: "refund",
    title: "Refund Order Request",
    subtitle: "Initiate full or partial refunds for completed transactions.",
    sections: [
      {
        type: "endpoint",
        method: "POST",
        url: `${API_DEV_URL}/api/transactions/refund-request`,
        function: "Request refund for a transaction",
        remark: "3 mandatory parameters: transID, refundAmount, public_key",
      },
      {
        type: "code",
        language: "json",
        title: "POST /api/transactions/refund-request",
        code: `{
  "transID": "100452504041748060",
  "refundAmount": 1.00,
  "public_key": "WO6QnIPePdYlwbm6OjpIIwQvhsHaV4ioHp6MH2/xjlQ="
}`,
      },
      {
        type: "code",
        language: "json",
        title: "Response",
        code: `{
  "order_status": "8",
  "message": "Request Processed",
  "status": "Request Processed",
  "bill_amt": 125.75,
  "transID": "8416131",
  "tdate": "2024-08-10 10:20:24",
  "bill_currency": "USD",
  "response": "Payment successful",
  "reference": ""
}`,
      },
    ],
  },

  payout: {
    slug: "payout",
    title: "↗️ PAYOUT — Server Connect",
    subtitle: "Server-to-server payout integration for merchant disbursements.",
    sections: [
      {
        type: "paragraph",
        text: "The PAYOUT section covers how to integrate BoxCharge to send payouts to your merchants or customers. Learn how to authenticate requests, create payout sessions, handle callbacks, and test in sandbox before going live.",
      },
      { type: "endpoint", method: "POST", url: "{baseUrl}/api/payout/s2s", function: "Simple payout gateway (S2S)", remark: "Quick backend integration" },
      { type: "endpoint", method: "POST", url: "{baseUrl}/api/payout/s2s/encrypt", function: "Encrypted payout gateway (S2S)", remark: "AES-256-CBC encrypted payload" },
      { type: "endpoint", method: "GET", url: "{baseUrl}/api/payout/status/{transID}", function: "Fetch payout transaction status" },
      {
        type: "callout",
        variant: "info",
        text: "Payout credentials and beneficiary setup are configured during merchant onboarding. Contact integration support for sandbox access.",
      },
    ],
  },
};

export function getApiPage(slug: string): ApiDocPage | undefined {
  return apiPages[slug];
}
