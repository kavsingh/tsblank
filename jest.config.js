module.exports = {
  verbose: true,
  testRegex: '^.+\\.test\\.[jt]sx?$',
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/node_modules/babel-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1',
  },
  coverageReporters: ['lcov'],
  coveragePathIgnorePatterns: ['/node_modules/'],
};
