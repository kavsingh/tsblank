import path from "node:path";

import tailwindcss from "eslint-plugin-better-tailwindcss";
import { getDefaultSelectors } from "eslint-plugin-better-tailwindcss/defaults";
import {
	SelectorKind,
	MatcherType,
} from "eslint-plugin-better-tailwindcss/types";
import jestDom from "eslint-plugin-jest-dom";
import testingLibrary from "eslint-plugin-testing-library";
import { defineConfig } from "eslint/config";
import { configs as tsEslint } from "typescript-eslint";

export default defineConfig(
	{ ignores: [".vscode/*", ".zed/*", "dist/*", "reports/*"] },

	{ linterOptions: { reportUnusedDisableDirectives: true } },

	{
		files: ["src/**/*.{ts,tsx}"],
		extends: [tsEslint.base, tailwindcss.configs["recommended-error"]],
		settings: {
			"better-tailwindcss": {
				entryPoint: path.join(import.meta.dirname, "./src/index.css"),
				selectors: [
					...getDefaultSelectors(),
					...["^classNames$", "^.+ClassName$", "^.+ClassNames$"].map(
						(name) => ({
							name,
							kind: SelectorKind.Attribute,
							match: [
								{ type: MatcherType.String },
								{ type: MatcherType.ObjectValue },
							],
						}),
					),
					{
						name: "^.+ClassName$",
						kind: SelectorKind.Variable,
						match: [{ type: MatcherType.String }],
					},
					{
						name: "^.+ClassNames$",
						kind: SelectorKind.Variable,
						match: [
							{ type: MatcherType.String },
							{ type: MatcherType.ObjectValue },
						],
					},
				],
			},
		},
		rules: {
			"better-tailwindcss/enforce-consistent-line-wrapping": "off",
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
