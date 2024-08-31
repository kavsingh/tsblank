import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import filenamesPlugin from "@kavsingh/eslint-plugin-filenames";
import deprecationPlugin from "eslint-plugin-deprecation";
import importPlugin from "eslint-plugin-import-x";
// @ts-expect-error no types available
import jestDomPlugin from "eslint-plugin-jest-dom";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
// @ts-expect-error no types available
import tailwindPlugin from "eslint-plugin-tailwindcss";
// @ts-expect-error no types available
import testingPlugin from "eslint-plugin-testing-library";
import vitestPlugin from "eslint-plugin-vitest";
import globals from "globals";
import tsEslint from "typescript-eslint";

import {
	testFilePatterns,
	testFileSuffixes,
	getImportOrderConfig,
} from "./eslint.helpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseTsConfig = path.resolve(__dirname, "tsconfig.json");
const webTsConfig = path.resolve(__dirname, "src", "tsconfig.json");

export default tsEslint.config(
	{ ignores: [".vscode/*", "dist/*", "coverage/*"] },
	{
		linterOptions: { reportUnusedDisableDirectives: true },
		languageOptions: {
			globals: { ...globals.node },
			parserOptions: { project: baseTsConfig },
		},
	},
	js.configs.recommended,
	...tsEslint.configs.strictTypeChecked,
	...tsEslint.configs.stylisticTypeChecked,
	filenamesPlugin.configs.kebab,
	{
		plugins: {
			"import-x": importPlugin,
			// @ts-expect-error upstream types
			"deprecation": fixupPluginRules(deprecationPlugin),
		},
		settings: {
			"import-x/resolver": {
				"eslint-import-resolver-typescript": { project: baseTsConfig },
			},
		},
		rules: {
			...importPlugin.configs.recommended.rules,
			...importPlugin.configs.typescript.rules,
			"camelcase": "off",
			"curly": ["warn", "multi-line", "consistent"],
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
			"import-x/order": getImportOrderConfig(baseTsConfig),
			"deprecation/deprecation": "warn",
		},
	},
	{
		files: ["*.c[jt]s"],
		languageOptions: { parserOptions: { sourceType: "script" } },
		rules: { "@typescript-eslint/no-var-requires": "off" },
	},
	{
		files: ["*.?(c)js"],
		extends: [tsEslint.configs.disableTypeChecked],
		rules: { "deprecation/deprecation": "off" },
	},
	{
		files: ["./*"],
		rules: {
			"filenames/match-exported": "off",
		},
	},
	{
		files: ["src/**/*"],
		languageOptions: {
			globals: { ...globals.browser },
			parserOptions: { project: webTsConfig },
		},
		settings: {
			"import-x/resolver": {
				"eslint-import-resolver-typescript": { project: webTsConfig },
			},
			"tailwindcss": { callees: ["twMerge", "twJoin"] },
		},
		extends: [...tailwindPlugin.configs["flat/recommended"]],
		rules: {
			"no-console": "error",
			"import-x/order": getImportOrderConfig(webTsConfig),
		},
	},
	{
		files: testFilePatterns(),
		languageOptions: { globals: { ...globals.node } },
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
		languageOptions: { globals: { ...globals.node, ...globals.browser } },
		extends: [
			vitestPlugin.configs.all,
			testingPlugin.configs.recommended,
			jestDomPlugin.configs["flat/recommended"],
		],
		rules: {
			"vitest/no-hooks": "off",
		},
	},
	eslintPluginPrettierRecommended,
);
