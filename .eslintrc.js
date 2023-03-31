require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	root: true,
	// stop looking for config files in parent directories
	extends: [
		'@betaorbust/eslint-config/profiles/web-app',
		'plugin:storybook/recommended',
	],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.eslint.json'],
	},
	rules: {
		'import/prefer-default-export': 'off',
		'react/no-unknown-property': [
			'error',
			{
				ignore: ['css'],
			},
		],
		'react/function-component-definition': [
			'error',
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],
		'react/no-unescaped-entities': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/prop-types': 'off',
	},
	overrides: [
		{
			files: [
				'*.test.ts',
				'*.test.tsx',
				'.eslintrc.js',
				'**/*.stories.tsx',
			],
			rules: {
				'import/no-extraneous-dependencies': [
					'error',
					{
						devDependencies: [
							'**/*.test.ts',
							'**/*.test.tsx',
							'.eslintrc.js',
							'**/*.stories.tsx',
						],
					},
				],
			},
		},
	],
};
