import { createFileRoute } from "@tanstack/react-router";
import { DeveloperPage } from "@/components/site/DeveloperPage";
import { buildHead } from "@/components/seo/buildHead";
import { developerConfigs } from "@/content/developers";
import { resolvePageSeo, seoFromLoader, seoHeadFields } from "@/lib/pageSeo";

const SLUG = "webhooks";
const cfg = developerConfigs[SLUG];
const path = `/developers/${SLUG}`;

export const Route = createFileRoute("/developers/webhooks")({
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
      ...seoHeadFields(seo),
      path,
      breadcrumbs: cfg.breadcrumbs,
      faq: cfg.faq,
    });
  },
  component: () => <DeveloperPage config={cfg} />,
});
