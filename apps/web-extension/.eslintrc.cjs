const path = require('path');
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  extends: ['@antfu', '@studylog'],
  parserOptions: {
    extraFileExtensions: ['.vue'],
    project: [
      path.join(__dirname, 'tsconfig.json'),
      path.join(__dirname, 'tsconfig.node.json'),
    ],
  },
  overrides: [
    {
      files: '**/*.cjs',
      rules: { '@typescript-eslint/no-var-requires': 'off' },
    },
  ],
});
