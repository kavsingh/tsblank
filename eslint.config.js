import path from "node:path";
import { fileURLToPath } from "node:url";

import js from "@eslint/js";
import filenames from "@kavsingh/eslint-plugin-filenames";
import importX from "eslint-plugin-import-x";
import jestDom from "eslint-plugin-jest-dom";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import tailwind from "eslint-plugin-tailwindcss";
import testingLibrary from "eslint-plugin-testing-library";
import vitest from "eslint-plugin-vitest";
import globals from "globals";
import * as tsEslint from "typescript-eslint";

import { testFilePatterns, testFileSuffixes } from "./eslint.helpers.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default tsEslint.config(
	{
		ignores: [".vscode/*", "dist/*", "coverage/*"],
	},

	{
		linterOptions: { reportUnusedDisableDirectives: true },
		languageOptions: {
			globals: { ...globals.node },
			parserOptions: { projectService: true },
		},
	},

	js.configs.recommended,
	...tsEslint.configs.strictTypeChecked,
	...tsEslint.configs.stylisticTypeChecked,
	importX.flatConfigs.recommended,
	importX.flatConfigs.typescript,
	filenames.configs.kebab,

	{
		rules: {
			"camelcase": "off",
			"no-console": "off",
			"no-restricted-syntax": [
				"warn",
				{ selector: "TSEnumDeclaration", message: "Avoid using enums" },
			],
			"no-unreachable": "error",
			"@typescript-eslint/consistent-type-definitions": ["warn", "type"],
			"@typescript-eslint/consistent-type-imports": "error",
			"@typescript-eslint/member-ordering": ["warn"],
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{ allowNumber: true },
			],
			"no-shadow": "off",
			"@typescript-eslint/no-shadow": [
				"error",
				{
					ignoreTypeValueShadow: false,
					ignoreFunctionTypeParameterNameValueShadow: true,
				},
			],
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					args: "all",
					argsIgnorePattern: "^_",
					caughtErrors: "all",
					caughtErrorsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					ignoreRestSiblings: true,
				},
			],
			"import-x/consistent-type-specifier-style": ["error", "prefer-top-level"],
			"import-x/no-cycle": "error",
			"import-x/no-self-import": "error",
			"import-x/no-unused-modules": "error",
			"import-x/no-useless-path-segments": "error",
			"import-x/order": [
				"warn",
				{
					"alphabetize": { order: "asc" },
					"groups": [
						"builtin",
						"external",
						"internal",
						"parent",
						["sibling", "index"],
						"type",
					],
					"pathGroupsExcludedImportTypes": ["type"],
					"newlines-between": "always",
				},
			],
		},
	},

	{
		files: ["**/*.c[tj]s?(x)"],
		languageOptions: {
			sourceType: "commonjs",
			parserOptions: { sourceType: "commonjs" },
		},
		rules: {
			"@typescript-eslint/no-require-imports": "off",
			"@typescript-eslint/no-var-requires": "off",
		},
	},

	{
		files: ["*.?(m|c)[tj]s?(x)"],
		rules: {
			"filenames/match-exported": "off",
		},
	},

	{
		files: ["src/**/*.?(m|c)[tj]s?(x)"],
		languageOptions: {
			globals: { ...globals.browser },
		},
		settings: {
			"import-x/resolver": {
				"eslint-import-resolver-typescript": {
					project: path.resolve(dirname, "src", "tsconfig.json"),
				},
			},
			"tailwindcss": { callees: ["twMerge", "twJoin"] },
		},
		extends: [...tailwind.configs["flat/recommended"]],
		rules: {
			"no-console": "error",
		},
	},

	{
		files: testFilePatterns(),
		languageOptions: {
			globals: { ...globals.node },
		},
		rules: {
			"no-console": "off",
			"filenames/match-exported": [
				"error",
				{
					transforms: ["kebab"],
					remove: `\\.(${testFileSuffixes.join("|")})$`,
				},
			],
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-return": "off",
			"@typescript-eslint/unbound-method": "off",
		},
	},

	{
		files: testFilePatterns({ root: "src" }),
		languageOptions: {
			globals: { ...globals.node, ...globals.browser },
		},
		extends: [
			vitest.configs.all,
			testingLibrary.configs["flat/dom"],
			jestDom.configs["flat/recommended"],
		],
		rules: {
			"vitest/no-hooks": "off",
		},
	},

	prettierRecommended,

	{
		rules: {
			"curly": ["warn", "multi-line", "consistent"],
			"prettier/prettier": "warn",
		},
	},
);
