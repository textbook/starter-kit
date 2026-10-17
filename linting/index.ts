import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import cyfConfig from "@codeyourfuture/eslint-config-standard";
import vitestPlugin from "@vitest/eslint-plugin";
import type { ESLint } from "eslint";
import { defineConfig, globalIgnores } from "eslint/config";
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
import testingLibraryPlugin from "eslint-plugin-testing-library";
import globals from "globals";
import typescript from "typescript-eslint";

const {
	engines: { node: nodeVersion },
} = JSON.parse(
	await readFile(resolve(import.meta.dirname, "..", "package.json"), "utf-8"),
) as { engines: { node: string } };

export default defineConfig(
	cyfConfig.configs.standard,
	prettierConfig,
	typescript.configs.strict,
	typescript.configs.stylistic,
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
			"**/vite.config.[jt]s",
			"eslint.config.ts",
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
					message: "process.env should only be accessed in utils/config.ts",
				},
			],
		},
		ignores: ["api/utils/config.ts", "api/vite.config.ts"],
	},
	{
		files: ["api/migrations/template.js"],
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "pgm" },
			],
			"@typescript-eslint/no-empty-function": "off",
		},
	},
	{
		files: ["bin/**"],
		rules: {
			"n/hashbang": "off",
		},
		settings: {
			node: {
				version: "^24",
			},
		},
	},
	{
		files: ["api/**/*.test.[jt]s", "**/setupTests.ts"],
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
		files: ["linting/**", "**/vite.config.[jt]s"],
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
			"react-hooks": reactHooksPlugin as ESLint.Plugin,
			"react-refresh": reactRefreshPlugin,
		},
		rules: {
			...jsxA11yPlugin.flatConfigs.recommended.rules,
			...reactPlugin.configs.flat.recommended.rules,
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
		files: [
			"web/**/*.test.[jt]s?(x)",
			"web/src/setupTests.js",
			"web/**/__mocks__/*",
		],
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
		files: ["**/*.ts?(x)"],
		extends: [
			typescript.configs.strictTypeCheckedOnly,
			typescript.configs.stylisticTypeCheckedOnly,
		],
		languageOptions: {
			parserOptions: {
				projectService: true,
			},
		},
		rules: {
			"@typescript-eslint/non-nullable-type-assertion-style": "off",
			"jsdoc/require-param": "off",
			"jsdoc/require-returns": "off",
		},
	},
	globalIgnores(["api/static", "e2e/playwright-report", "e2e/test-results"]),
);
