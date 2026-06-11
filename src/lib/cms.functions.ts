import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import { isReservedPageSlug } from "@/lib/customPagePath";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database, Json } from "@/integrations/supabase/types";

type SBClient = SupabaseClient<Database>;

// -------- Public reads --------
export const getPageContent = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => z.object({ slug: z.string().min(1).max(120) }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("content_blocks")
      .select("block_key,value_json,updated_at")
      .eq("page_slug", data.slug);
    if (error) throw new Error(error.message);
    const map: Record<string, Json> = {};
    for (const r of rows ?? []) {
      const v = (r.value_json as { v?: Json } | null)?.v;
      map[r.block_key] = v ?? null;
    }
    return map;
  });

// -------- Admin guard --------
async function assertAdmin(supabase: SBClient, userId: string) {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin only");
}

// -------- Save block --------
export const saveBlock = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { slug: string; key: string; value: Json }) =>
    z.object({
      slug: z.string().min(1).max(120),
      key: z.string().min(1).max(120),
      value: z.any(),
    }).parse(input) as { slug: string; key: string; value: Json },
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    const { error } = await (context.supabase as SBClient)
      .from("content_blocks")
      .upsert(
        { page_slug: data.slug, block_key: data.key, value_json: { v: data.value } as Json, updated_by: context.userId },
        { onConflict: "page_slug,block_key" },
      );
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// -------- Media --------
export const listMedia = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    const { data, error } = await (context.supabase as SBClient)
      .from("media_assets")
      .select("id,filename,url,alt,mime_type,size_bytes,created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const recordMedia = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { filename: string; url: string; alt?: string; mime_type?: string; size_bytes?: number }) =>
    z.object({
      filename: z.string().min(1).max(255),
      url: z.string().url().max(2048),
      alt: z.string().max(500).optional(),
      mime_type: z.string().max(120).optional(),
      size_bytes: z.number().int().nonnegative().optional(),
    }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    const { error } = await (context.supabase as SBClient)
      .from("media_assets")
      .insert({ ...data, uploaded_by: context.userId });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteMedia = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    const { error } = await (context.supabase as SBClient).from("media_assets").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// -------- Admin team --------
export const listAdmins = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roles, error } = await supabaseAdmin
      .from("user_roles")
      .select("user_id,created_at")
      .eq("role", "admin");
    if (error) throw new Error(error.message);
    const users = await Promise.all(
      (roles ?? []).map(async (r) => {
        const { data } = await supabaseAdmin.auth.admin.getUserById(r.user_id);
        return {
          user_id: r.user_id,
          email: data.user?.email ?? "(unknown)",
          created_at: r.created_at,
        };
      }),
    );
    return users;
  });

export const grantAdminByEmail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { email: string }) =>
    z.object({ email: z.string().trim().email().max(255) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: list, error: lerr } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    if (lerr) throw new Error(lerr.message);
    const user = list.users.find((u) => u.email?.toLowerCase() === data.email.toLowerCase());
    if (!user) throw new Error("No user with that email. They must sign up first at /auth.");
    const { error } = await supabaseAdmin.from("user_roles").insert({ user_id: user.id, role: "admin" });
    if (error && !error.message.includes("duplicate")) throw new Error(error.message);
    return { ok: true, email: user.email ?? "" };
  });

export const revokeAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { user_id: string }) => z.object({ user_id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    if (data.user_id === context.userId) throw new Error("You cannot remove yourself.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("user_roles").delete().eq("user_id", data.user_id).eq("role", "admin");
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// -------- Bootstrap / role check --------
export const bootstrapFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count, error: cerr } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if (cerr) throw new Error(cerr.message);
    if ((count ?? 0) > 0) throw new Error("An admin already exists. Ask an existing admin to invite you.");
    const { error } = await supabaseAdmin.from("user_roles").insert({ user_id: context.userId, role: "admin" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .handler(async () => {
    const { getRequest } = await import("@tanstack/react-start/server");
    const { createClient } = await import("@supabase/supabase-js");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    const anyAdminExists = (count ?? 0) > 0;

    const authHeader = getRequest()?.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) return { isAdmin: false, anyAdminExists };

    const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!);
    const { data: claims } = await sb.auth.getClaims(token);
    const userId = claims?.claims?.sub;
    if (!userId) return { isAdmin: false, anyAdminExists };

    const { data: mine } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    return { isAdmin: !!mine, anyAdminExists };
  });

// ============================================================
// POSTS
// ============================================================
const postInput = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(160).regex(/^[a-z0-9-]+$/, "lowercase letters, numbers, hyphens"),
  title: z.string().min(1).max(240),
  excerpt: z.string().max(600).nullable().optional(),
  body_md: z.string().max(200_000).default(""),
  content_html: z.string().max(500_000).nullable().optional(),
  cover_url: z.string().url().max(2048).nullable().optional().or(z.literal("")),
  tags: z.array(z.string().max(40)).max(20).default([]),
  status: z.enum(["draft", "published"]).default("draft"),
  published_at: z.string().nullable().optional(),
  meta_title: z.string().max(240).nullable().optional(),
  meta_description: z.string().max(500).nullable().optional(),
  category_id: z.string().uuid().nullable().optional(),
});

