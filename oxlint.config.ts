import { defineConfig } from "oxlint";

import type { OxlintConfig } from "oxlint";

export default defineConfig({
	ignorePatterns: [".vscode/*", "**/dist/*", "**/reports/*"],
	plugins: ["oxc", "eslint", "import", "unicorn", "promise"],
	categories: {
		correctness: "error",
		suspicious: "error",
		pedantic: "error",
		restriction: "error",
		perf: "error",
		style: "error",
		nursery: "error",
	},
	env: { node: true },
	rules: {
		"eslint/arrow-body-style": "off",
		"eslint/capitalized-comments": "off",
		"eslint/curly": ["error", "multi-line", "consistent"],
		"eslint/eqeqeq": "error",
		"eslint/id-length": "off",
		"eslint/func-style": [
			"error",
			"declaration",
			{ allowTypeAnnotation: true },
		],
		"eslint/max-classes-per-file": "off",
		"eslint/max-lines-per-function": [
			"error",
			{ skipBlankLines: true, skipComments: true },
		],
		"eslint/new-cap": "off",
		"eslint/no-console": "off",
		"eslint/no-continue": "off",
		"eslint/no-duplicate-imports": [
			"error",
			{ allowSeparateTypeImports: true },
		],
		"eslint/no-implicit-coercion": ["error", { allow: ["!!"] }],
		"eslint/no-inline-comments": ["error", { ignorePattern: "@type" }],
		"eslint/no-magic-numbers": "off",
		"eslint/no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
		"eslint/no-ternary": "off",
		"eslint/no-undefined": "off",
		"eslint/no-unused-vars": [
			"error",
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
		"eslint/no-void": ["error", { allowAsStatement: true }],
		"eslint/no-warning-comments": ["error", { terms: ["fixme", "revert"] }],
		"eslint/prefer-destructuring": "off",
		"eslint/sort-imports": "off",
		"eslint/sort-keys": "off",
		"import/group-exports": "off",
		"import/exports-last": "off",
		"import/extensions": "off",
		"import/max-dependencies": "off",
		"import/no-default-export": "error",
		"import/no-named-export": "off",
		"import/no-unassigned-import": ["error", { allow: ["**/*.css"] }],
		"import/prefer-default-export": "off",
		"oxc/no-async-await": "off",
		"oxc/no-optional-chaining": "off",
		"oxc/no-rest-spread-properties": "off",
		"unicorn/catch-error-name": ["error", { name: "cause" }],
		"unicorn/no-array-reduce": "off",
		"unicorn/no-useless-undefined": "off",
	},
	overrides: [
		{
			files: ["**/typings/*.d.ts"],
			rules: {
				"import/unambiguous": "off",
			},
		},

		{
			files: ["*.config.{js,ts}"],
			rules: {
				"import/no-default-export": "off",
				"import/no-anonymous-default-export": "off",
			},
		},

		{
			files: ["**/*.{ts,tsx}"],
			plugins: ["typescript"],
			rules: {
				"typescript/consistent-type-imports": [
					"error",
					{
						fixStyle: "separate-type-imports",
						prefer: "type-imports",
					},
				],
				"typescript/explicit-function-return-type": "off",
				"typescript/no-non-null-assertion": "error",
				"typescript/promise-function-async": "off",
				"typescript/restrict-template-expressions": [
					"error",
					{ allowNumber: true },
				],
				"typescript/strict-boolean-expressions": "off",
				"typescript/switch-exhaustiveness-check": [
					"error",
					{
						allowDefaultCaseForExhaustiveSwitch: true,
						considerDefaultExhaustiveForUnions: true,
						requireDefaultForNonUnion: true,
					},
				],
			},
		},

		{
			files: ["src/**"],
			env: { browser: true, node: false },
		},

		{
			files: [
				"**/vitest.*.setup.ts",
				"**/*.test.*",
				"**/*.test-*.*",
				"**/*__{mock,mocks,test,test-*,tests,fixtures}__/**/*",
			],
			plugins: ["eslint", "import", "promise", "typescript"],
			env: { browser: true, node: true },
			rules: {
				"eslint/max-lines": "off",
				"eslint/max-lines-per-function": "off",
				"eslint/max-statements": "off",
				"eslint/no-new": "off",
				"eslint/no-console": "off",
				"eslint/no-constructor-return": "off",
				"eslint/no-promise-executor-return": "off",
				"import/no-namespace": "off",
				"promise/catch-or-return": "off",
				"promise/prefer-await-to-callbacks": "off",
				"promise/prefer-await-to-then": "off",
				"typescript/ban-types": "off",
				"typescript/consistent-type-assertions": "off",
				"typescript/no-explicit-any": "off",
				"typescript/no-non-null-assertion": "off",
				"typescript/no-unsafe-argument": "off",
				"typescript/no-unsafe-assignment": "off",
				"typescript/no-unsafe-call": "off",
				"typescript/no-unsafe-function-type": "off",
				"typescript/no-unsafe-member-access": "off",
				"typescript/no-unsafe-return": "off",
				"typescript/no-unsafe-type-assertion": "off",
				"typescript/unbound-method": "off",
			},
		},

		{
			files: ["src/**/*.test.*"],
			env: { browser: true, node: true },
			plugins: ["vitest"],
			rules: {
				"vitest/no-disabled-tests": "error",
				"vitest/no-focused-tests": "error",
				"vitest/no-hooks": "off",
				"vitest/prefer-expect-assertions": "off",
				"vitest/prefer-to-be-falsy": "off",
				"vitest/prefer-to-be-truthy": "off",
				"vitest/require-mock-type-parameters": "off",
			},
		},
	],
	settings: {
		vitest: {
			typecheck: true,
		},
	},
} satisfies OxlintConfig);
