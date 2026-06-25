import { createFileRoute, Link, Outlet, redirect, useNavigate, useRouterState } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { bootstrapFirstAdmin, checkIsAdmin } from "@/lib/cms.functions";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, FileText, Newspaper, ListTree, Image as ImageIcon,
  Palette, Users, LogOut, ExternalLink, Search, Tags,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: AdminLayout,
  head: () => ({ meta: [{ title: "Admin — BoxCharge CMS" }] }),
});

type NavLink = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
type NavGroup = { title: string; items: NavLink[] };

const NAV: NavGroup[] = [
  {
    title: "Dashboard",
    items: [{ to: "/admin", label: "Home", icon: LayoutDashboard, exact: true }],
  },
  {
    title: "Content",
    items: [
      { to: "/admin/pages", label: "Pages", icon: FileText },
      { to: "/admin/posts", label: "Blog Posts", icon: Newspaper },
      { to: "/admin/categories", label: "Categories", icon: Tags },
      { to: "/admin/media", label: "Media Library", icon: ImageIcon },
    ],
  },
  {
    title: "Appearance",
    items: [
      { to: "/admin/menus", label: "Menus", icon: ListTree },
      { to: "/admin/settings", label: "Site Settings", icon: Palette },
      { to: "/admin/seo", label: "SEO Manager", icon: Search },
    ],
  },
  {
    title: "System",
    items: [{ to: "/admin/team", label: "Team & Roles", icon: Users }],
  },
];

function AdminLayout() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const checkFn = useServerFn(checkIsAdmin);
  const bootstrapFn = useServerFn(bootstrapFirstAdmin);

  const { data: status, isLoading } = useQuery({
    queryKey: ["cms", "is-admin"],
    queryFn: () => checkFn(),
    staleTime: 30_000,
  });

  const bootstrap = useMutation({
    mutationFn: () => bootstrapFn(),
    onSuccess: () => {
      toast.success("You are now the first admin.");
      qc.invalidateQueries({ queryKey: ["cms", "is-admin"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">Loading…</div>;
  }

  if (!status?.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="max-w-md rounded-2xl border border-border/60 bg-card/40 p-6 text-center">
          <h1 className="text-lg font-semibold">No admin access</h1>
          {status?.anyAdminExists ? (
            <p className="mt-2 text-sm text-muted-foreground">Ask an existing admin to grant you access.</p>
          ) : (
            <>
              <p className="mt-2 text-sm text-muted-foreground">
                No admins exist yet. Claim the first admin seat for this site.
              </p>
              <Button className="mt-4" onClick={() => bootstrap.mutate()} disabled={bootstrap.isPending}>
                {bootstrap.isPending ? "..." : "Become first admin"}
              </Button>
            </>
          )}
          <Button variant="ghost" className="mt-3 w-full" onClick={signOut}>Sign out</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground admin-surface">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border/60 bg-card/30 md:flex">
        <div className="border-b border-border/60 px-5 py-4">
          <div className="text-base font-semibold tracking-tight">BoxCharge</div>
          <div className="text-xs text-muted-foreground">Admin Panel</div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {NAV.map((group) => (
            <div key={group.title} className="mb-4">
              <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {group.title}
              </div>
              <div className="space-y-0.5">
                {group.items.map((n) => {
                  const Icon = n.icon;
                  const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
                  return (
                    <Link
                      key={n.to}
                      to={n.to}
                      className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                        active
                          ? "bg-primary/15 text-foreground"
                          : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {n.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="border-t border-border/60 p-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="mb-2 flex items-center gap-2 rounded-md px-3 py-2 text-xs text-muted-foreground hover:bg-white/5 hover:text-foreground"
          >
            <ExternalLink className="h-3.5 w-3.5" /> View website
          </a>
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-border/60 px-4 py-3 md:hidden">
          <div className="flex items-center justify-between">
            <Link to="/admin" className="text-sm font-semibold">BoxCharge Admin</Link>
            <Button size="sm" variant="ghost" onClick={signOut}>Sign out</Button>
          </div>
          <nav className="mt-2 flex gap-1 overflow-x-auto pb-1">
            {NAV.flatMap((g) => g.items).map((n) => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`shrink-0 rounded-md px-2.5 py-1 text-xs ${
                    active ? "bg-primary/15 text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </header>
        <div className="flex-1 overflow-auto">
          <div className="mx-auto max-w-6xl p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
