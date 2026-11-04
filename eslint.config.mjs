import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Cloudflare builds and local state.
    ".open-next/**",
    ".wrangler/**",
    // Written by `wrangler types`; rewritten on every run.
    "cloudflare-env.d.ts",
  ]),
]);

export default eslintConfig;
