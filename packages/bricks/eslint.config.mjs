import { fixupConfigRules } from '@eslint/compat';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	{
		ignores: ['**/dist', '**/.eslintrc.cjs', '**/types'],
	},
	...fixupConfigRules(
		compat.extends(
			'eslint:recommended',
			'plugin:@typescript-eslint/recommended',
			'plugin:react-hooks/recommended',
			'plugin:storybook/recommended',
			'plugin:prettier/recommended'
		)
	),
	{
		plugins: {
			'react-refresh': reactRefresh,
			'unused-imports': unusedImports,
		},

		languageOptions: {
			globals: {
				...globals.browser,
			},

			parser: tsParser,
		},

		rules: {
			'react-refresh/only-export-components': [
				'warn',
				{
					allowConstantExport: true,
				},
			],

			'no-unused-vars': 'off',
			'unused-imports/no-unused-imports': 'error',

			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],
		},
	},
];
