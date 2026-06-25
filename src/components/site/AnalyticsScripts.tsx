import { useSiteSettings } from "@/hooks/useSiteSettings";

/** Injects Google Analytics (gtag) when configured in Site Settings. */
export function AnalyticsScripts() {
  const settings = useSiteSettings();
  const gaId = settings?.google_analytics_id?.trim();
  if (!gaId) return null;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');
`.trim(),
        }}
      />
    </>
  );
}
