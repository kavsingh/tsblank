import solid from "@solidjs/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";

export default defineConfig(({ mode }) => {
	return {
		resolve: { tsconfigPaths: true },
		oxc: { jsx: { importSource: "solid-js" } },
		plugins: [
			tailwindcss(),
			solid({ start: false }),
			mode === "development"
				? checker({ oxlint: true, overlay: { initialIsOpen: false } })
				: undefined,
		],
	};
});
