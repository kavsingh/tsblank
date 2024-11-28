import { defineConfig, mergeConfig } from "vitest/config";

import baseConfig from "./vite.config";

export default mergeConfig(
	baseConfig({ command: "build", mode: "production" }),
	defineConfig({
		test: {
			include: ["src/**/*.{test,spec}.?(m|c)[tj]s?(x)"],
			environment: "jsdom",
			setupFiles: ["./vitest.setup.ts"],
			clearMocks: true,
		},
	}),
);
