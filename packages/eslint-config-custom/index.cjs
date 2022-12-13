const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  extends: ['turbo', '@nuxt', 'prettier'],
  rules: {
    // "@next/next/no-html-link-for-pages": "off",
    // "react/jsx-key": "off",
  },
});