export const listPostsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    const { data, error } = await (context.supabase as SBClient)
      .from("posts")
      .select("id,slug,title,excerpt,status,published_at,tags,cover_url,updated_at")
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const listPublishedPosts = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("posts")
      .select("id,slug,title,excerpt,cover_url,tags,published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => z.object({ slug: z.string().min(1).max(160) }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("posts")
      .select("*")
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });

export const getPostByIdAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    const { data: row, error } = await (context.supabase as SBClient)
      .from("posts").select("*").eq("id", data.id).maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });

export const upsertPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => postInput.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    const payload = {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt ?? null,
      body_md: data.body_md,
      content_html: data.content_html ?? null,
      cover_url: data.cover_url || null,
      tags: data.tags,
      status: data.status,
      published_at: data.status === "published" ? (data.published_at ?? new Date().toISOString()) : null,
      meta_title: data.meta_title ?? null,
      meta_description: data.meta_description ?? null,
      category_id: data.category_id ?? null,
      updated_by: context.userId,
    };
    const sb = context.supabase as SBClient;
    if (data.id) {
      const { error } = await sb.from("posts").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true, id: data.id };
    }
    const { data: ins, error } = await sb
      .from("posts").insert({ ...payload, author_id: context.userId }).select("id").single();
    if (error) throw new Error(error.message);
    return { ok: true, id: ins.id };
  });

export const deletePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    const { error } = await (context.supabase as SBClient).from("posts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ============================================================
// MENU ITEMS
// ============================================================
const menuItemInput = z.object({
  id: z.string().uuid().optional(),
  location: z.string().min(1).max(60),
  label: z.string().min(1).max(120),
  href: z.string().min(1).max(500),
  sort_order: z.number().int().default(0),
  parent_id: z.string().uuid().nullable().optional(),
});

export const listMenuItems = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("menu_items")
      .select("id,location,label,href,sort_order,parent_id")
      .order("location").order("sort_order");
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const upsertMenuItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => menuItemInput.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    const sb = context.supabase as SBClient;
    const payload = { ...data, updated_by: context.userId };
    if (data.id) {
      const { error } = await sb.from("menu_items").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true, id: data.id };
    }
    const { id: _, ...rest } = payload;
    const { data: ins, error } = await sb.from("menu_items").insert(rest).select("id").single();
    if (error) throw new Error(error.message);
    return { ok: true, id: ins.id };
  });

export const deleteMenuItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    const { error } = await (context.supabase as SBClient).from("menu_items").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ============================================================
// SITE SETTINGS
// ============================================================
const siteSettingsInput = z.object({
  site_name: z.string().max(120).nullable().optional(),
  tagline: z.string().max(240).nullable().optional(),
  logo_url: z.string().url().max(2048).nullable().optional().or(z.literal("")),
  header_cta_label: z.string().max(60).nullable().optional(),
  header_cta_href: z.string().max(500).nullable().optional(),
  footer_blurb: z.string().max(1000).nullable().optional(),
  footer_email: z.string().max(200).nullable().optional(),
  footer_domain: z.string().max(200).nullable().optional(),
  social_linkedin: z.string().max(500).nullable().optional(),
  social_twitter: z.string().max(500).nullable().optional(),
  social_youtube: z.string().max(500).nullable().optional(),
  brand_primary: z.string().max(60).nullable().optional(),
  brand_accent: z.string().max(60).nullable().optional(),
});

