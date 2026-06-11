import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";
import { buildHead, serviceSchema } from "@/components/seo/buildHead";
import { solutionConfigs } from "@/content/solutions";

const cfg = solutionConfigs["payment-orchestration"];

export const Route = createFileRoute("/solutions/payment-orchestration")({
  head: () =>
    buildHead({
      title: cfg.title + " — BoxCharge",
      description: cfg.summary,
      path: "/solutions/payment-orchestration",
      breadcrumbs: cfg.breadcrumbs,
      faq: cfg.faq,
      schemas: [serviceSchema(cfg.title, cfg.summary, "/solutions/payment-orchestration")],
    }),
  component: () => <SolutionPage config={cfg} />,
});
