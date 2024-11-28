import { defineConfig, mergeConfig } from "vitest/config";

import baseConfig from "./vite.config";

export default defineConfig(
	mergeConfig(baseConfig({ command: "build", mode: "production" }), {
		test: {
			include: ["src/**/*.{test,spec}.?(m|c)[tj]s?(x)"],
			environment: "jsdom",
			setupFiles: ["./vitest.setup.ts"],
			clearMocks: true,
		},
	}),
);
