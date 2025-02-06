/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
	quoteProps: "consistent",
	useTabs: true,
	plugins: ["prettier-plugin-tailwindcss"],
	tailwindStylesheet: "./src/index.css",
	tailwindFunctions: ["twMerge", "twJoin"],
};
