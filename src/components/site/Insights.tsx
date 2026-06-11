import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { listPublishedPosts } from "@/lib/cms.functions";

export function Insights() {
  const listFn = useServerFn(listPublishedPosts);
  const { data: posts = [] } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: () => listFn(),
    staleTime: 60_000,
  });
  const top = posts.slice(0, 3);
  if (top.length === 0) return null;
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Insights
            </div>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              <span className="gradient-text">From the BoxCharge Editorial</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Perspectives on orchestration, APM connectivity, and secure global payments.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
          >
            View all articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {top.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group glass gradient-border card-lift relative block h-full overflow-hidden rounded-2xl p-6"
              >
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {p.tags?.[0] ?? "Article"} ·{" "}
                  {new Date(p.published_at ?? "").toLocaleDateString("en", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt ?? ""}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-primary transition-transform group-hover:translate-x-0.5">
                  Read article <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
