import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env");
  const text = readFileSync(envPath, "utf8");
  const env = {};
  for (const line of text.split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) env[m[1].trim()] = m[2].trim();
  }
  return env;
}

const env = loadEnv();
const url = env.SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

const email = process.argv[2] || "admin@boxcharge.com";
const password = process.argv[3] || "BoxCharge@Admin2026!";

if (!url || !serviceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data: existingList } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
const existing = existingList?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase());

let userId = existing?.id;

if (!userId) {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) {
    console.error("Create user failed:", error.message);
    process.exit(1);
  }
  userId = data.user.id;
  console.log("Created user:", email);
} else {
  const { error } = await supabase.auth.admin.updateUserById(userId, {
    password,
    email_confirm: true,
  });
  if (error) {
    console.error("Update user failed:", error.message);
    process.exit(1);
  }
  console.log("User already existed, password updated:", email);
}

const { error: roleErr } = await supabase.from("user_roles").upsert(
  { user_id: userId, role: "admin" },
  { onConflict: "user_id,role" },
);

if (roleErr) {
  console.error("Grant admin failed:", roleErr.message);
  process.exit(1);
}

console.log("Admin role granted.");
console.log("Login URL: /auth");
console.log("Email:", email);
console.log("Password:", password);
