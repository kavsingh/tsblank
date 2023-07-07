/** @type {import('prettier').Config} */
module.exports = {
	quoteProps: "consistent",
	trailingComma: "all", // TODO: remove when using prettier 3.0.0
	useTabs: true,
	plugins: [require("prettier-plugin-tailwindcss")],
};
