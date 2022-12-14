/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import webExtension from '@samrum/vite-plugin-web-extension';
import path from 'path';
import { getManifest } from './manifest';
import { GithubActionsReporter as GithubActionsSummaryReporter } from 'vitest-github-actions-summary-reporter';
import GithubActionsReporter from 'vitest-github-actions-reporter';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      vue(),
      webExtension({
        manifest: getManifest(Number(env['MANIFEST_VERSION'])),
      }),
    ],
    test: {
      reporters: process.env['GITHUB_ACTIONS']
        ? [
            'default',
            new GithubActionsReporter(),
            new GithubActionsSummaryReporter(),
          ]
        : 'default',
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  };
});
