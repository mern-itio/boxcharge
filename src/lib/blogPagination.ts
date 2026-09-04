/** Blog listing pagination — crawlable /blog/page/N/ URLs (12 posts per page). */

export const BLOG_POSTS_PER_PAGE = 12;

export type BlogPaginationMeta = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export function parseBlogPageParam(raw: string | undefined): number | null {
  if (!raw) return null;
  if (!/^\d+$/.test(raw)) return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 1) return null;
  return n;
}

export function blogListPath(page = 1): string {
  if (page <= 1) return "/blog/";
  return `/blog/page/${page}/`;
}

export function categoryListPath(slug: string, page = 1): string {
  if (page <= 1) return `/category/${slug}/`;
  return `/category/${slug}/page/${page}/`;
}

export function paginationMeta(total: number, page: number, pageSize = BLOG_POSTS_PER_PAGE): BlogPaginationMeta {
  const safePageSize = Math.max(1, pageSize);
  const totalPages = Math.max(1, Math.ceil(Math.max(0, total) / safePageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  return {
    page: safePage,
    pageSize: safePageSize,
    total,
    totalPages,
  };
}

export function paginationRange(meta: BlogPaginationMeta): { from: number; to: number } {
  if (meta.total === 0) return { from: 0, to: 0 };
  const from = (meta.page - 1) * meta.pageSize + 1;
  const to = Math.min(meta.page * meta.pageSize, meta.total);
  return { from, to };
}
