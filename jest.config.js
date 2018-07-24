module.exports = {
  verbose: true,
  testRegex: '^.+\\.test\\.(tsx?|jsx?)$',
  transform: {
    '^.+\\.(tsx?|jsx?)$': 'babel-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageReporters: ['lcov'],
  coveragePathIgnorePatterns: ['/node_modules/'],
};
