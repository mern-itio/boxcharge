import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { CmsHtmlBody } from "@/components/cms/CmsHtmlBody";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/PageBlocks";
import { buildHead } from "@/components/seo/buildHead";
import {
  listCategoriesWithPublishedCounts,
  listPublishedPosts,
} from "@/lib/cms.functions";
import { BlogPostCard } from "@/components/site/BlogPostCard";

import { pageSeoDefaults } from "@/content/seoCopy";
import { resolvePageSeo, seoFromLoader, seoHeadFields } from "@/lib/pageSeo";

const seo = pageSeoDefaults.blog;

export const Route = createFileRoute("/blog/")({
  loader: () => resolvePageSeo("blog", seo),
  head: ({ loaderData }) => {
    const meta = seoFromLoader(loaderData, seo);
    return buildHead({
      ...seoHeadFields(meta),
      path: "/blog",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ],
    });
  },
  component: BlogIndex,
});

function BlogIndex() {
  const listFn = useServerFn(listPublishedPosts);
  const categoriesFn = useServerFn(listCategoriesWithPublishedCounts);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: () => listFn(),
  });
  const { data: categories = [] } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: () => categoriesFn(),
  });

  if (isLoading) {
    return (
      <Section>
        <div>Loading posts...</div>
      </Section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Payment Infrastructure Insights"
        subtitle="Latest articles and updates from BoxCharge."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
        cmsSlug="blog"
      />

      <CmsHtmlBody slug="blog">
        <Section>
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div>
              <div className="grid gap-5 sm:grid-cols-2">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>

            {categories.length > 0 && (
              <aside
                aria-label="Blog categories"
                className="glass rounded-2xl border border-border/60 p-5 lg:sticky lg:top-24"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Browse by topic
                </div>
                <h2 className="mt-2 text-xl font-semibold">Categories</h2>
                <ul className="mt-4 divide-y divide-border/50">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        to="/category/$slug"
                        params={{ slug: category.slug }}
                        className="flex items-center justify-between gap-3 py-3 text-sm text-muted-foreground transition hover:text-foreground"
                      >
                        <span>{category.name}</span>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                          {category.published_post_count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </Section>
      </CmsHtmlBody>
    </>
  );
}