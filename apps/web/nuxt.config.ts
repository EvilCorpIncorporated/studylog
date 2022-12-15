// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // extends: ['@sidebase/nuxt-prisma'],
  modules: ['@vueuse/nuxt'],
  typescript: {
    shim: false,
  },
  experimental: {
    reactivityTransform: true,
  },
});
