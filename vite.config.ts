import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "rolldown-vite";
import { checker } from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
	return { plugins: [tsconfigPaths(), tailwindcss(), createChecker(mode)] };
});

function createChecker(mode: string) {
	if (mode !== "development") return undefined;

	return checker({
		overlay: { initialIsOpen: false },
		typescript: true,
	});
}
