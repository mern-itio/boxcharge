import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";
import { Section } from "@/components/site/PageBlocks";
import { buildHead, serviceSchema } from "@/components/seo/buildHead";
import { solutionConfigs } from "@/content/solutions";

const cfg = solutionConfigs["iban-settlement"];

const SEPA_COUNTRIES = [
  "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia",
  "Denmark", "Estonia", "Finland", "France", "Germany", "Greece",
  "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg",
  "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia",
  "Slovenia", "Spain", "Sweden",
  "United Kingdom", "Switzerland", "Norway", "Iceland", "Liechtenstein",
  "Monaco", "Andorra", "San Marino", "Vatican City",
];

export const Route = createFileRoute("/solutions/iban-settlement")({
  head: () =>
    buildHead({
      title: cfg.title + " — BoxCharge",
      description: cfg.summary,
      path: "/solutions/iban-settlement",
      breadcrumbs: cfg.breadcrumbs,
      faq: cfg.faq,
      schemas: [serviceSchema(cfg.title, cfg.summary, "/solutions/iban-settlement")],
    }),
  component: IbanPage,
});

function IbanPage() {
  return (
    <>
      <SolutionPage config={cfg} />
      <Section
        eyebrow="SEPA Coverage"
        title="Pay In & Pay Out Across 36 SEPA Countries"
        subtitle="Send SEPA Credit Transfers (SCT) and SEPA Instant (SCT Inst) to any euro IBAN — typically arriving within seconds for SCT Inst, or T+1 for standard SCT. EUR settlement direct to your IBAN."
      >
        <div className="flex flex-wrap gap-2">
          {SEPA_COUNTRIES.map((c) => (
            <span
              key={c}
              className="rounded-full border border-border bg-card/40 px-3 py-1 text-xs text-foreground/85"
            >
              {c}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}
