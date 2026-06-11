import { useState } from "react";
import { Check, Copy } from "lucide-react";

export interface CodeSample {
  label: string;
  language: string;
  code: string;
}

interface CodeTabsProps {
  samples: CodeSample[];
  endpoint?: string;
  className?: string;
}

export function CodeTabs({ samples, endpoint, className = "" }: CodeTabsProps) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const current = samples[active];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(current.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <div className={`glass-strong overflow-hidden rounded-2xl ${className}`}>
      <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        </div>
        {endpoint && (
          <span className="ml-2 hidden font-mono text-[11px] text-muted-foreground sm:inline">
            {endpoint}
          </span>
        )}
        <button
          type="button"
          onClick={copy}
          className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-card/40 px-2 py-1 text-[11px] text-foreground/80 transition hover:bg-card/70"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="flex flex-wrap gap-1 border-b border-border/40 bg-card/20 px-2 py-1.5">
        {samples.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition ${
              i === active
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-card/40 hover:text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <pre className="max-h-[360px] overflow-auto p-5 font-mono text-[12.5px] leading-relaxed text-foreground/85">
        <code>{current.code}</code>
      </pre>
    </div>
  );
}

export const createPaymentSamples: CodeSample[] = [
  {
    label: "Node.js",
    language: "javascript",
    code: `const payload = {
  reference: "1DEVJAVA250422",
  public_key: process.env.BX_PUBLIC_KEY,
  terNO: 42,
  bill_amt: "124.80",
  bill_currency: "EUR",
  product_name: "Order #8821",
  "integration-type": "s2s",
  mop: "CC",
  ccno: "4111111111111111",
  ccvv: "123",
  month: "01",
  year: "30",
  return_url: "https://merchant.com/return",
  webhook_url: "https://merchant.com/hooks/bx",
};

const res = await fetch("https://api.boxchrge.com/api/s2s", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});
const data = await res.json();
console.log(data.transID, data.status, data.authurl);`,
  },
  {
    label: "Python",
    language: "python",
    code: `import os, requests

payload = {
    "reference": "1DEVJAVA250422",
    "public_key": os.environ["BX_PUBLIC_KEY"],
    "terNO": 42,
    "bill_amt": "124.80",
    "bill_currency": "EUR",
    "product_name": "Order #8821",
    "integration-type": "s2s",
    "mop": "CC",
    "ccno": "4111111111111111",
    "ccvv": "123",
    "month": "01",
    "year": "30",
    "return_url": "https://merchant.com/return",
    "webhook_url": "https://merchant.com/hooks/bx",
}

r = requests.post("https://api.boxchrge.com/api/s2s", json=payload)
print(r.json())`,
  },
  {
    label: "PHP",
    language: "php",
    code: `<?php
$payload = [
    "reference" => "1DEVJAVA250422",
    "public_key" => getenv("BX_PUBLIC_KEY"),
    "terNO" => 42,
    "bill_amt" => "124.80",
    "bill_currency" => "EUR",
    "product_name" => "Order #8821",
    "integration-type" => "s2s",
    "mop" => "CC",
    "ccno" => "4111111111111111",
    "ccvv" => "123",
    "month" => "01",
    "year" => "30",
    "return_url" => "https://merchant.com/return",
    "webhook_url" => "https://merchant.com/hooks/bx",
];

$ch = curl_init("https://api.boxchrge.com/api/s2s");
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_RETURNTRANSFER => true,
]);
echo curl_exec($ch);`,
  },
  {
    label: "Java",
    language: "java",
    code: `String body = """
{"reference":"1DEVJAVA250422","public_key":"%s","terNO":42,
"bill_amt":"124.80","bill_currency":"EUR","product_name":"Order #8821",
"integration-type":"s2s","mop":"CC","ccno":"4111111111111111",
"ccvv":"123","month":"01","year":"30",
"return_url":"https://merchant.com/return",
"webhook_url":"https://merchant.com/hooks/bx"}
""".formatted(System.getenv("BX_PUBLIC_KEY"));

var req = HttpRequest.newBuilder()
    .uri(URI.create("https://api.boxchrge.com/api/s2s"))
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(body))
    .build();
System.out.println(HttpClient.newHttpClient().send(req, HttpResponse.BodyHandlers.ofString()).body());`,
  },
  {
    label: "C#",
    language: "csharp",
    code: `var payload = new {
    reference = "1DEVJAVA250422",
    public_key = Environment.GetEnvironmentVariable("BX_PUBLIC_KEY"),
    terNO = 42,
    bill_amt = "124.80",
    bill_currency = "EUR",
    product_name = "Order #8821",
    integration_type = "s2s",
    mop = "CC",
    ccno = "4111111111111111",
    ccvv = "123",
    month = "01",
    year = "30",
    return_url = "https://merchant.com/return",
    webhook_url = "https://merchant.com/hooks/bx",
};
// POST JSON to https://api.boxchrge.com/api/s2s`,
  },
  {
    label: "Go",
    language: "go",
    code: `payload := map[string]any{
    "reference": "1DEVJAVA250422",
    "public_key": os.Getenv("BX_PUBLIC_KEY"),
    "terNO": 42,
    "bill_amt": "124.80",
    "bill_currency": "EUR",
    "mop": "CC",
    "ccno": "4111111111111111",
    "return_url": "https://merchant.com/return",
    "webhook_url": "https://merchant.com/hooks/bx",
}
body, _ := json.Marshal(payload)
http.Post("https://api.boxchrge.com/api/s2s", "application/json", bytes.NewReader(body))`,
  },
  {
    label: "cURL",
    language: "bash",
    code: `curl -X POST https://api.boxchrge.com/api/s2s \\
  -H "Content-Type: application/json" \\
  -d '{
    "reference": "1DEVJAVA250422",
    "public_key": "'"$BX_PUBLIC_KEY"'",
    "terNO": 42,
    "bill_amt": "124.80",
    "bill_currency": "EUR",
    "product_name": "Order #8821",
    "integration-type": "s2s",
    "mop": "CC",
    "ccno": "4111111111111111",
    "ccvv": "123",
    "month": "01",
    "year": "30",
    "return_url": "https://merchant.com/return",
    "webhook_url": "https://merchant.com/hooks/bx"
  }'`,
  },
];
