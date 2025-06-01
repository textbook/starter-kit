import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import cyfConfig from "@codeyourfuture/eslint-config-standard";
import vitestPlugin from "@vitest/eslint-plugin";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jestDomPlugin from "eslint-plugin-jest-dom";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import nodePlugin from "eslint-plugin-n";
import playwrightPlugin from "eslint-plugin-playwright";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import globals from "globals";

const {
	engines: { node: nodeVersion },
} = JSON.parse(
	await readFile(resolve(import.meta.dirname, "package.json"), "utf-8"),
);

/** @type {import("eslint").Linter.Config[]} */
export default [
	...cyfConfig.configs.standard,
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
		settings: {
			node: {
				version: nodeVersion,
			},
		},
	},
	{
		files: ["api/**", "e2e/**", "**/vite.config.js"],
		...nodePlugin.configs["flat/recommended"],
		rules: {
			...nodePlugin.configs["flat/recommended"].rules,
			// pending fix for eslint-community/eslint-plugin-n#209
			"n/no-extraneous-import": "off",
		},
	},
	{
		files: ["**/vite.config.js"],
		rules: {
			"n/no-unpublished-import": "off",
		},
	},
	{
		files: ["api/**"],
		rules: {
			"no-console": "warn",
		},
	},
	{
		files: ["api/**"],
		rules: {
			"no-restricted-syntax": [
				"warn",
				{
					selector: "MemberExpression[object.name=process][property.name=env]",
					message: "process.env should only be accessed in utils/config.js",
				},
			],
		},
		ignores: ["api/utils/config.js", "api/vite.config.js"],
	},
	{
		files: ["api/migrations/template.js"],
		rules: {
			"no-unused-vars": ["error", { argsIgnorePattern: "pgm" }],
		},
	},
	{
		files: ["**/*.test.js", "**/setupTests.js"],
		languageOptions: {
			globals: vitestPlugin.environments.env.globals,
		},
		plugins: {
			vitest: vitestPlugin,
		},
		rules: {
			...vitestPlugin.configs.recommended.rules,
			"vitest/expect-expect": [
				"error",
				{
					assertFunctionNames: ["expect", "request.**.expect"],
				},
			],
		},
	},
	{
		files: ["e2e/**"],
		...playwrightPlugin.configs["flat/recommended"],
		rules: {
			"playwright/no-standalone-expect": "off",
		},
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
		files: ["web/**/*.test.js?(x)", "**/setupTests.js", "**/__mocks__/*"],
		languageOptions: {
			globals: vitestPlugin.environments.env.globals,
		},
		plugins: {
			"jest-dom": jestDomPlugin,
			"testing-library": testingLibraryPlugin,
		},
		rules: {
			...jestDomPlugin.configs.recommended.rules,
			...testingLibraryPlugin.configs.react.rules,
		},
	},
	{
		ignores: ["api/static", "e2e/playwright-report", "e2e/test-results"],
	},
];
