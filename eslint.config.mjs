import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginImport from "eslint-plugin-import";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Custom rules for import sorting
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
    },
    plugins: {
      import: pluginImport,
      "simple-import-sort": pluginSimpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [["^\\u0000", "^@?\\w", "^[^.]", "^\\."]],
        },
      ],
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
    },
  },
];

export default eslintConfig;
