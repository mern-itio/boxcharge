import { createFileRoute } from "@tanstack/react-router";
import { TechnologyPage } from "@/components/site/TechnologyPage";
import { buildHead } from "@/components/seo/buildHead";
import { technologyConfigs } from "@/content/technology";

const cfg = technologyConfigs["tokenization"];

export const Route = createFileRoute("/technology/tokenization")({
  head: () =>
    buildHead({
      title: cfg.title + " — BoxCharge Technology",
      description: cfg.summary,
      path: "/technology/tokenization",
      breadcrumbs: cfg.breadcrumbs,
      faq: cfg.faq,
    }),
  component: () => <TechnologyPage config={cfg} />,
});
