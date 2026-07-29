import { createFileRoute } from "@tanstack/react-router";
import { CmsHtmlBody } from "@/components/cms/CmsHtmlBody";
import { PageHero } from "@/components/site/PageHero";
import { Section, FAQAccordion } from "@/components/site/PageBlocks";
import { buildHead } from "@/components/seo/buildHead";
import { pageSeoDefaults } from "@/content/seoCopy";
import { resolvePageSeo, seoFromLoader, seoHeadFields } from "@/lib/pageSeo";

const groups = [
  {
    title: "Merchant Services",
    items: [
      { q: "Who can apply for BoxCharge merchant services?", a: "Legitimate businesses operating in accordance with applicable laws. Availability depends on jurisdiction, documentation, and partner review." },
      { q: "Is approval guaranteed?", a: "No. Applications are reviewed through onboarding and compliance checks before activation." },
    ],
  },
  {
    title: "Gateway",
    items: [
      { q: "Which payment methods are supported?", a: "Cards, alternative payment methods, and bank-based flows where available through partner infrastructure." },
      { q: "Do you support multi-currency?", a: "Yes, multi-currency presentment and processing through partner acquiring relationships." },
    ],
  },
  {
    title: "Integration",
    items: [
      { q: "Do you offer hosted checkout?", a: "Yes. Hosted Checkout reduces PCI scope and supports cards plus APMs." },
      { q: "Are webhooks signed?", a: "Yes. Every webhook is signed with HMAC SHA-256." },
    ],
  },
  {
    title: "APM",
    items: [
      { q: "Which APMs are available?", a: "APM availability depends on merchant profile, region, partner availability, and onboarding review." },
    ],
  },
  {
    title: "Security",
    items: [
      { q: "Is the platform PCI DSS aligned?", a: "Infrastructure is designed to support PCI DSS aligned operations and partner compliance workflows." },
      { q: "Is the platform fraud-free?", a: "No platform can be fraud-free. The fraud prevention layer is designed to reduce risk through controls and monitoring." },
    ],
  },
  {
    title: "Onboarding",
    items: [
      { q: "How long does onboarding take?", a: "Timelines depend on documentation completeness, jurisdiction, and partner review." },
    ],
  },
];

const allFaq = groups.flatMap((g) => g.items);
const seo = pageSeoDefaults.faq;

export const Route = createFileRoute("/faq")({
  loader: () => resolvePageSeo("faq", seo),
  head: ({ loaderData }) => {
    const meta = seoFromLoader(loaderData, seo);
    return buildHead({
      ...seoHeadFields(meta),
      path: "/faq",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "FAQ", path: "/faq" },
      ],
      faq: allFaq,
    });
  },
  component: FAQPage,
});

function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        subtitle="Answers across merchant services, gateway, integration, APM, security, and onboarding."
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]}
        cmsSlug="faq"
      />
      <CmsHtmlBody slug="faq">
      {groups.map((g) => (
        <Section key={g.title} eyebrow={g.title} title={g.title}>
          <FAQAccordion items={g.items} />
        </Section>
      ))}
      </CmsHtmlBody>
    </>
  );
}
