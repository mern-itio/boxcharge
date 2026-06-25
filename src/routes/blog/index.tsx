import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import { CmsHtmlBody } from "@/components/cms/CmsHtmlBody";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/PageBlocks";
import { buildHead } from "@/components/seo/buildHead";
import { listPublishedPosts } from "@/lib/cms.functions";
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
          {posts.map((post: { id: string; slug: string; title: string; excerpt?: string | null; cover_url?: string | null; published_at?: string | null; tags?: string[] | null }) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </Section>
      </CmsHtmlBody>
    </>
  );
}