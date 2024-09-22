import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
	return {
		build:
			mode === "production"
				? // inspect built code
					{ sourcemap: true, minify: false }
				: { sourcemap: false, minify: false },
		plugins: [
			tsconfigPaths(),
			tailwindcss(),
			react({ babel: { plugins: [["babel-plugin-react-compiler", {}]] } }),
			createChecker(mode),
		],
	};
});

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
