import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getSiteSettings, updateSiteSettings } from "@/lib/cms.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

type Form = {
  site_name: string; tagline: string; logo_url: string;
  header_cta_label: string; header_cta_href: string;
  footer_blurb: string; footer_email: string; footer_domain: string;
  social_linkedin: string; social_facebook: string; social_twitter: string;
  social_telegram: string; social_youtube: string;
  site_url: string; google_analytics_id: string; google_site_verification: string;
};

const EMPTY: Form = {
  site_name: "", tagline: "", logo_url: "",
  header_cta_label: "", header_cta_href: "",
  footer_blurb: "", footer_email: "", footer_domain: "",
  social_linkedin: "", social_facebook: "", social_twitter: "",
  social_telegram: "", social_youtube: "",
  site_url: "", google_analytics_id: "", google_site_verification: "",
};

function SettingsPage() {
  const qc = useQueryClient();
  const getFn = useServerFn(getSiteSettings);
  const upFn = useServerFn(updateSiteSettings);
  const { data, isLoading } = useQuery({
    queryKey: ["cms", "settings"],
    queryFn: () => getFn(),
  });
  const [form, setForm] = useState<Form>(EMPTY);

  useEffect(() => {
    if (data) {
      setForm({
        site_name: data.site_name ?? "",
        tagline: data.tagline ?? "",
        logo_url: data.logo_url ?? "",
        header_cta_label: data.header_cta_label ?? "",
        header_cta_href: data.header_cta_href ?? "",
        footer_blurb: data.footer_blurb ?? "",
        footer_email: data.footer_email ?? "",
        footer_domain: data.footer_domain ?? "",
        social_linkedin: data.social_linkedin ?? "",
        social_facebook: data.social_facebook ?? "",
        social_twitter: data.social_twitter ?? "",
        social_telegram: data.social_telegram ?? "",
        social_youtube: data.social_youtube ?? "",
        site_url: data.site_url ?? "",
        google_analytics_id: data.google_analytics_id ?? "",
        google_site_verification: data.google_site_verification ?? "",
      });
    }
  }, [data]);

  const save = useMutation({
    mutationFn: () => upFn({ data: form }),
    onSuccess: () => {
      toast.success("Site settings updated");
      qc.invalidateQueries({ queryKey: ["cms", "settings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <div className="text-muted-foreground">Loading…</div>;

  function field<K extends keyof Form>(key: K, label: string, type: "text" | "textarea" = "text", placeholder?: string) {
    return (
      <div>
        <Label>{label}</Label>
        {type === "textarea" ? (
          <Textarea
            className="mt-1.5"
            rows={3}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            placeholder={placeholder}
          />
        ) : (
          <Input
            className="mt-1.5"
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            placeholder={placeholder}
          />
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Site Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Global brand & contact info used by the header, footer, and meta tags. Leave blank to keep built-in defaults.
          </p>
        </div>
        <Button onClick={() => save.mutate()} disabled={save.isPending}>
          <Save className="mr-1 h-4 w-4" /> Save changes
        </Button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border/60 bg-card/30 p-5">
          <h2 className="mb-4 text-base font-semibold">Brand</h2>
          <div className="space-y-4">
            {field("site_name", "Site name", "text", "BoxCharge")}
            {field("tagline", "Tagline")}
            {field("logo_url", "Logo URL (full https://…)")}
          </div>
        </section>

        <section className="rounded-2xl border border-border/60 bg-card/30 p-5">
          <h2 className="mb-4 text-base font-semibold">Header CTA</h2>
          <div className="space-y-4">
            {field("header_cta_label", "Button label", "text", "Apply Now")}
            {field("header_cta_href", "Button link", "text", "/contact#apply")}
          </div>
        </section>

        <section className="rounded-2xl border border-border/60 bg-card/30 p-5 lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold">Footer</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {field("footer_blurb", "About blurb", "textarea")}
            <div className="space-y-4">
              {field("footer_email", "Contact email")}
              {field("footer_domain", "Domain text shown in footer")}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border/60 bg-card/30 p-5 lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold">Analytics & SEO</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {field("site_url", "Public site URL", "text", "https://boxchrge.com")}
            {field("google_analytics_id", "Google Analytics measurement ID", "text", "G-XXXXXXXXXX")}
            {field("google_site_verification", "Google Search Console verification code", "text", "paste meta content value")}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            After saving, submit{" "}
            <code className="text-foreground/80">
              {(form.site_url || "https://boxchrge.com").replace(/\/+$/, "")}/sitemap.xml
            </code>{" "}
            in Google Search Console. Analytics loads automatically when a measurement ID is set.
          </p>
        </section>

        <section className="rounded-2xl border border-border/60 bg-card/30 p-5 lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold">Social Links</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {field("social_linkedin", "LinkedIn URL")}
            {field("social_facebook", "Facebook URL")}
            {field("social_twitter", "Twitter / X URL")}
            {field("social_telegram", "Telegram URL", "text", "https://t.me/boxcharge")}
            {field("social_youtube", "YouTube URL")}
          </div>
        </section>
      </div>
    </div>
  );
}
