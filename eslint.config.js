import tailwindcss from "eslint-plugin-better-tailwindcss";
import {
	getDefaultAttributes,
	getDefaultVariables,
} from "eslint-plugin-better-tailwindcss/api/defaults";
import jestDom from "eslint-plugin-jest-dom";
import testingLibrary from "eslint-plugin-testing-library";
import { defineConfig } from "eslint/config";
import { configs as tsEslint } from "typescript-eslint";

export default defineConfig(
	{ ignores: [".vscode/*", ".zed/*", "dist/*", "reports/*"] },

	{ linterOptions: { reportUnusedDisableDirectives: true } },

	{ files: ["src/**/*.{ts,tsx}"], extends: [tsEslint.base] },

	{
		files: ["src/**/*.tsx"],
		extends: [tailwindcss.configs.recommended],
		settings: {
			"better-tailwindcss": {
				entryPoint: "src/index.css",
				variables: [
					...getDefaultVariables(),
					[".+ClassNames", [{ match: "strings" }, { match: "objectValues" }]],
				],
				attributes: [
					...getDefaultAttributes(),
					["classNames", [{ match: "strings" }, { match: "objectValues" }]],
					[".+ClassNames", [{ match: "strings" }, { match: "objectValues" }]],
				],
			},
		},
		rules: {
			"better-tailwindcss/enforce-consistent-line-wrapping": "off",
			"better-tailwindcss/enforce-consistent-important-position": "error",
			"better-tailwindcss/enforce-shorthand-classes": "error",
		},
	},

	{
		files: ["src/**/*.test.{ts,tsx}"],
		extends: [
			testingLibrary.configs["flat/dom"],
			jestDom.configs["flat/recommended"],
		],
	},
);
