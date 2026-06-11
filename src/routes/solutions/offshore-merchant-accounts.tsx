import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";
import { buildHead, serviceSchema } from "@/components/seo/buildHead";
import { solutionConfigs } from "@/content/solutions";

const cfg = solutionConfigs["offshore-merchant-accounts"];

export const Route = createFileRoute("/solutions/offshore-merchant-accounts")({
  head: () =>
    buildHead({
      title: cfg.title + " — BoxCharge",
      description: cfg.summary,
      path: "/solutions/offshore-merchant-accounts",
      breadcrumbs: cfg.breadcrumbs,
      faq: cfg.faq,
      schemas: [serviceSchema(cfg.title, cfg.summary, "/solutions/offshore-merchant-accounts")],
    }),
  component: () => <SolutionPage config={cfg} />,
});
