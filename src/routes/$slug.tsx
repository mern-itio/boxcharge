import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { getCmsPageBySlug } from "@/lib/cms.functions";
import { CustomPageLayout } from "@/components/site/CustomPageLayout";
import { buildHead } from "@/components/seo/buildHead";
import { customPagePath, isReservedPageSlug } from "@/lib/customPagePath";

const pageQuery = (slug: string) =>
  queryOptions({
    queryKey: ["cms-page-public", slug],
    queryFn: () => getCmsPageBySlug({ data: { slug } }),
  });

export const Route = createFileRoute("/$slug")({
  loader: async ({ params, context }) => {
    if (isReservedPageSlug(params.slug)) throw notFound();
    const page = await context.queryClient.ensureQueryData(pageQuery(params.slug));
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const path = customPagePath(loaderData.slug);
    const title = loaderData.meta_title || loaderData.title;
    const description =
      loaderData.meta_description ||
      loaderData.excerpt ||
      `${loaderData.title} — BoxCharge payment infrastructure.`;
    return buildHead({
      title,
      description,
      path,
      ogType: "article",
      image: loaderData.featured_image_url,
      imageAlt: loaderData.title,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: loaderData.title, path },
      ],
    });
  },
  component: PublicPage,
  errorComponent: ({ error }) => (
    <div className="px-4 py-32 text-center text-destructive">{error.message}</div>
  ),
  notFoundComponent: () => (
    <div className="px-4 py-32 text-center text-muted-foreground">Page not found.</div>
  ),
});

function PublicPage() {
  const { slug } = Route.useParams();
  const { data: page } = useSuspenseQuery(pageQuery(slug));
  if (!page) return null;

  return <CustomPageLayout page={page} />;
}
