const srcDependencies = {
  devDependencies: false,
  optionalDependencies: false,
  peerDependencies: false,
};

const devDependencies = {
  devDependencies: true,
  optionalDependencies: false,
  peerDependencies: false,
};

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: { es6: true, node: true, browser: false },
  settings: { 'import/resolver': 'babel-module' },
  plugins: ['filenames'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  rules: {
    'camelcase': 'off',
    'curly': ['warn', 'multi-line', 'consistent'],
    'no-console': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/consistent-type-imports': ['error'],
    '@typescript-eslint/no-shadow': [
      'error',
      {
        ignoreTypeValueShadow: false,
        ignoreFunctionTypeParameterNameValueShadow: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'filenames/match-regex': ['error', '^[a-z0-9-.]+$', true],
    'filenames/match-exported': ['error', 'kebab'],
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/no-unused-modules': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-extraneous-dependencies': ['error', devDependencies],
    'import/order': [
      'warn',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'type',
        ],
        'pathGroups': [{ pattern: '~/**', group: 'internal' }],
        'newlines-between': 'always',
      },
    ],
    'prettier/prettier': 'warn',
  },
  overrides: [
    {
      files: ['*.config.*'],
      rules: {
        'filenames/match-exported': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['src/**/*'],
      env: { node: false, browser: true },
      rules: {
        'no-console': 'error',
        'import/no-extraneous-dependencies': ['error', srcDependencies],
      },
    },
    {
      files: ['**/*.test.*'],
      env: { 'node': true, 'jest/globals': true },
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'import/no-extraneous-dependencies': ['error', devDependencies],
      },
    },
  ],
};
