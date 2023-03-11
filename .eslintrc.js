module.exports = {
	root: true, // stop looking for config files in parent directories
	extends: ['@betaorbust/eslint-config/profiles/web-app'],
	parserOptions: { tsconfigRootDir: __dirname },
	rules: {
		'import/prefer-default-export': 'off',
		// 'no-console': 'off',
		'react/no-unknown-property': ['error', { ignore: ['css'] }],
	},
};
