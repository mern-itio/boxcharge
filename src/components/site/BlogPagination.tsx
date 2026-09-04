import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  /** Current 1-based page */
  page: number;
  totalPages: number;
  /** Build href for a given page number (include trailing slash). */
  hrefForPage: (page: number) => string;
  className?: string;
};

/**
 * Crawlable HTML pagination — real <a href> links (not JS-only paging).
 */
export function BlogPagination({ page, totalPages, hrefForPage, className = "" }: Props) {
  if (totalPages <= 1) return null;

  const pages = visiblePages(page, totalPages);

  return (
    <nav
      aria-label="Blog pagination"
      className={`mt-10 flex flex-wrap items-center justify-center gap-2 ${className}`}
    >
      {page > 1 ? (
        <a
          href={hrefForPage(page - 1)}
          className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-card/40 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
          rel="prev"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </a>
      ) : (
        <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-lg border border-border/40 px-3 py-2 text-sm text-muted-foreground/40">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </span>
      )}

      <ol className="flex flex-wrap items-center gap-1.5">
        {pages.map((p, i) =>
          p === "…" ? (
            <li key={`ellipsis-${i}`} className="px-1 text-sm text-muted-foreground" aria-hidden>
              …
            </li>
          ) : (
            <li key={p}>
              {p === page ? (
                <span
                  aria-current="page"
                  className="inline-flex min-w-9 items-center justify-center rounded-lg bg-primary px-2.5 py-2 text-sm font-semibold text-primary-foreground"
                >
                  {p}
                </span>
              ) : (
                <a
                  href={hrefForPage(p)}
                  className="inline-flex min-w-9 items-center justify-center rounded-lg border border-border/60 bg-card/40 px-2.5 py-2 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                >
                  {p}
                </a>
              )}
            </li>
          ),
        )}
      </ol>

      {page < totalPages ? (
        <a
          href={hrefForPage(page + 1)}
          className="inline-flex items-center gap-1 rounded-lg border border-border/60 bg-card/40 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
          rel="next"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </a>
      ) : (
        <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-lg border border-border/40 px-3 py-2 text-sm text-muted-foreground/40">
          Next
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}

function visiblePages(current: number, total: number): Array<number | "…"> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const set = new Set<number>([1, total, current, current - 1, current + 1, current - 2, current + 2]);
  const sorted = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);

  const out: Array<number | "…"> = [];
  for (let i = 0; i < sorted.length; i++) {
    const n = sorted[i]!;
    if (i > 0 && n - sorted[i - 1]! > 1) out.push("…");
    out.push(n);
  }
  return out;
}
