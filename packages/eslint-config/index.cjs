const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  extends: ['turbo', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'warn',
  },
});
