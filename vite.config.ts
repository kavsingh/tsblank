import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";

export default defineConfig(({ mode }) => {
	return {
		resolve: { tsconfigPaths: true },
		plugins: [
			tailwindcss(),
			react(),
			babel({ presets: [reactCompilerPreset()] }),
			mode === "development"
				? checker({ oxlint: true, overlay: { initialIsOpen: false } })
				: undefined,
		],
	};
});
