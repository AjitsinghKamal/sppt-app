module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^.+\\.(css|scss|png|jpg|svg)$': 'identity-obj-proxy',
		'env-defaults': '<rootDir>/__mocks__/env.ts',
		'\\.svg$': '<rootDir>/__mocks__/svgr.ts',
	},
	setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
	resetMocks: true,
};
