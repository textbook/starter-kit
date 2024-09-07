import cyfConfig from "@codeyourfuture/eslint-config-standard";
import vitestPlugin from "@vitest/eslint-plugin";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jestPlugin from "eslint-plugin-jest";
import jestDomPlugin from "eslint-plugin-jest-dom";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import nodePlugin from "eslint-plugin-n";
import playwrightPlugin from "eslint-plugin-playwright";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import globals from "globals";

/** @type {import("eslint").Linter.FlatConfig} */
export default [
	cyfConfig,
	prettierConfig,
	{
		plugins: {
			import: importPlugin,
		},
		rules: {
			"import/order": [
				"error",
				{ alphabetize: { order: "asc" }, "newlines-between": "always" },
			],
		},
	},
	{
		files: ["api/**", "e2e/**", "web/vite.config.js"],
		...nodePlugin.configs["flat/recommended"],
	},
	{
		files: ["api/**"],
		rules: {
			"no-console": "warn",
			"no-restricted-syntax": [
				"warn",
				{
					selector: "MemberExpression[object.name=process][property.name=env]",
					message: "process.env should only be accessed in utils/config.js",
				},
			],
		},
	},
	{
		files: ["**/*.cjs"],
		...nodePlugin.configs["flat/recommended-script"],
	},
	{
		files: ["api/migrations/template.cjs"],
		rules: {
			"no-unused-vars": ["error", { argsIgnorePattern: "pgm" }],
		},
	},
	{
		files: ["api/**/*.test.js", "api/setupTests.js"],
		...jestPlugin.configs["flat/recommended"],
		rules: {
			...jestPlugin.configs["flat/recommended"].rules,
			"jest/expect-expect": [
				"error",
				{ assertFunctionNames: ["expect", "request.**.expect"] },
			],
		},
	},
	{
		files: ["e2e/**"],
		...playwrightPlugin.configs["flat/recommended"],
	},
	{
		files: ["web/**/*.js?(x)"],
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			"jsx-a11y": jsxA11yPlugin,
			react: reactPlugin,
			"react-hooks": reactHooksPlugin,
			"react-refresh": reactRefreshPlugin,
		},
		rules: {
			...jsxA11yPlugin.flatConfigs.recommended.rules,
			...reactPlugin.configs.flat["recommended"].rules,
			...reactPlugin.configs.flat["jsx-runtime"].rules,
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true },
			],
		},
		settings: {
			react: { version: "detect" },
		},
	},
	{
		files: ["web/**/*.test.js?(x)", "web/src/setupTests.js"],
		languageOptions: {
			globals: vitestPlugin.environments.env.globals,
		},
		plugins: {
			"jest-dom": jestDomPlugin,
			"testing-library": testingLibraryPlugin,
			vitest: vitestPlugin,
		},
		rules: {
			...jestDomPlugin.configs.recommended.rules,
			...testingLibraryPlugin.configs.react.rules,
			...vitestPlugin.configs.recommended.rules,
		},
	},
	{
		ignores: ["api/static", "e2e/playwright-report", "e2e/test-results"],
	},
];
