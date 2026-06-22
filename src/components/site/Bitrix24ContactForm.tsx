import { useEffect, useRef } from "react";

const BITRIX_FORM = "inline/160/ln43iu";
const BITRIX_LOADER = "https://cdn.bitrix24.in/b20646579/crm/form/loader_160.js";

/** Bitrix24 CRM inline contact form — client-only embed. */
export function Bitrix24ContactForm() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || host.dataset.loaded === "1") return;
    host.dataset.loaded = "1";

    const script = document.createElement("script");
    script.dataset.b24Form = BITRIX_FORM;
    script.dataset.skipMoving = "true";
    script.textContent = `(function(w,d,u){var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);})(window,document,'${BITRIX_LOADER}');`;
    host.appendChild(script);
  }, []);

  return (
    <div
      ref={hostRef}
      className="bitrix24-form-host min-h-[420px] w-full overflow-hidden rounded-2xl"
      aria-label="Contact form"
    />
  );
}
