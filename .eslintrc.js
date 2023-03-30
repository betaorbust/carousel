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
	},
	rules: {
		'import/prefer-default-export': 'off',
		'no-console': 'off',
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
	},
	overrides: [
		{
			files: [
				'*.test.ts',
				'*.test.tsx',
				'.eslintrc.js',
				'**/*.story.tsx',
			],
			rules: {
				'import/no-extraneous-dependencies': [
					'error',
					{
						devDependencies: [
							'**/*.test.ts',
							'**/*.test.tsx',
							'.eslintrc.js',
							'**/*.story.tsx',
						],
					},
				],
			},
		},
	],
};
