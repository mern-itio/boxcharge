import { createFileRoute } from "@tanstack/react-router";
import { DeveloperPage } from "@/components/site/DeveloperPage";
import { buildHead } from "@/components/seo/buildHead";
import { developerConfigs } from "@/content/developers";

const cfg = developerConfigs["s2s-integration"];

export const Route = createFileRoute("/developers/s2s-integration")({
  head: () =>
    buildHead({
      title: cfg.title + " — BoxCharge Developers",
      description: cfg.summary,
      path: "/developers/s2s-integration",
      breadcrumbs: cfg.breadcrumbs,
      faq: cfg.faq,
    }),
  component: () => <DeveloperPage config={cfg} />,
});
