module.exports = {
  preset: 'solid-jest/preset/browser',
  moduleNameMapper: { '^~/(.*)': '<rootDir>/src/$1' },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
