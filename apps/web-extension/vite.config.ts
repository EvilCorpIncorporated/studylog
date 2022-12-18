import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import webExtension from '@samrum/vite-plugin-web-extension';
import autoImport from 'unplugin-auto-import/vite';
import components from 'unplugin-vue-components/vite';
import {
  VueUseComponentsResolver,
  VueUseDirectiveResolver,
} from 'unplugin-vue-components/resolvers';
import { getManifest } from './manifest';

interface NodeEnv extends Record<string, string> {
  MANIFEST_VERSION: '2' | '3';
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') as NodeEnv;

  return {
    plugins: [
      vue({ reactivityTransform: true }),
      autoImport({
        imports: [
          'vue',
          'vue/macros',
          '@vueuse/core',
          {
            'webextension-polyfill': [['*', 'browser']],
          },
        ],
      }),
      components({
        resolvers: [VueUseComponentsResolver(), VueUseDirectiveResolver()],
      }),
      webExtension({ manifest: getManifest(Number(env.MANIFEST_VERSION)) }),
    ],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  };
});
