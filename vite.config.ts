import { defineConfig } from "vite";
import { checker as checkerPlugin } from "vite-plugin-checker";
import tsconfigPathsPlugin from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
	build: { sourcemap: true },
	plugins: [tsconfigPathsPlugin(), checker(mode)],
}));

function checker(mode: string) {
	if (mode !== "development") return undefined;

	return checkerPlugin({
		overlay: { initialIsOpen: false },
		typescript: true,
		eslint: {
			useFlatConfig: true,
			lintCommand: 'eslint "./src"',
			dev: { logLevel: ["error"] },
		},
	});
}
