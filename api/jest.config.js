module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/src/**/*.test.(ts|js)'],
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
}

// this is a comment to test the git commit hook