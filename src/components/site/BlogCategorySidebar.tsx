import { Link } from "@tanstack/react-router";

export type BlogCategoryNavItem = {
  id: string;
  name: string;
  slug: string;
  published_post_count: number;
};

type Props = {
  categories: BlogCategoryNavItem[];
  /** Active category slug when on a category archive */
  activeSlug?: string | null;
};

/** Shared category navigation for blog index, pagination, and category archives. */
export function BlogCategorySidebar({ categories, activeSlug }: Props) {
  if (categories.length === 0) return null;

  return (
    <aside
      aria-label="Blog categories"
      className="glass rounded-2xl border border-border/60 p-5 lg:sticky lg:top-24"
    >
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        Browse by topic
      </div>
      <h2 className="mt-2 text-xl font-semibold">Categories</h2>
      <ul className="mt-4 divide-y divide-border/50">
        <li>
          <Link
            to="/blog/"
            className={`flex items-center justify-between gap-3 py-3 text-sm transition ${
              !activeSlug
                ? "font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-current={!activeSlug ? "page" : undefined}
          >
            <span>All articles</span>
          </Link>
        </li>
        {categories.map((category) => {
          const active = activeSlug === category.slug;
          return (
            <li key={category.id}>
              <Link
                to="/category/$slug"
                params={{ slug: category.slug }}
                className={`flex items-center justify-between gap-3 py-3 text-sm transition ${
                  active
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <span>{category.name}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                  {category.published_post_count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
