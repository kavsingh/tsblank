import containerQueriesPlugin from "@tailwindcss/container-queries";

import type { Config } from "tailwindcss";

export default {
	content: ["./index.html", "./src/**/*.?([mc])[tj]s?(x)"],
	plugins: [
		// @ts-expect-error exactOptionalProperties conflict
		containerQueriesPlugin,
	],
} satisfies Config;
