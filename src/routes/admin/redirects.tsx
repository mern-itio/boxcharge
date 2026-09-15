import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  deleteUrlRedirect,
  listUrlRedirects,
  upsertUrlRedirect,
} from "@/lib/cms.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/redirects")({
  component: RedirectsPage,
});

type Draft = {
  id?: string;
  from_path: string;
  to_url: string;
  status_code: number;
  enabled: boolean;
  notes: string;
};

const emptyDraft: Draft = {
  id: undefined,
  from_path: "",
  to_url: "",
  status_code: 301,
  enabled: true,
  notes: "",
};

const STATUS_OPTIONS = [
  { value: 301, label: "301 Permanent" },
  { value: 302, label: "302 Temporary" },
  { value: 307, label: "307 Temporary (keep method)" },
  { value: 308, label: "308 Permanent (keep method)" },
] as const;

function RedirectsPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listUrlRedirects);
  const upFn = useServerFn(upsertUrlRedirect);
  const delFn = useServerFn(deleteUrlRedirect);

  const { data: redirects = [], isLoading } = useQuery({
    queryKey: ["cms", "url-redirects"],
    queryFn: () => listFn(),
  });

  const [draft, setDraft] = useState<Draft>(emptyDraft);

  const save = useMutation({
    mutationFn: () =>
      upFn({
        data: {
          id: draft.id,
          from_path: draft.from_path.trim(),
          to_url: draft.to_url.trim(),
          status_code: draft.status_code,
          enabled: draft.enabled,
          notes: draft.notes.trim() || null,
        },
      }),
    onSuccess: () => {
      toast.success(draft.id ? "Redirect updated" : "Redirect added");
      setDraft(emptyDraft);
      qc.invalidateQueries({ queryKey: ["cms", "url-redirects"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Redirect deleted");
      if (draft.id) setDraft(emptyDraft);
      qc.invalidateQueries({ queryKey: ["cms", "url-redirects"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <div className="flex items-center gap-2">
        <Link to="/admin/seo">
          <Button size="sm" variant="ghost">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold">URL Redirects</h1>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Map broken or retired URLs to live pages with 301 (or other) redirects. Changes apply
        immediately after saving.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="overflow-hidden rounded-xl border border-border/60">
          <table className="w-full text-sm">
            <thead className="border-b border-border/60 bg-card/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5">From</th>
                <th className="px-4 py-2.5">To</th>
                <th className="px-4 py-2.5">Type</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    Loading…
                  </td>
                </tr>
              )}
              {!isLoading && redirects.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    No redirects yet. Add one to fix a 404.
                  </td>
                </tr>
              )}
              {redirects.map((row) => (
                <tr key={row.id} className="border-t border-border/60">
                  <td className="px-4 py-2.5 font-mono text-xs">{row.from_path}</td>
                  <td className="max-w-[220px] truncate px-4 py-2.5 font-mono text-xs text-muted-foreground">
                    {row.to_url}
                  </td>
                  <td className="px-4 py-2.5">{row.status_code}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={
                        row.enabled
                          ? "text-xs font-medium text-emerald-600"
                          : "text-xs text-muted-foreground"
                      }
                    >
                      {row.enabled ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        setDraft({
                          id: row.id,
                          from_path: row.from_path,
                          to_url: row.to_url,
                          status_code: row.status_code,
                          enabled: row.enabled,
                          notes: row.notes ?? "",
                        })
                      }
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (confirm(`Delete redirect for "${row.from_path}"?`)) {
                          del.mutate(row.id);
                        }
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="h-fit space-y-3 rounded-xl border border-border/60 bg-card/30 p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="text-sm font-semibold">
              {draft.id ? "Edit redirect" : "Add redirect"}
            </div>
            {draft.id && (
              <Button size="sm" variant="ghost" onClick={() => setDraft(emptyDraft)}>
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>

          <div>
            <Label>Old / 404 URL</Label>
            <Input
              value={draft.from_path}
              onChange={(e) => setDraft({ ...draft, from_path: e.target.value })}
              className="mt-1.5 font-mono text-sm"
              placeholder="https://boxchrge.com/old-page/ or /old-page/"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Stored as a path (e.g. /old-page). Trailing slashes are normalized.
            </p>
          </div>

          <div>
            <Label>Redirect to</Label>
            <Input
              value={draft.to_url}
              onChange={(e) => setDraft({ ...draft, to_url: e.target.value })}
              className="mt-1.5 font-mono text-sm"
              placeholder="/relevant-page/ or https://boxchrge.com/relevant-page/"
            />
          </div>

          <div>
            <Label>Redirect type</Label>
            <select
              value={draft.status_code}
              onChange={(e) =>
                setDraft({ ...draft, status_code: Number(e.target.value) })
              }
              className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-lg border border-border/50 px-3 py-2">
            <div>
              <div className="text-sm font-medium">Enabled</div>
              <div className="text-[11px] text-muted-foreground">Apply this rule on the live site</div>
            </div>
            <Switch
              checked={draft.enabled}
              onCheckedChange={(enabled) => setDraft({ ...draft, enabled })}
            />
          </div>

          <div>
            <Label>Notes (optional)</Label>
            <Textarea
              value={draft.notes}
              onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
              rows={2}
              className="mt-1.5"
              placeholder="Why this redirect exists"
              maxLength={500}
            />
          </div>

          <Button
            onClick={() => save.mutate()}
            disabled={
              !draft.from_path.trim() || !draft.to_url.trim() || save.isPending
            }
            className="w-full"
          >
            {draft.id ? <Save className="mr-1 h-4 w-4" /> : <Plus className="mr-1 h-4 w-4" />}
            {draft.id ? "Save redirect" : "Add redirect"}
          </Button>
        </div>
      </div>
    </div>
  );
}
