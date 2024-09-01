import path from "node:path";
import { fileURLToPath } from "node:url";

import ts from "typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const testFileSuffixes = ["test", "spec", "mock"];

export function testFilePatterns({
	root = "",
	extensions = "{ts,mts,cts,js,mjs,cjs}",
} = {}) {
	return [
		`*.{${testFileSuffixes.join(",")}}`,
		"__{test,tests,mocks,fixtures}__/**/*",
		"__{test,mock,fixture}-*__/**/*",
	].map((pattern) => path.join(root, `**/${pattern}.${extensions}`));
}

/**
 * @typedef {Object} TsConfigCompilerOptions
 * @property {Record<string, string[]> | undefined} [paths]
 *
 * @typedef {Object} TsConfig
 * @property {TsConfigCompilerOptions | undefined} [compilerOptions]
 */

/**
 * @param {string} configPath
 *
 * @returns {TsConfig | undefined}
 */
export function readTsConfig(configPath) {
	const dir = path.isAbsolute(configPath)
		? path.dirname(configPath)
		: __dirname;

	const file = path.isAbsolute(configPath)
		? path.basename(configPath)
		: configPath;

	const contents = ts.findConfigFile(dir, ts.sys.fileExists.bind(ts.sys), file);

	/** @type {unknown | undefined} */
	const config = contents
		? ts.readConfigFile(contents, ts.sys.readFile.bind(ts.sys)).config
		: undefined;

	if (!(config && typeof config === "object")) return undefined;

	return config;
}

/**
 * @typedef {import("eslint").Linter.RuleLevel} RuleLevel
 *
 * @param {string} tsConfigPath
 * @param {(ruleConfig: Record<string, unknown>, tsconfig: TsConfig | undefined) => Record<string, unknown>} customizer
 *
 * @returns {[RuleLevel, Record<string, unknown>]}
 */
export function getImportOrderConfig(
	tsConfigPath,
	customizer = (ruleConfig) => ruleConfig,
) {
	const tsConfig = readTsConfig(tsConfigPath);
	const aliases = Object.keys(tsConfig?.compilerOptions?.paths ?? {});

	return [
		"warn",
		customizer(
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
				"pathGroups": aliases.map((pattern) => {
					return { pattern, group: "internal" };
				}),
				"pathGroupsExcludedImportTypes": ["type"],
				"newlines-between": "always",
			},
			tsConfig,
		),
	];
}
