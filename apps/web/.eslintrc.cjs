const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  extends: ['@nuxt/eslint-config', '@studylog/eslint-config'],
});
