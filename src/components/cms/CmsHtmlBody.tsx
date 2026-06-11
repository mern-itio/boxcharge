import type { ReactNode } from "react";
import { useContent } from "@/hooks/useContent";
import { Section } from "@/components/site/PageBlocks";

/** Renders dashboard HTML override when set; otherwise shows default page sections. */
export function CmsHtmlBody({ slug, children }: { slug: string; children: ReactNode }) {
  const { c } = useContent(slug);
  const html = c("content_html", "");
  if (!html) return <>{children}</>;
  return (
    <Section>
      <div
        className="prose prose-invert mx-auto max-w-3xl prose-headings:font-semibold prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Section>
  );
}
