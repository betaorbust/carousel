import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'\\.(css|less)$': 'identity-obj-proxy',
	},
};

// Sometimes it's like that
// eslint-disable-next-line import/no-default-export
export default config;
