import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BlogPostCard } from "@/components/site/BlogPostCard";
import { buildHead } from "@/components/seo/buildHead";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/PageBlocks";
import { getCategoryArchive } from "@/lib/cms.functions";

export const Route = createFileRoute("/category/$slug")({
  loader: async ({ params }) => {
    const archive = await getCategoryArchive({ data: { slug: params.slug } });
    if (!archive) throw notFound();
    return archive;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return buildHead({
        title: "Blog Category",
        description: "Browse BoxCharge blog articles by category.",
        path: `/category/${params.slug}`,
      });
    }

    const { category } = loaderData;
    return buildHead({
      title: category.meta_title || `${category.name} Articles`,
      description:
        category.meta_description ||
        category.description ||
        `Browse the latest BoxCharge articles about ${category.name}.`,
      path: `/category/${category.slug}`,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: category.name, path: `/category/${category.slug}` },
      ],
    });
  },
  component: CategoryArchivePage,
  notFoundComponent: () => (
    <Section>
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Category not found</h1>
        <Link to="/blog" className="mt-3 inline-block text-sm text-primary hover:underline">
          Browse all blog posts
        </Link>
      </div>
    </Section>
  ),
});

function CategoryArchivePage() {
  const { category, posts } = Route.useLoaderData();

  return (
    <>
      <PageHero
        eyebrow="Blog Category"
        title={category.name}
        subtitle={
          category.description ||
          `Articles, guides, and insights about ${category.name}.`
        }
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: category.name, path: `/category/${category.slug}` },
        ]}
      />

      <Section>
        {posts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border/60 bg-card/30 p-8 text-center">
            <p className="text-muted-foreground">
              No published articles are currently assigned to this category.
            </p>
            <Link to="/blog" className="mt-3 inline-block text-sm text-primary hover:underline">
              Browse all articles
            </Link>
          </div>
        )}
      </Section>
    </>
  );
}
