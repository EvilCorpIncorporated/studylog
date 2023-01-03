// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', 'nuxt-edgedb'],
  typescript: {
    shim: false,
  },
  experimental: {
    reactivityTransform: true,
  },
  telemetry: false,
});

