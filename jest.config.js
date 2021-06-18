module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^.+\\.(css|scss|png|jpg|svg)$': 'identity-obj-proxy'
	},
	setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
	resetMocks: true
};
