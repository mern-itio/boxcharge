import { createFileRoute } from "@tanstack/react-router";
import { DeveloperPage } from "@/components/site/DeveloperPage";
import { buildHead } from "@/components/seo/buildHead";
import { developerConfigs } from "@/content/developers";
import { resolvePageSeo, seoFromLoader } from "@/lib/pageSeo";

const SLUG = "api-integration";
const cfg = developerConfigs[SLUG];
const path = `/developers/${SLUG}`;

export const Route = createFileRoute("/developers/api-integration")({
  loader: () =>
    resolvePageSeo(`developers/${SLUG}`, {
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
    });
  },
  component: () => <DeveloperPage config={cfg} />,
});
