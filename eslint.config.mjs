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
  ]),
  {
    rules: {
      // Demoted to `warn` site-wide:
      //
      // - `react/no-unescaped-entities`: React 19 renders apostrophes/quotes
      //   correctly; the rule is stylistic for HTML5 parsers we don't target.
      //   The legacy hardcoded marketing components have ~20 of these; fixing
      //   one by one as they're replaced by Sanity sections is cheaper than a
      //   one-shot sweep that immediately rots.
      //
      // - `react/jsx-no-comment-textnodes`: existing components use a
      //   deliberate `// EYEBROW //` decorative pattern. Migrating those to
      //   Sanity `eyebrow` fields is already planned (HANDOFF) — until then
      //   the rule produces false positives.
      //
      // Real footguns (impure render, missing keys, hooks rules,
      // no-html-link-for-pages) stay as `error`.
      "react/no-unescaped-entities": "warn",
      "react/jsx-no-comment-textnodes": "warn",
    },
  },
]);

export default eslintConfig;
