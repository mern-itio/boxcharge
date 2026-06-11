import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { CmsHtmlBody } from "@/components/cms/CmsHtmlBody";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/PageBlocks";
import { buildHead } from "@/components/seo/buildHead";
import { listPublishedPosts } from "@/lib/cms.functions";

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

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: () => listFn(),
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
            <Link
              key={post.id}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group glass gradient-border rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <div className="text-xs text-muted-foreground">
                {new Date(
                  post.published_at || post.created_at
                ).toLocaleDateString()}
              </div>

              <h3 className="mt-2 text-lg font-semibold">
                {post.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt || ""}
              </p>

              <div className="mt-4 text-xs text-primary">
                Read article →
              </div>
            </Link>
          ))}
        </div>
      </Section>
      </CmsHtmlBody>
    </>
  );
}