import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";

export default defineConfig(({ mode }) => {
	return {
		resolve: { tsconfigPaths: true },
		plugins: [
			tailwindcss(),
			mode === "development"
				? checker({ oxlint: true, overlay: { initialIsOpen: false } })
				: undefined,
		],
	};
});
