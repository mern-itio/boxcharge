import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { ApiDocSection } from "@/content/api-reference";

function CodeBlock({ code, title, language }: { code: string; title?: string; language: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="glass-strong overflow-hidden rounded-xl">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-2">
        <span className="font-mono text-[11px] text-muted-foreground">
          {title ?? language}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1 rounded-md border border-border/60 px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="max-h-[480px] overflow-auto p-4 font-mono text-[12px] leading-relaxed text-foreground/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function MethodBadge({ method }: { method: "POST" | "GET" }) {
  const cls =
    method === "POST"
      ? "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30"
      : "bg-sky-500/15 text-sky-400 ring-sky-500/30";
  return (
    <span className={`rounded-md px-2 py-0.5 font-mono text-xs font-semibold ring-1 ${cls}`}>
      {method}
    </span>
  );
}

export function ApiDocRenderer({ sections }: { sections: ApiDocSection[] }) {
  return (
    <div className="space-y-6">
      {sections.map((s, i) => {
        switch (s.type) {
          case "paragraph":
            return (
              <p key={i} className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            );
          case "heading":
            return s.level === 2 ? (
              <h2 key={i} className="pt-2 text-xl font-semibold tracking-tight">
                {s.text}
              </h2>
            ) : (
              <h3 key={i} className="text-base font-semibold">
                {s.text}
              </h3>
            );
          case "endpoint":
            return (
              <div key={i} className="glass overflow-hidden rounded-xl border border-border/60">
                <div className="grid gap-3 p-4 sm:grid-cols-[auto_1fr] sm:items-center">
                  <MethodBadge method={s.method} />
                  <code className="break-all font-mono text-sm text-foreground">{s.url}</code>
                </div>
                <div className="border-t border-border/60 bg-card/20 px-4 py-3 text-sm">
                  <div className="text-foreground/90">{s.function}</div>
                  {s.remark && (
                    <div className="mt-1 text-xs text-muted-foreground">Remark: {s.remark}</div>
                  )}
                </div>
              </div>
            );
          case "code":
            return <CodeBlock key={i} code={s.code} title={s.title} language={s.language} />;
          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-xl border border-border/60">
                <table className="w-full min-w-[480px] text-left text-sm">
                  <thead className="border-b border-border/60 bg-card/40 text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      {s.headers.map((h) => (
                        <th key={h} className="px-4 py-2.5 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.rows.map((row, ri) => (
                      <tr key={ri} className="border-t border-border/40 hover:bg-card/20">
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={`px-4 py-2.5 ${ci === 0 ? "font-mono text-[13px] text-foreground/90" : "text-muted-foreground"}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "list":
            return (
              <ul key={i} className="list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <div
                key={i}
                className={`rounded-xl border px-4 py-3 text-sm ${
                  s.variant === "warning"
                    ? "border-amber-500/30 bg-amber-500/10 text-amber-100/90"
                    : "border-primary/30 bg-primary/5 text-muted-foreground"
                }`}
              >
                {s.text}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
