module.exports = {
    "env": {
      "browser": true,
      "es6": true,
      "node": true,
      "mocha": true
    },
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    rules: {
        '@typescript-eslint/camelcase': ['error', { properties: 'never' }],
        "@typescript-eslint/no-var-requires": 0,
    },
};
