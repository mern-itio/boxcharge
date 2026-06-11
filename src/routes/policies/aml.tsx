import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/PolicyPage";
import { buildHead } from "@/components/seo/buildHead";

export const Route = createFileRoute("/policies/aml")({
  head: () => buildHead({
    title: "AML Policy — BoxCharge",
    description: "BoxCharge's approach to anti-money-laundering controls, KYC, and partner compliance coordination.",
    path: "/policies/aml",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Policies", path: "/policies/aml" },
      { name: "AML Policy", path: "/policies/aml" },
    ],
  }),
  component: () => (
    <PolicyPage
      title="AML Policy"
      slug="aml"
      intro="BoxCharge's approach to anti-money-laundering controls, KYC, and partner compliance coordination."
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
