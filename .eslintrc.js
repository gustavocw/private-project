const excludedFiles = [
  'node_modules/**/*',
  '**/node_modules/**/*',
  'public/**/*',
  'build/**/*',
  '**/*.test.ts',
  '**/*.test.tsx',
];

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'google',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  settings: {
    react: {
      version: '16.14',
    },
  },
  overrides: [{
    files: [
      './apps/**/*.{ts,tsx}',
      './libs/**/*.{ts,tsx}',
    ],
    excludedFiles: excludedFiles,
  }],
  ignorePatterns: excludedFiles,
  rules: {
    'linebreak-style': 0,
    'react/prop-types': 0,
    'require-jsdoc': 0,
    'no-invalid-this': 0,
    'quote-props': 0,
    'no-extend-native': 0,
    semi: 'off',
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-unused-vars': 'off',
    'dot-location': ['warn', 'property'],
    eqeqeq: ['warn', 'always', {null: 'ignore'}],
    'no-useless-concat': 'warn',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'warn',
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
    'valid-jsdoc': 'off',
    'brace-style': ['warn', 'stroustrup'],
    'max-len': ['warn', {
      code: 120,
      tabWidth: 2,
      ignoreUrls: true,
      ignorePattern: '^import [^,]+ from |^export | implements',
    }],
    'no-restricted-imports': ['error', {'patterns': ['@alkord/*/src/*']}],
  },
};
