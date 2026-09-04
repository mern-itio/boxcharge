import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
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
  parseBlogPageParam,
} from "@/lib/blogPagination";

export const Route = createFileRoute("/category/$slug/page/$page")({
  loader: async ({ params }) => {
    const pageNum = parseBlogPageParam(params.page);
    if (pageNum === null) throw notFound();
    if (pageNum === 1) {
      throw redirect({
        to: "/category/$slug/",
        params: { slug: params.slug },
        replace: true,
      });
    }

    const category = await getCategoryBySlug({ data: { slug: params.slug } });
    if (!category) throw notFound();

    const [listing, categories] = await Promise.all([
      listPublishedPostsPage({
        data: {
          page: pageNum,
          pageSize: BLOG_POSTS_PER_PAGE,
          categorySlug: category.slug,
        },
      }),
      listCategoriesWithPublishedCounts(),
    ]);

    if (pageNum > listing.totalPages) throw notFound();

    return { category, listing, categories, pageNum };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return buildHead({
        title: "Blog Category",
        description: "Browse BoxCharge blog articles by category.",
        path: `/category/${params.slug}/page/${params.page}/`,
      });
    }

    const { category, listing } = loaderData;
    const page = listing.page;
    const path = categoryListPath(category.slug, page);
    const baseTitle = category.meta_title || `${category.name} Articles`;
    const baseDescription =
      category.meta_description ||
      category.description ||
      `Browse the latest BoxCharge articles about ${category.name}.`;

    return buildHead({
      title: `${baseTitle} — Page ${page}`,
      description: `${baseDescription} Page ${page} of ${listing.totalPages}.`,
      path,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog/" },
        { name: category.name, path: categoryListPath(category.slug) },
        { name: `Page ${page}`, path },
      ],
      prevPath: page > 1 ? categoryListPath(category.slug, page - 1) : null,
      nextPath: page < listing.totalPages ? categoryListPath(category.slug, page + 1) : null,
    });
  },
  component: CategoryPagedArchive,
  notFoundComponent: () => (
    <Section>
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <Link to="/blog/" className="mt-3 inline-block text-sm text-primary hover:underline">
          Browse all blog posts
        </Link>
      </div>
    </Section>
  ),
});

function CategoryPagedArchive() {
  const { category, listing, categories } = Route.useLoaderData();
  const { posts, page, totalPages, total } = listing;
  const { from, to } = paginationRange(listing);

  return (
    <>
      <PageHero
        eyebrow="Blog Category"
        title={`${category.name} — Page ${page}`}
        subtitle={`Articles ${from}–${to} of ${total} in ${category.name}.`}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog/" },
          { name: category.name, path: categoryListPath(category.slug) },
          { name: `Page ${page}`, path: categoryListPath(category.slug, page) },
        ]}
      />

      <Section>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <p className="mb-4 text-sm text-muted-foreground">
              Showing {from}–{to} of {total} articles
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>

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
