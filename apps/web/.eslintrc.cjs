const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  extends: [
    '@studylog/eslint-config',
    '@nuxt/eslint-config',
  ],
});
