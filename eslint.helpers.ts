import path from "node:path";
import { fileURLToPath } from "node:url";

import ts from "typescript";

import type { Linter } from "eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const testFileSuffixes = ["test", "spec", "mock"];

export function testFilePatterns({
	root = "",
	extensions = "?([mc])[tj]s?(x)",
} = {}) {
	return [
		`*.{${testFileSuffixes.join(",")}}`,
		"__{test,tests,mocks,fixtures}__/**/*",
		"__{test,mock,fixture}-*__/**/*",
	].map((pattern) => path.join(root, `**/${pattern}.${extensions}`));
}

type TsConfig = {
	compilerOptions?:
		| { paths?: Record<string, string[]> | undefined }
		| undefined;
};

export function readTsConfig(configPath: string): TsConfig | undefined {
	const dir = path.isAbsolute(configPath)
		? path.dirname(configPath)
		: __dirname;

	const file = path.isAbsolute(configPath)
		? path.basename(configPath)
		: configPath;

	const contents = ts.findConfigFile(dir, ts.sys.fileExists.bind(ts.sys), file);

	const config: unknown = contents
		? ts.readConfigFile(contents, ts.sys.readFile.bind(ts.sys)).config
		: undefined;

	return config && typeof config === "object" ? config : undefined;
}

type ImportOrderConfigCustomizer = (
	ruleConfig: Record<string, unknown>,
	tsconfig: TsConfig | undefined,
) => Record<string, unknown>;

export function getImportOrderConfig(
	tsConfigPath: string,
	customizer: ImportOrderConfigCustomizer = (ruleConfig) => ruleConfig,
): [Linter.RuleLevel, Record<string, unknown>] {
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
