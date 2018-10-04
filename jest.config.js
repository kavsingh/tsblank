module.exports = {
  verbose: true,
  testRegex: '^.+\\.test\\.[jt]sx?$',
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/node_modules/babel-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageReporters: ['lcov'],
  coveragePathIgnorePatterns: ['/node_modules/'],
};
