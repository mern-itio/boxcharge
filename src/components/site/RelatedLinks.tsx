import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/site/PageBlocks";

export type RelatedLink = {
  label: string;
  to: string;
  description?: string;
};

/** Internal linking block for service, technology, and content pages. */
export function RelatedLinks({
  title = "Related resources",
  subtitle = "Explore connected payment solutions and guides.",
  items,
}: {
  title?: string;
  subtitle?: string;
  items: RelatedLink[];
}) {
  if (items.length === 0) return null;

  return (
    <Section eyebrow="Explore more" title={title} subtitle={subtitle}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group glass gradient-border rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
          >
            <div className="font-semibold text-foreground">{item.label}</div>
            {item.description && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            )}
            <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
              Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
