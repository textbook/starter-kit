import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import cyfConfig from "@codeyourfuture/eslint-config-standard";
import vitestPlugin from "@vitest/eslint-plugin";
import { globalIgnores } from "eslint/config";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jestDomPlugin from "eslint-plugin-jest-dom";
import { jsdoc } from "eslint-plugin-jsdoc";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import nodePlugin from "eslint-plugin-n";
import playwrightPlugin from "eslint-plugin-playwright";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import globals from "globals";

const __dirname = dirname(fileURLToPath(import.meta.url));

const {
	engines: { node: nodeVersion },
} = JSON.parse(
	await readFile(resolve(__dirname, "..", "package.json"), "utf-8"),
);

/** @type {import("eslint").Linter.Config[]} */
export default [
	...cyfConfig.configs.standard,
	prettierConfig,
	jsdoc({
		config: "flat/recommended-typescript-flavor-error",
		rules: {
			"jsdoc/check-param-names": [
				"error",
				{ allowExtraTrailingParamDocs: true },
			],
			"jsdoc/check-syntax": "error",
			"jsdoc/reject-any-type": "off",
			"jsdoc/require-jsdoc": "off",
			"jsdoc/require-param-description": "off",
			"jsdoc/require-property-description": "off",
			"jsdoc/require-returns-description": "off",
			"jsdoc/tag-lines": "off",
		},
	}),
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
		files: [
			"api/**",
			"bin/**",
			"e2e/**",
			"linting/**",
			"**/vite.config.js",
			"eslint.config.js",
		],
		...nodePlugin.configs["flat/recommended"],
		rules: {
			...nodePlugin.configs["flat/recommended"].rules,
			// pending fix for eslint-community/eslint-plugin-n#209
			"n/no-extraneous-import": "off",
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
	},
	{
		files: ["linting/**", "**/vite.config.js"],
		rules: {
			"n/no-unpublished-import": "off",
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
		plugins: { "jest-dom": jestDomPlugin },
		rules: jestDomPlugin.configs.recommended.rules,
	},
	globalIgnores(["api/static", "e2e/playwright-report", "e2e/test-results"]),
];
