import containerQueriesPlugin from "@tailwindcss/container-queries";

import type { Config } from "tailwindcss";

export default {
	content: ["./index.html", "./src/**/*.{ts,js}"],
	plugins: [
		// @ts-expect-error exactOptionalProperties conflict
		containerQueriesPlugin,
	],
} satisfies Config;
