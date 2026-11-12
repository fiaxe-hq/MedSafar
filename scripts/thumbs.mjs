// Small copies of the photos shown in the header menus, in public/thumbs/.
// The menus load them as plain files, so opening a menu does not ask the
// Worker to resize a dozen photos (lib/thumb.ts). Run before every build.
//   node scripts/thumbs.mjs
import sharp from "sharp";
import { mkdirSync, readdirSync, statSync, existsSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const photos = join(root, "public", "photos");
const thumbs = join(root, "public", "thumbs");
const folders = ["care", "doctors", "hospitals"];

let made = 0;
for (const folder of folders) {
  for (const entry of readdirSync(join(photos, folder), { recursive: true, withFileTypes: true })) {
    if (!entry.isFile() || !/\.(jpe?g|png|webp)$/i.test(entry.name)) continue;
    const src = join(entry.parentPath, entry.name);
    const out = join(thumbs, relative(photos, src)).replace(/\.\w+$/, ".webp");
    if (existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs) continue;
    mkdirSync(dirname(out), { recursive: true });
    await sharp(src).rotate().resize({ width: 400, withoutEnlargement: true }).webp({ quality: 72 }).toFile(out);
    made++;
  }
}
console.log(`thumbs: ${made} made`);
