module.exports = {
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.json',
		},
	},
	moduleFileExtensions: [
		'js',
		'json',
		'ts',
	],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	testMatch: [
		'**/src/**/*.test.ts',
	],
	testEnvironment: 'node',
	preset: 'ts-jest',
}
