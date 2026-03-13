import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";

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
		plugins: [tailwindcss(), createChecker(mode)],
	};
});
