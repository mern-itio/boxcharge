import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";
import { buildHead, serviceSchema } from "@/components/seo/buildHead";
import { solutionConfigs } from "@/content/solutions";

const cfg = solutionConfigs["apm-connectivity"];

export const Route = createFileRoute("/solutions/apm-connectivity")({
  head: () =>
    buildHead({
      title: cfg.title + " — BoxCharge",
      description: cfg.summary,
      path: "/solutions/apm-connectivity",
      breadcrumbs: cfg.breadcrumbs,
      faq: cfg.faq,
      schemas: [serviceSchema(cfg.title, cfg.summary, "/solutions/apm-connectivity")],
    }),
  component: () => <SolutionPage config={cfg} />,
});
