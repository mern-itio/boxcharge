import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";
import { buildHead, serviceSchema } from "@/components/seo/buildHead";
import { solutionConfigs } from "@/content/solutions";
import { resolvePageSeo, seoFromLoader, seoHeadFields } from "@/lib/pageSeo";

const SLUG = "apm-connectivity";
const cfg = solutionConfigs[SLUG];
const path = `/solutions/${SLUG}`;

export const Route = createFileRoute("/solutions/apm-connectivity")({
  loader: () =>
    resolvePageSeo(`solutions/${SLUG}`, {
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
      schemas: [serviceSchema(cfg.title, cfg.metaDescription, path)],
    });
  },
  component: () => <SolutionPage config={cfg} />,
});
