/** @type { import("eslint").Linter.Config } */
module.exports = {
	env: { browser: true, es2017: true, node: true },
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:svelte/recommended", "prettier"],
	overrides: [
		{ files: ["*.svelte"], parser: "svelte-eslint-parser", parserOptions: { parser: "@typescript-eslint/parser" } },
	],
	parser: "@typescript-eslint/parser",
	parserOptions: { ecmaVersion: 2020, extraFileExtensions: [".svelte"], sourceType: "module" },
	plugins: ["@typescript-eslint"],
	root: true,
	rules: {
		"@typescript-eslint/ban-ts-comment": "warn",
		"@typescript-eslint/no-explicit-any": "warn",
		"@typescript-eslint/no-unused-vars": "warn",
		"no-unused-vars": "warn",
		"sort-imports": ["warn", { ignoreCase: true }],
		"sort-keys": ["warn", "asc", { caseSensitive: false, natural: true }],
		"sort-vars": "warn",
	},
}
