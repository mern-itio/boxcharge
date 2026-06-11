import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listMenuItems, upsertMenuItem, deleteMenuItem } from "@/lib/cms.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/menus")({
  component: MenusPage,
});

const LOCATIONS = [
  { key: "header", label: "Header — main nav" },
  { key: "footer_solutions", label: "Footer — Solutions column" },
  { key: "footer_technology", label: "Footer — Technology column" },
  { key: "footer_company", label: "Footer — Company column" },
  { key: "footer_policies", label: "Footer — Policies column" },
];

function MenusPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listMenuItems);
  const upFn = useServerFn(upsertMenuItem);
  const delFn = useServerFn(deleteMenuItem);

  const { data: items = [] } = useQuery({
    queryKey: ["cms", "menu-items"],
    queryFn: () => listFn(),
  });

  const save = useMutation({
    mutationFn: (input: { id?: string; location: string; label: string; href: string; sort_order: number }) =>
      upFn({ data: input }),
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["cms", "menu-items"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Removed");
      qc.invalidateQueries({ queryKey: ["cms", "menu-items"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold">Menus</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage header and footer navigation. If a location has no items, the site falls back to the built-in defaults — your visitors see no broken navigation.
      </p>

      <div className="mt-6 space-y-6">
        {LOCATIONS.map((loc) => {
          const locItems = items.filter((i) => i.location === loc.key);
          return (
            <section key={loc.key} className="rounded-2xl border border-border/60 bg-card/30 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">{loc.label}</h2>
                <span className="text-xs text-muted-foreground">{locItems.length} items</span>
              </div>

              <div className="mt-4 space-y-2">
                {locItems.map((item) => (
                  <MenuRow
                    key={item.id}
                    item={item}
                    onSave={(d) => save.mutate({ id: item.id, location: loc.key, ...d })}
                    onDelete={() => {
                      if (confirm(`Remove "${item.label}"?`)) del.mutate(item.id);
                    }}
                  />
                ))}
                {locItems.length === 0 && (
                  <p className="text-xs text-muted-foreground">No items yet — using site defaults.</p>
                )}
              </div>

              <NewRow onAdd={(d) => save.mutate({ location: loc.key, ...d })} nextOrder={locItems.length * 10} />
            </section>
          );
        })}
      </div>
    </div>
  );
}

function MenuRow({
  item, onSave, onDelete,
}: {
  item: { label: string; href: string; sort_order: number };
  onSave: (d: { label: string; href: string; sort_order: number }) => void;
  onDelete: () => void;
}) {
  const [label, setLabel] = useState(item.label);
  const [href, setHref] = useState(item.href);
  const [order, setOrder] = useState(item.sort_order);
  const dirty = label !== item.label || href !== item.href || order !== item.sort_order;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input className="min-w-[140px] flex-1" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label" />
      <Input className="min-w-[200px] flex-[2]" value={href} onChange={(e) => setHref(e.target.value)} placeholder="/path or https://…" />
      <Input className="w-20" type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
      <Button size="sm" variant="outline" disabled={!dirty} onClick={() => onSave({ label, href, sort_order: order })}>
        Save
      </Button>
      <Button size="sm" variant="ghost" onClick={onDelete}>
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}

function NewRow({ onAdd, nextOrder }: { onAdd: (d: { label: string; href: string; sort_order: number }) => void; nextOrder: number }) {
  const [label, setLabel] = useState("");
  const [href, setHref] = useState("");
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border/60 pt-3">
      <Input className="min-w-[140px] flex-1" placeholder="New label" value={label} onChange={(e) => setLabel(e.target.value)} />
      <Input className="min-w-[200px] flex-[2]" placeholder="/path or https://…" value={href} onChange={(e) => setHref(e.target.value)} />
      <Button
        size="sm"
        disabled={!label.trim() || !href.trim()}
        onClick={() => {
          onAdd({ label: label.trim(), href: href.trim(), sort_order: nextOrder });
          setLabel(""); setHref("");
        }}
      >
        <Plus className="mr-1 h-4 w-4" /> Add
      </Button>
    </div>
  );
}

// Keep Label import used (avoid unused-import warning)
void Label;
