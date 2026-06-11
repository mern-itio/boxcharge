import { createFileRoute } from "@tanstack/react-router";
import { TechnologyPage } from "@/components/site/TechnologyPage";
import { buildHead } from "@/components/seo/buildHead";
import { technologyConfigs } from "@/content/technology";

const cfg = technologyConfigs["fraud-prevention"];

export const Route = createFileRoute("/technology/fraud-prevention")({
  head: () =>
    buildHead({
      title: cfg.title + " — BoxCharge Technology",
      description: cfg.summary,
      path: "/technology/fraud-prevention",
      breadcrumbs: cfg.breadcrumbs,
      faq: cfg.faq,
    }),
  component: () => <TechnologyPage config={cfg} />,
});
