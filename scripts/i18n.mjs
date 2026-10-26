// Writes public/i18n/en.json: every English sentence on the site, by path.
// Each language is public/i18n/<code>.json with the same paths, translated.
//   node scripts/i18n.mjs              write en.json
//   node scripts/i18n.mjs check        also report missing, extra or broken sentences per language
//   node scripts/i18n.mjs split        also cut en.json into parts in i18n-work/en/, for translating
//   node scripts/i18n.mjs merge <code> join i18n-work/<code>/ into public/i18n/<code>.json
import { build } from "esbuild";
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const out = join(tmpdir(), `medsafar-i18n-${process.pid}.mjs`);
await build({
  stdin: {
    contents: `export { source } from "./lib/i18n/source"; export { flatten } from "./lib/i18n/walk";`,
    resolveDir: root,
    loader: "ts",
  },
  bundle: true,
  format: "esm",
  platform: "node",
  outfile: out,
  alias: { "@": root },
  logLevel: "error",
});
const { source, flatten } = await import(pathToFileURL(out).href);
const en = flatten(source);
const dir = join(root, "public", "i18n");
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "en.json"), JSON.stringify(en, null, 1) + "\n");
console.log(`en.json: ${Object.keys(en).length} sentences`);

/** Placeholders such as {n} must survive translation. */
const holes = (text) => (text.match(/\{\w+\}/g) ?? []).sort().join(" ");

function problems(dict) {
  const missing = Object.keys(en).filter((k) => typeof dict[k] !== "string" || !dict[k].trim());
  const extra = Object.keys(dict).filter((k) => !(k in en));
  const broken = Object.keys(en).filter((k) => typeof dict[k] === "string" && holes(dict[k]) !== holes(en[k]));
  return { missing, extra, broken };
}

const mode = process.argv[2];
const work = join(root, "i18n-work");

if (mode === "check") {
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "en.json").sort()) {
    const { missing, extra, broken } = problems(JSON.parse(readFileSync(join(dir, file), "utf8")));
    console.log(`${file}: ${missing.length} missing, ${extra.length} extra, ${broken.length} broken placeholders`);
  }
}

if (mode === "split") {
  // Parts of about 20 KB, cut between sentences.
  const parts = [];
  let part = {};
  let size = 0;
  for (const [k, v] of Object.entries(en)) {
    if (size > 20000) {
      parts.push(part);
      part = {};
      size = 0;
    }
    part[k] = v;
    size += k.length + v.length;
  }
  parts.push(part);
  mkdirSync(join(work, "en"), { recursive: true });
  parts.forEach((p, i) =>
    writeFileSync(join(work, "en", `${String(i + 1).padStart(2, "0")}.json`), JSON.stringify(p, null, 1) + "\n"),
  );
  console.log(`${parts.length} parts in i18n-work/en/`);
}

if (mode === "merge") {
  const code = process.argv[3];
  const from = join(work, code);
  const dict = {};
  for (const file of readdirSync(from).filter((f) => f.endsWith(".json")).sort()) {
    Object.assign(dict, JSON.parse(readFileSync(join(from, file), "utf8")));
  }
  const { missing, extra, broken } = problems(dict);
  for (const k of extra) delete dict[k];
  writeFileSync(join(dir, `${code}.json`), JSON.stringify(dict) + "\n");
  console.log(
    `${code}.json: ${Object.keys(dict).length} sentences, ${missing.length} missing, ${extra.length} extra dropped, ${broken.length} broken placeholders`,
  );
  if (missing.length) console.log("  missing:", missing.slice(0, 10).join(", "));
  if (broken.length) console.log("  broken:", broken.slice(0, 10).join(", "));
}
