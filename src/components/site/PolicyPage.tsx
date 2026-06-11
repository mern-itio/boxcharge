import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/PageBlocks";
import { MarkdownView } from "@/components/cms/MarkdownView";
import { useContent } from "@/hooks/useContent";

export function PolicyPage({
  title,
  slug,
  intro,
  sections,
}: {
  title: string;
  slug: string;
  intro: string;
  sections: Array<{ heading: string; body: string }>;
}) {
  const cmsSlug = `policies/${slug}`;
  const { c } = useContent(cmsSlug);
  const cmsHtml = c("content_html", "");
  const cmsBody = c("body", "");

  return (
    <>
      <PageHero
        eyebrow="Policy"
        title={title}
        subtitle={c("intro", intro)}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Policies", path: "/policies/privacy" },
          { name: title, path: `/policies/${slug}` },
        ]}
        cmsSlug={cmsSlug}
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-8">
          {cmsHtml ? (
            <div
              className="prose prose-invert max-w-none text-sm leading-relaxed text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: cmsHtml }}
            />
          ) : cmsBody ? (
            <div className="prose prose-invert max-w-none text-sm leading-relaxed text-muted-foreground">
              <MarkdownView>{cmsBody}</MarkdownView>
            </div>
          ) : (
            sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-xl font-semibold">{s.heading}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))
          )}
          <p className="text-xs text-muted-foreground">
            Last updated: May 2026. This document is provided for informational purposes and is subject to update.
          </p>
        </div>
      </Section>
    </>
  );
}
