import { Link } from "@tanstack/react-router";
import { ChevronRight, BookOpen } from "lucide-react";
import { apiNav, type ApiDocPage } from "@/content/api-reference";
import { ApiDocRenderer } from "./ApiDocRenderer";

export function ApiReferenceLayout({ page }: { page: ApiDocPage }) {
  const groups = [...new Set(apiNav.map((n) => n.group))];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/developers" className="hover:text-foreground">Developers</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/developers/api-reference" className="hover:text-foreground">API Reference</Link>
        {page.slug && (
          <>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{page.title}</span>
          </>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="glass rounded-2xl p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <BookOpen className="h-4 w-4 text-primary" />
              API Reference
            </div>
            <nav className="space-y-4">
              {groups.map((group) => (
                <div key={group}>
                  <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {group}
                  </div>
                  <ul className="space-y-0.5">
                    {apiNav
                      .filter((n) => n.group === group)
                      .map((item) => {
                        const active = item.slug === page.slug;
                        const to = item.slug
                          ? "/developers/api-reference/$slug"
                          : "/developers/api-reference";
                        return (
                          <li key={item.slug || "index"}>
                            <Link
                              to={to}
                              params={item.slug ? { slug: item.slug } : undefined}
                              className={`block rounded-lg px-2.5 py-1.5 text-[13px] leading-snug transition ${
                                active
                                  ? "bg-primary/15 font-medium text-primary"
                                  : "text-muted-foreground hover:bg-card/50 hover:text-foreground"
                              }`}
                            >
                              {item.title}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        <main className="min-w-0">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{page.title}</h1>
            {page.subtitle && (
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                {page.subtitle}
              </p>
            )}
          </div>
          <ApiDocRenderer sections={page.sections} />
        </main>
      </div>
    </div>
  );
}
