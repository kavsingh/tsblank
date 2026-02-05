import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";
import solid from "vite-plugin-solid";

export default defineConfig(({ mode }) => {
	return {
		resolve: { tsconfigPaths: true },
		oxc: { jsx: { importSource: "solid-js" } },
		plugins: [
			tailwindcss(),
			solid(),
			mode === "development"
				? checker({ oxlint: true, overlay: { initialIsOpen: false } })
				: undefined,
		],
	};
});
