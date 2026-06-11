import { createFileRoute } from "@tanstack/react-router";
import { ApiReferenceLayout } from "@/components/api-reference/ApiReferenceLayout";
import { buildHead } from "@/components/seo/buildHead";
import { getApiPage } from "@/content/api-reference";

const page = getApiPage("")!;

export const Route = createFileRoute("/developers/api-reference/")({
  head: () =>
    buildHead({
      title: "PAYIN Server Connect — BoxCharge API Reference",
      description: page.subtitle ?? "BoxCharge server-to-server PAYIN API documentation.",
      path: "/developers/api-reference",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Developers", path: "/developers" },
        { name: "API Reference", path: "/developers/api-reference" },
      ],
    }),
  component: () => <ApiReferenceLayout page={page} />,
});
