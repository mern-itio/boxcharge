import { Link } from "@tanstack/react-router";
import { postPreviewText } from "@/lib/postPreview";

type PostPreview = {
  slug: string;
  title: string;
  excerpt?: string | null;
  content_html?: string | null;
  cover_url?: string | null;
  published_at?: string | null;
  tags?: string[] | null;
  category?: { name: string; slug: string } | null;
};

type Props = {
  post: PostPreview;
  className?: string;
  metaPrefix?: string;
};

export function BlogPostCard({ post, className = "", metaPrefix }: Props) {
  const dateLabel = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;
  const categoryLabel = post.category?.name;
  const meta =
    metaPrefix ??
    (categoryLabel && dateLabel
      ? `${categoryLabel} · ${dateLabel}`
      : categoryLabel ?? (post.tags?.[0] ? `${post.tags[0]} · ${dateLabel}` : dateLabel));
  const preview = postPreviewText(post.content_html, post.excerpt);

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className={`group glass gradient-border block overflow-hidden rounded-2xl transition-transform hover:-translate-y-1 ${className}`}
    >
      {post.cover_url ? (
        <div className="aspect-[16/9] overflow-hidden border-b border-border/40 bg-card/30">
          <img
            src={post.cover_url}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center border-b border-border/40 bg-gradient-to-br from-card/60 to-card/20 text-xs text-muted-foreground">
          BoxCharge Blog
        </div>
      )}
      <div className="p-6">
        {meta && (
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{meta}</div>
        )}
        <h3 className="mt-2 text-lg font-semibold leading-snug">{post.title}</h3>
        {preview && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{preview}</p>
        )}
        <div className="mt-4 text-xs font-medium text-primary">Read article →</div>
      </div>
    </Link>
  );
}
