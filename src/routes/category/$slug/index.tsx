import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BlogPostCard } from "@/components/site/BlogPostCard";
import { BlogCategorySidebar } from "@/components/site/BlogCategorySidebar";
import { BlogPagination } from "@/components/site/BlogPagination";
import { buildHead } from "@/components/seo/buildHead";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/PageBlocks";
import {
  getCategoryBySlug,
  listCategoriesWithPublishedCounts,
  listPublishedPostsPage,
} from "@/lib/cms.functions";
import {
  BLOG_POSTS_PER_PAGE,
  categoryListPath,
  paginationRange,
} from "@/lib/blogPagination";

export const Route = createFileRoute("/category/$slug/")({
  loader: async ({ params }) => {
    const category = await getCategoryBySlug({ data: { slug: params.slug } });
    if (!category) throw notFound();

    const [listing, categories] = await Promise.all([
      listPublishedPostsPage({
        data: {
          page: 1,
          pageSize: BLOG_POSTS_PER_PAGE,
          categorySlug: category.slug,
        },
      }),
      listCategoriesWithPublishedCounts(),
    ]);

    return { category, listing, categories };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return buildHead({
        title: "Blog Category",
        description: "Browse BoxCharge blog articles by category.",
        path: `/category/${params.slug}/`,
      });
    }

    const { category, listing } = loaderData;
    const path = categoryListPath(category.slug, 1);
    return buildHead({
      title: category.meta_title || `${category.name} Articles`,
      description:
        category.meta_description ||
        category.description ||
        `Browse the latest BoxCharge articles about ${category.name}.`,
      path,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog/" },
        { name: category.name, path },
      ],
      nextPath: listing.totalPages > 1 ? categoryListPath(category.slug, 2) : null,
    });
  },
  component: CategoryArchivePage,
  notFoundComponent: () => (
    <Section>
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Category not found</h1>
        <Link to="/blog/" className="mt-3 inline-block text-sm text-primary hover:underline">
          Browse all blog posts
        </Link>
      </div>
    </Section>
  ),
});

function CategoryArchivePage() {
  const { category, listing, categories } = Route.useLoaderData();
  const { posts, page, totalPages, total } = listing;
  const { from, to } = paginationRange(listing);

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
          { name: "Blog", path: "/blog/" },
          { name: category.name, path: categoryListPath(category.slug) },
        ]}
      />

      <Section>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            {total > 0 && (
              <p className="mb-4 text-sm text-muted-foreground">
                Showing {from}–{to} of {total} articles
              </p>
            )}

            {posts.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-border/60 bg-card/30 p-8 text-center">
                <p className="text-muted-foreground">
                  No published articles are currently assigned to this category.
                </p>
                <Link to="/blog/" className="mt-3 inline-block text-sm text-primary hover:underline">
                  Browse all articles
                </Link>
              </div>
            )}

            <BlogPagination
              page={page}
              totalPages={totalPages}
              hrefForPage={(p) => categoryListPath(category.slug, p)}
            />
          </div>

          <BlogCategorySidebar categories={categories} activeSlug={category.slug} />
        </div>
      </Section>
    </>
  );
}
