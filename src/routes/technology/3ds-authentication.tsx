import { createFileRoute } from "@tanstack/react-router";
import { TechnologyPage } from "@/components/site/TechnologyPage";
import { buildHead } from "@/components/seo/buildHead";
import { technologyConfigs } from "@/content/technology";

const cfg = technologyConfigs["3ds-authentication"];

export const Route = createFileRoute("/technology/3ds-authentication")({
  head: () =>
    buildHead({
      title: cfg.title + " — BoxCharge Technology",
      description: cfg.summary,
      path: "/technology/3ds-authentication",
      breadcrumbs: cfg.breadcrumbs,
      faq: cfg.faq,
    }),
  component: () => <TechnologyPage config={cfg} />,
});
