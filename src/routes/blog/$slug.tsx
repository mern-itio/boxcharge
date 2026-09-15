import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/PageBlocks";
import { RelatedLinks } from "@/components/site/RelatedLinks";
import { BlogCategorySidebar } from "@/components/site/BlogCategorySidebar";
import { buildHead } from "@/components/seo/buildHead";
import { postPreviewText } from "@/lib/postPreview";
import { resolveOgImageUrl } from "@/lib/ogImage";
import { listCategoriesWithPublishedCounts } from "@/lib/cms.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    // Reserve /blog/page/* for paginated listings (not a post slug).
    if (params.slug === "page") throw notFound();

    const [{ data, error }, categories] = await Promise.all([
      supabase
        .from("posts")
        .select("*, category:categories(name, slug)")
        .eq("slug", params.slug)
        .eq("status", "published")
        .single(),
      listCategoriesWithPublishedCounts(),
    ]);

    if (error || !data) {
      throw notFound();
    }

    return { post: data, categories };
  },

  head: ({ loaderData, params }) => {
    if (!loaderData?.post) {
      return buildHead({
        title: "Article",
        description: "BoxCharge article.",
        path: `/blog/${params.slug}`,
      });
    }

    const post = loaderData.post;
    return buildHead({
      title: post.meta_title || `${post.title} — BoxCharge Blog`,
      description:
        post.meta_description ||
        postPreviewText(post.content_html, post.excerpt) ||
        post.excerpt ||
        "",
      path: `/blog/${params.slug}`,
      ogType: "article",
      image: post.cover_url,
      imageAlt: post.title,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog/" },
        { name: post.title, path: `/blog/${params.slug}` },
      ],
      schemas: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          datePublished: post.published_at,
          image: post.cover_url
            ? [resolveOgImageUrl(post.cover_url)]
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
  const { post, categories } = Route.useLoaderData();
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
          { name: "Blog", path: "/blog/" },
          { name: post.title, path: `/blog/${slug}` },
        ]}
      />

      <Section tight className="!pt-0 pb-16">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            {(category || publishedLabel) && (
              <div className="mb-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
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
            <article className="cms-prose max-w-none [&>:first-child]:mt-0">
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
          </div>

          <BlogCategorySidebar
            categories={categories}
            activeSlug={category?.slug}
          />
        </div>
      </Section>

      <RelatedLinks
        title="Continue exploring BoxCharge"
        subtitle="Connect this article with the payment products and documentation most teams evaluate next."
        items={[
          {
            label: "Payment solutions",
            to: "/solutions",
            description: "Merchant accounts, gateway, orchestration, APMs, and IBAN settlement.",
          },
          {
            label: "Technology layers",
            to: "/technology",
            description: "Smart routing, 3DS, tokenization, and fraud controls.",
          },
          {
            label: "Talk to a specialist",
            to: "/contact",
            description: "Discuss onboarding, corridors, and integration options.",
          },
        ]}
      />
    </>
  );
}
