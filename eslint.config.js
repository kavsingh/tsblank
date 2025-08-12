import tailwindcss from "eslint-plugin-better-tailwindcss";
import {
	getDefaultAttributes,
	getDefaultVariables,
} from "eslint-plugin-better-tailwindcss/api/defaults";
import jestDom from "eslint-plugin-jest-dom";
import reactHooks from "eslint-plugin-react-hooks";
import testingLibrary from "eslint-plugin-testing-library";
import { defineConfig } from "eslint/config";
import { configs as tsEslint } from "typescript-eslint";

export default defineConfig(
	{
		ignores: [".vscode/*", "dist/*", "reports/*"],
		linterOptions: { reportUnusedDisableDirectives: true },
	},

	{
		files: ["src/**/*.?(m|c)[tj]s?(x)"],
		extends: [tsEslint.base, reactHooks.configs.flat["recommended-latest"]],
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
			react: {
				version: "detect",
			},
		},
		plugins: { "better-tailwindcss": tailwindcss },
		rules: {
			...tailwindcss.configs["recommended"]?.rules,
			"better-tailwindcss/enforce-consistent-line-wrapping": "off",
			"better-tailwindcss/enforce-shorthand-classes": "warn",
			"better-tailwindcss/no-conflicting-classes": "error",
		},
	},

	{
		files: ["src/**/*.test.?(m|c)[tj]s?(x)"],
		extends: [
			testingLibrary.configs["flat/react"],
			jestDom.configs["flat/recommended"],
		],
	},
);
