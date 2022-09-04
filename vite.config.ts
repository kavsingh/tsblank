/// <reference types="vitest" />

import path from "path";

import { defineConfig } from "vite";
import checkerPlugin from "vite-plugin-checker";

export default defineConfig(({ mode }) => ({
	build: { sourcemap: true },
	plugins: [...(mode === "test" ? [] : [checker()])],
	resolve: { alias: { "~": path.resolve(__dirname, "./src") } },
	test: {
		include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}"],
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts"],
	},
}));

const checker = () =>
	checkerPlugin({
		overlay: { initialIsOpen: false },
		typescript: true,
		eslint: {
			lintCommand: 'eslint "./src/**/*.ts"',
			dev: { logLevel: ["error"] },
		},
	});
