/// <reference types="vitest" />

import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import checkerPlugin from "vite-plugin-checker";
import tsconfigPathsPlugin from "vite-tsconfig-paths";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ mode }) => ({
	build: { sourcemap: true },
	plugins: [
		tsconfigPathsPlugin({
			projects: [path.resolve(__dirname, "src/tsconfig.json")],
		}),
		checker(mode),
	],
	test: {
		include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}"],
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts"],
		clearMocks: true,
	},
}));

function checker(mode: string) {
	if (mode !== "development") return undefined;

	return checkerPlugin({
		overlay: { initialIsOpen: false },
		typescript: true,
		eslint: {
			lintCommand: 'eslint "./src/**/*.ts"',
			dev: { logLevel: ["error"] },
		},
	});
}
