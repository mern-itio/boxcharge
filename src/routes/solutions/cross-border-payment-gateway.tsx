import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";
import { buildHead, serviceSchema } from "@/components/seo/buildHead";
import { solutionConfigs } from "@/content/solutions";

const cfg = solutionConfigs["cross-border-payment-gateway"];

export const Route = createFileRoute("/solutions/cross-border-payment-gateway")({
  head: () =>
    buildHead({
      title: cfg.title + " — BoxCharge",
      description: cfg.summary,
      path: "/solutions/cross-border-payment-gateway",
      breadcrumbs: cfg.breadcrumbs,
      faq: cfg.faq,
      schemas: [serviceSchema(cfg.title, cfg.summary, "/solutions/cross-border-payment-gateway")],
    }),
  component: () => <SolutionPage config={cfg} />,
});
