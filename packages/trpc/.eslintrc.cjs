const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  extends: ['@antfu', '@studylog'],
  overrides: [
    {
      files: '**/*.cjs',
      rules: { '@typescript-eslint/no-var-requires': 'off' },
    },
  ],
});
