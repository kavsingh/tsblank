module.exports = {
  preset: 'vite-jest',
  moduleNameMapper: { '^~/(.*)': '<rootDir>/src/$1' },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup-after-env.ts'],
};
