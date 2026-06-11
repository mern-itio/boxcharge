import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/PageBlocks";
import { buildHead } from "@/components/seo/buildHead";
import { MarkdownView } from "@/components/cms/MarkdownView";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", params.slug)
      .eq("status", "published")
      .single();

    if (error || !data) {
      throw notFound();
    }

    return data;
  },

  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return buildHead({
        title: "Article",
        description: "BoxCharge article.",
        path: `/blog/${params.slug}`,
      });
    }

    return buildHead({
      title: `${loaderData.title} — BoxCharge Blog`,
      description: loaderData.excerpt || "",
      path: `/blog/${params.slug}`,
      ogType: "article",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: loaderData.title, path: `/blog/${params.slug}` },
      ],
      schemas: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: loaderData.title,
          datePublished: loaderData.published_at,
          author: {
            "@type": "Organization",
            name: "BoxCharge",
          },
          publisher: {
            "@type": "Organization",
            name: "BoxCharge",
          },
        },
      ],
    });
  },

  notFoundComponent: () => (
    <Section>
      <p className="text-muted-foreground">Article not found.</p>
    </Section>
  ),

  component: ArticlePage,
});

function ArticlePage() {
  const post = Route.useLoaderData();
  const { slug } = Route.useParams();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={post.title}
        subtitle={post.excerpt || ""}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ]}
      />

      <Section>
        <article className="prose prose-invert mx-auto max-w-4xl">
          {post.featured_image_url && (
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="mb-8 w-full rounded-lg"
            />
          )}

          {post.content_html ? (
            <div
              dangerouslySetInnerHTML={{
                __html: post.content_html,
              }}
            />
          ) : (
            <p>No content available.</p>
          )}
        </article>
      </Section>
    </>
  );
}