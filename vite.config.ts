import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
	build: { sourcemap: true },
	plugins: [tsconfigPaths(), tailwindcss(), createChecker(mode)],
}));

function createChecker(mode: string) {
	if (mode !== "development") return undefined;

	return checker({
		overlay: { initialIsOpen: false },
		typescript: true,
		eslint: {
			useFlatConfig: true,
			lintCommand: 'eslint "./src"',
			dev: { logLevel: ["error"] },
		},
	});
}
