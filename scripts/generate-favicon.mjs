import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { Jimp } from "jimp";
import pngToIco from "png-to-ico";

const logoPath = resolve("src/assets/boxcharge-logo.png");
const publicDir = resolve("public");

const logo = await Jimp.read(logoPath);
// Crop the starting BC mark from the latest logo (left square).
const cropSize = logo.bitmap.height;
const bcIcon = logo.clone().crop({ x: 0, y: 0, w: cropSize, h: cropSize });

const sizes = [
  { name: "favicon-16.png", size: 16 },
  { name: "favicon-32.png", size: 32 },
  { name: "favicon-192.png", size: 192 },
  { name: "apple-touch-icon.png", size: 180 },
];

const icoInputs = [];
for (const { name, size } of sizes) {
  const out = resolve(publicDir, name);
  await bcIcon.clone().resize({ w: size, h: size }).write(out);
  if (size === 16 || size === 32 || size === 192) icoInputs.push(out);
}

const ico = await pngToIco(icoInputs);
writeFileSync(resolve(publicDir, "favicon.ico"), ico);
await bcIcon.clone().resize({ w: 512, h: 512 }).write(resolve(publicDir, "favicon.png"));

console.log("Generated favicons from BoxCharge BC logo mark");
