import { createFileRoute } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";
import { Section } from "@/components/site/PageBlocks";
import { buildHead, serviceSchema } from "@/components/seo/buildHead";
import { solutionConfigs } from "@/content/solutions";
import { resolvePageSeo, seoFromLoader } from "@/lib/pageSeo";

const SLUG = "iban-settlement";
const cfg = solutionConfigs[SLUG];
const path = `/solutions/${SLUG}`;

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
  loader: () =>
    resolvePageSeo(`solutions/${SLUG}`, {
      title: cfg.metaTitle,
      description: cfg.metaDescription,
      keywords: cfg.keywords,
    }),
  head: ({ loaderData }) => {
    const seo = seoFromLoader(loaderData, {
      title: cfg.metaTitle,
      description: cfg.metaDescription,
      keywords: cfg.keywords,
    });
    return buildHead({
      title: seo.title,
      description: seo.description,
      path,
      keywords: seo.keywords,
      breadcrumbs: cfg.breadcrumbs,
      faq: cfg.faq,
      schemas: [serviceSchema(cfg.title, cfg.metaDescription, path)],
    });
  },
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
