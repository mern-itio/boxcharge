import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/PageBlocks";
import { buildHead } from "@/components/seo/buildHead";
import { postPreviewText } from "@/lib/postPreview";
import { resolveOgImageUrl } from "@/lib/ogImage";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("posts")
      .select("*, category:categories(name, slug)")
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
      title: loaderData.meta_title || `${loaderData.title} — BoxCharge Blog`,
      description:
        loaderData.meta_description ||
        postPreviewText(loaderData.content_html, loaderData.excerpt) ||
        loaderData.excerpt ||
        "",
      path: `/blog/${params.slug}`,
      ogType: "article",
      image: loaderData.cover_url,
      imageAlt: loaderData.title,
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
          image: loaderData.cover_url
            ? [resolveOgImageUrl(loaderData.cover_url)]
            : [resolveOgImageUrl(null)],
          author: {
            "@type": "Organization",
            name: "BoxCharge",
          },
          publisher: {
            "@type": "Organization",
            name: "BoxCharge",
            logo: {
              "@type": "ImageObject",
              url: "https://boxchrge.com/favicon-192.png",
            },
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
  const category = post.category as { name: string; slug: string } | null | undefined;
  const publishedLabel = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <>
      <PageHero
        eyebrow={category?.name ?? "Blog"}
        title={post.title}
        compact
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ]}
      />

      <Section tight className="!pt-0 pb-16">
        {(category || publishedLabel) && (
          <div className="mx-auto mb-4 flex max-w-4xl flex-wrap gap-3 text-xs text-muted-foreground">
            {category && (
              <Link
                to="/category/$slug"
                params={{ slug: category.slug }}
                className="rounded-full border border-border/60 bg-card/40 px-3 py-1 uppercase tracking-wider transition hover:border-primary/50 hover:text-foreground"
              >
                {category.name}
              </Link>
            )}
            {publishedLabel && <span>Published {publishedLabel}</span>}
          </div>
        )}
        <article className="cms-prose mx-auto max-w-4xl [&>:first-child]:mt-0">
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