import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";
import { buildHead, serviceSchema } from "@/components/seo/buildHead";
import { solutionConfigs } from "@/content/solutions";
import { resolvePageSeo, seoFromLoader } from "@/lib/pageSeo";

const SLUG = "offshore-merchant-accounts";
const cfg = solutionConfigs[SLUG];
const path = `/solutions/${SLUG}`;

export const Route = createFileRoute("/solutions/offshore-merchant-accounts")({
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
      title: seo.title,
      description: seo.description,
      path,
      keywords: seo.keywords,
      breadcrumbs: cfg.breadcrumbs,
      faq: cfg.faq,
      schemas: [serviceSchema(cfg.title, cfg.metaDescription, path)],
    });
  },
  component: () => <SolutionPage config={cfg} />,
});
