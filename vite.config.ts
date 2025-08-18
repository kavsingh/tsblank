import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";
import { viteSingleFile } from "vite-plugin-singlefile";

function createChecker(mode: string) {
	if (mode !== "development") return undefined;

	return checker({
		overlay: { initialIsOpen: false },
		oxlint: { lintCommand: "oxlint --type-aware --type-check" },
	});
}

export default defineConfig(({ mode }) => {
	return {
		resolve: { tsconfigPaths: true },
		plugins: [
			tailwindcss(),
			react(),
			// @ts-expect-error upstream types
			babel({ presets: [reactCompilerPreset()] }),
			createChecker(mode),
			mode === "production" && viteSingleFile(),
		],
	};
});
