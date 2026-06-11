import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { grantAdminByEmail, listAdmins, revokeAdmin } from "@/lib/cms.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Trash2, UserPlus } from "lucide-react";

export const Route = createFileRoute("/admin/team")({
  component: TeamPage,
});

function TeamPage() {
  const listFn = useServerFn(listAdmins);
  const grantFn = useServerFn(grantAdminByEmail);
  const revokeFn = useServerFn(revokeAdmin);
  const qc = useQueryClient();
  const [email, setEmail] = useState("");

  const { data: admins = [] } = useQuery({ queryKey: ["cms", "admins"], queryFn: () => listFn() });

  const grant = useMutation({
    mutationFn: (e: string) => grantFn({ data: { email: e } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "admins"] });
      toast.success("Admin added");
      setEmail("");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const revoke = useMutation({
    mutationFn: (uid: string) => revokeFn({ data: { user_id: uid } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "admins"] });
      toast.success("Admin removed");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold">Team</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Add admins by email. The person must first create an account at{" "}
        <code>/auth</code>, then you grant them admin access here.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (email.trim()) grant.mutate(email.trim());
        }}
        className="mt-5 flex flex-col gap-2 rounded-xl border border-border/60 bg-card/30 p-4 sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <Label htmlFor="grant-email" className="text-sm">User email</Label>
          <Input id="grant-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} />
        </div>
        <Button type="submit" disabled={grant.isPending}>
          <UserPlus className="mr-1 h-4 w-4" /> Grant admin
        </Button>
      </form>

      <div className="mt-6 rounded-xl border border-border/60 bg-card/30">
        <div className="border-b border-border/60 p-3 text-xs uppercase text-muted-foreground">Current admins</div>
        <ul className="divide-y divide-border/60">
          {admins.map((a) => (
            <li key={a.user_id} className="flex items-center justify-between p-3">
              <div>
                <div className="text-sm">{a.email}</div>
                <div className="text-xs text-muted-foreground">Since {new Date(a.created_at).toLocaleDateString()}</div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => revoke.mutate(a.user_id)} disabled={revoke.isPending}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </li>
          ))}
          {admins.length === 0 && <li className="p-4 text-sm text-muted-foreground">No admins yet.</li>}
        </ul>
      </div>
    </div>
  );
}
