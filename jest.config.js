module.exports = {
  transform: { '^.+\\.ts$': 'ts-jest' },
  moduleNameMapper: { '^src/(.*)': '<rootDir>/src/$1' },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup-after-env.ts'],
};