export const getSiteSettings = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin.from("site_settings").select("*").eq("id", 1).maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  });

export const updateSiteSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => siteSettingsInput.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    const cleaned = Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, v === "" ? null : v]),
    );
    const { error } = await (context.supabase as SBClient)
      .from("site_settings")
      .update({ ...cleaned, updated_by: context.userId })
      .eq("id", 1);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ============================================================
// DASHBOARD STATS
// ============================================================
export const getDashboardStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [pages, posts, menu, media, blocks] = await Promise.all([
      supabaseAdmin.from("content_blocks").select("page_slug", { count: "exact", head: false }),
      supabaseAdmin.from("posts").select("id,status", { count: "exact" }),
      supabaseAdmin.from("menu_items").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("media_assets").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("content_blocks").select("id", { count: "exact", head: true }),
    ]);
    const uniquePages = new Set((pages.data ?? []).map((r) => r.page_slug)).size;
    const postRows = posts.data ?? [];
    return {
      pagesEdited: uniquePages,
      blocksSaved: blocks.count ?? 0,
      postsTotal: postRows.length,
      postsPublished: postRows.filter((p) => p.status === "published").length,
      menuItems: menu.count ?? 0,
      mediaCount: media.count ?? 0,
    };
  });

// ============================================================
// CATEGORIES
// ============================================================
const categoryInput = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(120),
  slug: z.string().min(1).max(160).regex(/^[a-z0-9-]+$/, "lowercase letters, numbers, hyphens"),
  description: z.string().max(500).nullable().optional(),
});

export const listCategories = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin.from("categories").select("*").order("name");
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const upsertCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => categoryInput.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    const sb = context.supabase as SBClient;
    const payload = { name: data.name, slug: data.slug, description: data.description ?? null, updated_by: context.userId };
    if (data.id) {
      const { error } = await sb.from("categories").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true, id: data.id };
    }
    const { data: ins, error } = await sb.from("categories").insert(payload).select("id").single();
    if (error) throw new Error(error.message);
    return { ok: true, id: ins.id };
  });

export const deleteCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    const { error } = await (context.supabase as SBClient).from("categories").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ============================================================
// CMS PAGES (dynamic, admin-created)
// ============================================================
const cmsPageInput = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(160).regex(/^[a-z0-9-]+$/, "lowercase letters, numbers, hyphens"),
  title: z.string().min(1).max(240),
  content_html: z.string().max(500_000).default(""),
  excerpt: z.string().max(600).nullable().optional(),
  featured_image_url: z.string().url().max(2048).nullable().optional().or(z.literal("")),
  status: z.enum(["draft", "published"]).default("draft"),
  meta_title: z.string().max(240).nullable().optional(),
  meta_description: z.string().max(500).nullable().optional(),
});

export const listCmsPagesAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    const { data, error } = await (context.supabase as SBClient)
      .from("cms_pages")
      .select("id,slug,title,status,published_at,updated_at,featured_image_url")
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const getCmsPageBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => z.object({ slug: z.string().min(1).max(160) }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("cms_pages")
      .select("*")
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });

export const getCmsPageByIdAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    const { data: row, error } = await (context.supabase as SBClient)
      .from("cms_pages").select("*").eq("id", data.id).maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });

export const upsertCmsPage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => cmsPageInput.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    if (isReservedPageSlug(data.slug)) {
      throw new Error(`Slug "${data.slug}" is reserved — choose a different URL.`);
    }
    const sb = context.supabase as SBClient;
    const payload = {
      slug: data.slug,
      title: data.title,
      content_html: data.content_html,
      excerpt: data.excerpt ?? null,
      featured_image_url: data.featured_image_url || null,
      status: data.status,
      meta_title: data.meta_title ?? null,
      meta_description: data.meta_description ?? null,
      published_at: data.status === "published" ? new Date().toISOString() : null,
      updated_by: context.userId,
    };
    if (data.id) {
      const { error } = await sb.from("cms_pages").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true, id: data.id };
    }
    const { data: ins, error } = await sb
      .from("cms_pages").insert({ ...payload, author_id: context.userId }).select("id").single();
    if (error) throw new Error(error.message);
    return { ok: true, id: ins.id };
  });

export const deleteCmsPage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as SBClient, context.userId);
    const { error } = await (context.supabase as SBClient).from("cms_pages").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
