import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		ignores: [
			'node_modules',
			'dist'
		],
		rules: {
			quotes: [
				'error',
				'single'
			],
			indent: [
				'error',
				2
			],
			'comma-dangle': 'off',
			'space-before-function-paren': 'off',
			camelcase: 'off',
			'quote-props': [
				'error',
				'as-needed'
			],
			'no-useless-constructor': 'off',
			'no-dupe-class-members': 'off',
			'no-tabs': 'off',
			semi: [
				'error',
				'never'
			],
			'@typescript-eslint/no-var-requires': 'off'
		}
	}
)