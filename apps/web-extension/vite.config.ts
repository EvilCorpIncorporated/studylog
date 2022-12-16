/// <reference types="vitest" />

import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import webExtension from '@samrum/vite-plugin-web-extension';
import autoImport from 'unplugin-auto-import/vite';
import { getManifest } from './manifest';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      autoImport({
        imports: [
          'vue',
          'vue/macros',
          {
            'webextension-polyfill': [['*', 'browser']],
          },
        ],
      }),
      webExtension({ manifest: getManifest(Number(env.MANIFEST_VERSION)) }),
    ],
    test: {
      setupFiles: './vitest.setup.ts',
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  };
});
