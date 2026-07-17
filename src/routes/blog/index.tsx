import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { CmsHtmlBody } from "@/components/cms/CmsHtmlBody";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/PageBlocks";
import { buildHead } from "@/components/seo/buildHead";
import { listCategories, listPublishedPosts } from "@/lib/cms.functions";
import { BlogPostCard } from "@/components/site/BlogPostCard";

export const Route = createFileRoute("/blog/")({
  head: () =>
    buildHead({
      title: "BoxCharge Blog",
      description: "Latest insights from BoxCharge.",
      path: "/blog",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ],
    }),
  component: BlogIndex,
});

function BlogIndex() {
  const listFn = useServerFn(listPublishedPosts);
  const categoriesFn = useServerFn(listCategories);

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

      {categories.length > 0 && (
        <Section
          eyebrow="Browse by topic"
          title="Blog Categories"
          subtitle="Explore articles and guides by payment topic."
          className="!pb-0"
        >
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                to="/category/$slug"
                params={{ slug: category.slug }}
                className="rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm text-muted-foreground transition hover:border-primary/50 hover:bg-primary/10 hover:text-foreground"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CmsHtmlBody slug="blog">
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </Section>
      </CmsHtmlBody>
    </>
  );
}