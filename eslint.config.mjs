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
  // Custom rule overrides
  {
    rules: {
      // Allow unescaped entities in JSX (common in template files)
      "react/no-unescaped-entities": "off",
      // Allow JSX comments (common in templates)
      "react/jsx-no-comment-textnodes": "off",
      // Allow explicit any in type assertions for complex dynamic content
      "@typescript-eslint/no-explicit-any": "warn",
      // setState in useEffect is sometimes necessary for initialization
      "react-hooks/set-state-in-effect": "off",
      // Impure function calls during render (random values for templates)
      "react-hooks/purity": "off",
    },
  },
]);

export default eslintConfig;
