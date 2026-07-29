import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/PolicyPage";
import { buildHead } from "@/components/seo/buildHead";
import { pageSeoDefaults } from "@/content/seoCopy";
import { resolvePageSeo, seoFromLoader, seoHeadFields } from "@/lib/pageSeo";

const SLUG = "policies/privacy";
const seo = pageSeoDefaults[SLUG];
const path = "/policies/privacy";

export const Route = createFileRoute("/policies/privacy")({
  loader: () => resolvePageSeo(SLUG, seo),
  head: ({ loaderData }) => {
    const meta = seoFromLoader(loaderData, seo);
    return buildHead({
      ...seoHeadFields(meta),
      path,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Policies", path: "/policies/privacy" },
        { name: "Privacy Policy", path },
      ],
    });
  },
  component: () => (
    <PolicyPage
      title="Privacy Policy"
      slug="privacy"
      intro="How BoxCharge collects, uses, and protects information related to merchants, applicants, and visitors."
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
