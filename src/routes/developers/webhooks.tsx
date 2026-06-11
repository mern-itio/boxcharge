import { createFileRoute } from "@tanstack/react-router";
import { DeveloperPage } from "@/components/site/DeveloperPage";
import { buildHead } from "@/components/seo/buildHead";
import { developerConfigs } from "@/content/developers";

const cfg = developerConfigs["webhooks"];

export const Route = createFileRoute("/developers/webhooks")({
  head: () =>
    buildHead({
      title: cfg.title + " — BoxCharge Developers",
      description: cfg.summary,
      path: "/developers/webhooks",
      breadcrumbs: cfg.breadcrumbs,
      faq: cfg.faq,
    }),
  component: () => <DeveloperPage config={cfg} />,
});
