import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
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
  parseBlogPageParam,
} from "@/lib/blogPagination";
import { pageSeoDefaults } from "@/content/seoCopy";
import { resolvePageSeo, seoFromLoader, seoHeadFields } from "@/lib/pageSeo";

const seoDefaults = pageSeoDefaults.blog;

export const Route = createFileRoute("/blog/page/$page")({
  loader: async ({ params }) => {
    const pageNum = parseBlogPageParam(params.page);
    if (pageNum === null) throw notFound();
    if (pageNum === 1) {
      throw redirect({ to: "/blog/", replace: true });
    }

    const [seo, listing, categories] = await Promise.all([
      resolvePageSeo("blog", seoDefaults),
      listPublishedPostsPage({
        data: { page: pageNum, pageSize: BLOG_POSTS_PER_PAGE },
      }),
      listCategoriesWithPublishedCounts(),
    ]);

    if (pageNum > listing.totalPages) throw notFound();

    return { seo, listing, categories, pageNum };
  },
  head: ({ loaderData }) => {
    const meta = seoFromLoader(loaderData?.seo, seoDefaults);
    const listing = loaderData?.listing;
    const page = listing?.page ?? loaderData?.pageNum ?? 2;
    const totalPages = listing?.totalPages ?? 1;
    const path = blogListPath(page);
    const title = `${meta.title} — Page ${page}`;
    const description = `${meta.description} Page ${page} of ${totalPages}.`;

    return buildHead({
      ...seoHeadFields({ ...meta, title, description }),
      path,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog/" },
        { name: `Page ${page}`, path },
      ],
      prevPath: page > 1 ? blogListPath(page - 1) : null,
      nextPath: page < totalPages ? blogListPath(page + 1) : null,
    });
  },
  component: BlogPageNumber,
  notFoundComponent: () => (
    <Section>
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <a href="/blog/" className="mt-3 inline-block text-sm text-primary hover:underline">
          Browse all blog posts
        </a>
      </div>
    </Section>
  ),
});

function BlogPageNumber() {
  const { listing, categories } = Route.useLoaderData();
  const { posts, page, totalPages, total } = listing;
  const { from, to } = paginationRange(listing);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={`Payment Infrastructure Insights — Page ${page}`}
        subtitle={`Articles ${from}–${to} of ${total}.`}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog/" },
          { name: `Page ${page}`, path: blogListPath(page) },
        ]}
        cmsSlug="blog"
      />

      <CmsHtmlBody slug="blog">
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
