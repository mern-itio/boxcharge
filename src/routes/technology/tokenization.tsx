import { createFileRoute } from "@tanstack/react-router";
import { TechnologyPage } from "@/components/site/TechnologyPage";
import { buildHead } from "@/components/seo/buildHead";
import { technologyConfigs } from "@/content/technology";
import { resolvePageSeo, seoFromLoader, seoHeadFields } from "@/lib/pageSeo";

const SLUG = "tokenization";
const cfg = technologyConfigs[SLUG];
const path = `/technology/${SLUG}`;

export const Route = createFileRoute("/technology/tokenization")({
  loader: () =>
    resolvePageSeo(`technology/${SLUG}`, {
      title: cfg.metaTitle,
      description: cfg.metaDescription,
      keywords: cfg.keywords,
    }),
  head: ({ loaderData }) => {
    const seo = seoFromLoader(loaderData, {
      title: cfg.metaTitle,
      description: cfg.metaDescription,
      keywords: cfg.keywords,
    });
    return buildHead({
      ...seoHeadFields(seo),
      path,
      breadcrumbs: cfg.breadcrumbs,
      faq: cfg.faq,
    });
  },
  component: () => <TechnologyPage config={cfg} />,
});
