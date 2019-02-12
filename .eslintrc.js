module.exports = {
  parser: '@typescript-eslint/parser',
  env: { es6: true, node: true, browser: false },
  plugins: ['@typescript-eslint', 'jest', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:jest/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'no-console': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'prettier/prettier': 'warn',
  },
  overrides: [
    {
      files: ['**/*.test.*'],
      env: { node: true, 'jest/globals': true },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'jest/no-disabled-tests': 'error',
        'jest/no-focused-tests': 'error',
      },
    },
    {
      files: ['src/**'],
      env: { node: false, browser: true },
      rules: {
        'no-console': 'error',
      },
    },
  ],
};
