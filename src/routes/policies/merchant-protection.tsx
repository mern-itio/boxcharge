import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/PolicyPage";
import { buildHead } from "@/components/seo/buildHead";

export const Route = createFileRoute("/policies/merchant-protection")({
  head: () => buildHead({
    title: "Merchant Protection Policy — BoxCharge",
    description: "How BoxCharge supports merchant operations through monitoring, dispute coordination, and protective controls.",
    path: "/policies/merchant-protection",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Policies", path: "/policies/merchant-protection" },
      { name: "Merchant Protection Policy", path: "/policies/merchant-protection" },
    ],
  }),
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
