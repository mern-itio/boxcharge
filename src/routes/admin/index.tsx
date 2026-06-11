import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getDashboardStats } from "@/lib/cms.functions";
import {
  FileText, Newspaper, ListTree, Image as ImageIcon, Palette,
  ArrowRight, Layers,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const statsFn = useServerFn(getDashboardStats);
  const { data: s } = useQuery({
    queryKey: ["cms", "stats"],
    queryFn: () => statsFn(),
    staleTime: 30_000,
  });

  const cards = [
    { label: "Editable Pages", value: s?.pagesEdited ?? "—", sub: "Sections currently overridden", icon: FileText, to: "/admin/pages" },
    { label: "Content Blocks", value: s?.blocksSaved ?? "—", sub: "Saved field values", icon: Layers, to: "/admin/pages" },
    { label: "Blog Posts", value: s?.postsTotal ?? "—", sub: `${s?.postsPublished ?? 0} published`, icon: Newspaper, to: "/admin/posts" },
    { label: "Menu Items", value: s?.menuItems ?? "—", sub: "Header and footer links", icon: ListTree, to: "/admin/menus" },
    { label: "Media Items", value: s?.mediaCount ?? "—", sub: "Files in library", icon: ImageIcon, to: "/admin/media" },
    { label: "Theme Settings", value: 1, sub: "Logo, CTA, colors", icon: Palette, to: "/admin/settings" },
  ];

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage every part of the site — pages, posts, menus, header & footer, media, and theme — without code changes.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              to={c.to}
              className="group rounded-2xl border border-border/60 bg-card/40 p-5 transition-colors hover:bg-card/70"
            >
              <div className="flex items-start justify-between">
                <div className="text-sm font-medium text-muted-foreground">{c.label}</div>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2 text-3xl font-semibold tabular-nums">{c.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{c.sub}</div>
              <div className="mt-3 inline-flex items-center gap-1 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Open <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card/30 p-5">
          <h2 className="text-base font-semibold">Quick start — kya kahan se manage karein</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/admin/pages" className="font-medium text-primary hover:underline">Pages</Link>
              {" "}— Home, About, Solutions, Policies sab pages ek list mein; pencil icon se edit karein.
            </li>
            <li>
              <Link to="/admin/pages" className="font-medium text-primary hover:underline">New custom page</Link>
              {" "}— Extra pages direct URL par publish karein: <code className="text-xs">/your-slug</code>
            </li>
            <li>
              <Link to="/admin/posts" className="font-medium text-primary hover:underline">Blog Posts</Link>
              {" "}— Naye articles likhein, cover image lagayein, draft/publish karein.
            </li>
            <li>
              <Link to="/admin/menus" className="font-medium text-primary hover:underline">Menus</Link>
              {" "}— Header aur footer ke links add/remove/reorder karein.
            </li>
            <li>
              <Link to="/admin/settings" className="font-medium text-primary hover:underline">Site Settings</Link>
              {" "}— Logo, site name, social links, footer text.
            </li>
            <li>
              <Link to="/admin/media" className="font-medium text-primary hover:underline">Media Library</Link>
              {" "}— Images upload karke URL copy karein.
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/30 p-5">
          <h2 className="text-base font-semibold">How this CMS works</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li>· <strong className="text-foreground">Pages</strong> — edit any visible text, image or list on built-in pages. Layout and styling stay code-controlled.</li>
            <li>· <strong className="text-foreground">Blog Posts</strong> — full editor with markdown, tags, cover image, draft/publish workflow.</li>
            <li>· <strong className="text-foreground">Menus</strong> — manage header and footer link groups; reorder by sort number.</li>
            <li>· <strong className="text-foreground">Site Settings</strong> — site name, logo URL, header CTA, footer blurb, email, social links.</li>
            <li>· <strong className="text-foreground">Media Library</strong> — upload files and copy public URLs to use anywhere in the CMS.</li>
            <li>· <strong className="text-foreground">Team</strong> — grant or revoke admin access by email.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
