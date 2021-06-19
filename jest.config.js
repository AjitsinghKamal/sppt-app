module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^.+\\.(css|scss|png|jpg|svg)$': 'identity-obj-proxy',
		'env-defaults': '<rootDir>/__mocks__/env.ts',
	},
	setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
	resetMocks: true,
};
