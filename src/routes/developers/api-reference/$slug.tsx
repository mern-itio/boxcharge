import { createFileRoute, notFound } from "@tanstack/react-router";
import { ApiReferenceLayout } from "@/components/api-reference/ApiReferenceLayout";
import { buildHead } from "@/components/seo/buildHead";
import { getApiPage } from "@/content/api-reference";

export const Route = createFileRoute("/developers/api-reference/$slug")({
  loader: ({ params }) => {
    const page = getApiPage(params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => {
    const page = loaderData!;
    return buildHead({
      title: `${page.title} — BoxCharge API Reference`,
      description: page.subtitle ?? page.title,
      path: `/developers/api-reference/${page.slug}`,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Developers", path: "/developers" },
        { name: "API Reference", path: "/developers/api-reference" },
        { name: page.title, path: `/developers/api-reference/${page.slug}` },
      ],
    });
  },
  component: ApiReferenceSlugPage,
  notFoundComponent: () => (
    <div className="px-4 py-32 text-center text-muted-foreground">API page not found.</div>
  ),
});

function ApiReferenceSlugPage() {
  const page = Route.useLoaderData();
  return <ApiReferenceLayout page={page} />;
}
