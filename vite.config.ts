import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "rolldown-vite";
import { checker } from "vite-plugin-checker";
import { viteSingleFile } from "vite-plugin-singlefile";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
	return {
		build:
			mode === "production"
				? { sourcemap: false, minify: "oxc" }
				: { sourcemap: "inline", minify: false },
		plugins: [
			tsconfigPaths(),
			tailwindcss(),
			react({ babel: { plugins: [["babel-plugin-react-compiler", {}]] } }),
			createChecker(mode),
			mode === "production" && viteSingleFile(),
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
