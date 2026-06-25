import { useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

/** Adds Google Search Console verification meta tag from Site Settings. */
export function GoogleSiteVerification() {
  const settings = useSiteSettings();
  const token = settings?.google_site_verification?.trim();

  useEffect(() => {
    const name = "google-site-verification";
    const existing = document.querySelector(`meta[name="${name}"]`);

    if (!token) {
      existing?.remove();
      return;
    }

    const el = existing ?? document.createElement("meta");
    el.setAttribute("name", name);
    el.setAttribute("content", token);
    if (!existing) document.head.appendChild(el);
  }, [token]);

  return null;
}
