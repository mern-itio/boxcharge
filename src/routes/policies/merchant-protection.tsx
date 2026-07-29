import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/PolicyPage";
import { buildHead } from "@/components/seo/buildHead";
import { pageSeoDefaults } from "@/content/seoCopy";
import { resolvePageSeo, seoFromLoader, seoHeadFields } from "@/lib/pageSeo";

const SLUG = "policies/merchant-protection";
const seo = pageSeoDefaults[SLUG];
const path = "/policies/merchant-protection";

export const Route = createFileRoute("/policies/merchant-protection")({
  loader: () => resolvePageSeo(SLUG, seo),
  head: ({ loaderData }) => {
    const meta = seoFromLoader(loaderData, seo);
    return buildHead({
      ...seoHeadFields(meta),
      path,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Policies", path: "/policies/merchant-protection" },
        { name: "Merchant Protection Policy", path },
      ],
    });
  },
  component: () => (
    <PolicyPage
      title="Merchant Protection Policy"
      slug="merchant-protection"
      intro="How BoxCharge supports merchant operations through monitoring, dispute coordination, and protective controls."
      sections={[
        { heading: "Scope", body: "This policy applies to BoxCharge services accessed via boxchrge.com and related operational systems." },
        { heading: "Information We Handle", body: "BoxCharge processes information necessary for merchant onboarding, transaction operations, and partner compliance coordination." },
        { heading: "Use of Information", body: "Information is used to operate the platform, support merchant services, and meet partner and regulatory expectations." },
        { heading: "Security", body: "Operational, technical, and organizational measures are designed to support secure handling of information across the platform." },
        { heading: "Contact", body: "Questions about this document can be sent to legal@boxchrge.com. Responses depend on inquiry type and business hours." },
      ]}
    />
  ),
});
