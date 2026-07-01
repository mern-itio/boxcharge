import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export function FAQAccordion({ items }: { items: Array<{ q: string; a: string }> }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="glass rounded-2xl">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-medium">{f.q}</span>
              {isOpen ? <Minus className="h-4 w-4 text-primary" /> : <Plus className="h-4 w-4 text-muted-foreground" />}
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  align = "left",
  children,
  className = "",
  tight = false,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
  className?: string;
  /** Less vertical padding; omits top margin before children when there is no section header. */
  tight?: boolean;
}) {
  const al = align === "center" ? "text-center mx-auto" : "text-left";
  const hasHeader = !!(eyebrow || title || subtitle);
  return (
    <section id={id} className={`${tight ? "py-8" : "py-20"} ${className}`}>
      <div className="mx-auto max-w-6xl px-4">
        {hasHeader && (
          <div className={`${al} max-w-2xl`}>
            {eyebrow && (
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                <span className="gradient-text">{title}</span>
              </h2>
            )}
            {subtitle && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{subtitle}</p>}
          </div>
        )}
        {children && <div className={hasHeader ? "mt-12" : ""}>{children}</div>}
      </div>
    </section>
  );
}

export function CapabilityCards({ items }: { items: Array<{ title: string; body: string }> }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c) => (
        <div key={c.title} className="glass gradient-border rounded-2xl p-6">
          <h3 className="text-base font-semibold">{c.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
        </div>
      ))}
    </div>
  );
}

export function ProcessFlow({ steps }: { steps: string[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s} className="glass relative rounded-2xl p-5">
          <div className="font-display text-3xl font-semibold text-primary/70">0{i + 1}</div>
          <div className="mt-2 text-sm font-medium">{s}</div>
        </li>
      ))}
    </ol>
  );
}

export function CtaBanner({ title, body, cta }: { title: string; body?: string; cta: { label: string; href: string } }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="glass-strong gradient-border relative overflow-hidden rounded-3xl p-10 text-center sm:p-14">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/10" />
          <h2 className="relative text-3xl font-semibold sm:text-4xl">
            <span className="gradient-text">{title}</span>
          </h2>
          {body && (
            <p className="relative mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">{body}</p>
          )}
          <a
            href={cta.href}
            className="relative mt-7 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-electric-glow px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_40px_-8px_oklch(0.68_0.18_250/0.7)] transition-opacity hover:opacity-90"
          >
            {cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
