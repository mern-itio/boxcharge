import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (!match) continue;
    const key = match[1].trim();
    const value = match[2].trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(resolve(process.cwd(), ".env"));
process.env.NODE_ENV ??= "production";

const entry = new URL("../.output/server/index.mjs", import.meta.url);
const port = process.env.PORT ?? 3000;
console.log(`Starting BoxCharge on PORT=${port}`);

try {
  await import(entry.href);
} catch (error) {
  console.error("Failed to start production server:", error);
  process.exit(1);
}
