import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";
import {
  lookupEnabledRedirect,
  resolveRedirectLocation,
  shouldSkipRedirectLookup,
} from "@/lib/urlRedirects";

const redirectMiddleware = createMiddleware().server(async ({ next, request }) => {
  try {
    const url = new URL(request.url);
    if (!shouldSkipRedirectLookup(url.pathname, request.method)) {
      const hit = await lookupEnabledRedirect(url.pathname);
      if (hit) {
        const location = resolveRedirectLocation(hit.to_url, url.origin);
        return new Response(null, {
          status: hit.status_code,
          headers: {
            Location: location,
            "Cache-Control": "public, max-age=300",
          },
        });
      }
    }
  } catch (error) {
    console.error("[url-redirects] middleware error:", error);
  }
  return next();
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [redirectMiddleware, errorMiddleware],
}));
