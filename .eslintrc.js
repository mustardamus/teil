module.exports = {
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },

  env: {
    es6: true,
    node: true,
    jest: true
  },

  plugins: [
    'prettier',
    'node',
    'promise',
    'jest',
    'filenames'
  ],

  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:node/recommended',
    'plugin:promise/recommended',
    'plugin:jest/recommended'
  ],

  rules: {
    'spaced-comment': ['error', 'always'],
    'no-else-return': ['error', { allowElseIf: false }],
    'no-multi-spaces': ['error', { ignoreEOLComments: false }],
    'no-multi-str': 'error',
    'no-undefined': 'error',
    'handle-callback-err': 'error',
    'no-path-concat': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'no-alert': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'curly': 'error',

    'prettier/prettier': ['error', { singleQuote: true, semi: false }],

    'filenames/match-regex': [2, '^_?[a-z-.0-9]+$', true]
  }
}
