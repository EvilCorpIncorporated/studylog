const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  extends: ['turbo', 'prettier'],
});