import containerQueriesPlugin from "@tailwindcss/container-queries";

import type { Config } from "tailwindcss";

export default {
	content: ["./index.html", "./src/**/*.{ts,js}"],
	theme: {
		extend: {},
	},
	plugins: [
		// @ts-expect-error exactOptionalProperties conflict
		containerQueriesPlugin,
	],
} satisfies Config;
