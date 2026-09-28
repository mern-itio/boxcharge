import { createFileRoute } from "@tanstack/react-router";
import { CmsHtmlBody } from "@/components/cms/CmsHtmlBody";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/PageBlocks";
import { BlogPostCard } from "@/components/site/BlogPostCard";
import { BlogCategorySidebar } from "@/components/site/BlogCategorySidebar";
import { BlogPagination } from "@/components/site/BlogPagination";
import { buildHead } from "@/components/seo/buildHead";
import {
  listCategoriesWithPublishedCounts,
  listPublishedPostsPage,
} from "@/lib/cms.functions";
import {
  BLOG_POSTS_PER_PAGE,
  blogListPath,
  paginationRange,
} from "@/lib/blogPagination";
import { pageSeoDefaults } from "@/content/seoCopy";
import { resolvePageSeo, seoFromLoader, seoHeadFields } from "@/lib/pageSeo";

const seoDefaults = pageSeoDefaults.blog;

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    const [seo, listing, categories] = await Promise.all([
      resolvePageSeo("blog", seoDefaults),
      listPublishedPostsPage({
        data: { page: 1, pageSize: BLOG_POSTS_PER_PAGE },
      }),
      listCategoriesWithPublishedCounts(),
    ]);
    return { seo, listing, categories };
  },
  head: ({ loaderData }) => {
    const meta = seoFromLoader(loaderData?.seo, seoDefaults);
    const listing = loaderData?.listing;
    const page = listing?.page ?? 1;
    const totalPages = listing?.totalPages ?? 1;
    const path = blogListPath(1);
    return buildHead({
      ...seoHeadFields(meta),
      exactTitle: true,
      path,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog/" },
      ],
      nextPath: totalPages > 1 ? blogListPath(page + 1) : null,
    });
  },
  component: BlogIndex,
});

function BlogIndex() {
  const { listing, categories } = Route.useLoaderData();
  const { posts, page, totalPages, total } = listing;
  const { from, to } = paginationRange(listing);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Payment Infrastructure Insights"
        subtitle="Latest articles and updates from BoxCharge."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog/" },
        ]}
        cmsSlug="blog"
      />

      <CmsHtmlBody slug="blog">
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
                <div className="rounded-2xl border border-border/60 bg-card/30 p-8 text-center text-muted-foreground">
                  No published articles yet.
                </div>
              )}

              <BlogPagination
                page={page}
                totalPages={totalPages}
                hrefForPage={blogListPath}
              />
            </div>

            <BlogCategorySidebar categories={categories} />
          </div>
        </Section>
      </CmsHtmlBody>
    </>
  );
}
