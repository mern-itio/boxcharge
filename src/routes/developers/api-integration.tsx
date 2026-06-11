import { createFileRoute } from "@tanstack/react-router";
import { DeveloperPage } from "@/components/site/DeveloperPage";
import { buildHead } from "@/components/seo/buildHead";
import { developerConfigs } from "@/content/developers";

const cfg = developerConfigs["api-integration"];

export const Route = createFileRoute("/developers/api-integration")({
  head: () =>
    buildHead({
      title: cfg.title + " — BoxCharge Developers",
      description: cfg.summary,
      path: "/developers/api-integration",
      breadcrumbs: cfg.breadcrumbs,
      faq: cfg.faq,
    }),
  component: () => <DeveloperPage config={cfg} />,
});
