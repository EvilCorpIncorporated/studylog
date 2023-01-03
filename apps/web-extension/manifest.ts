import type { Manifest } from 'webextension-polyfill';
import pkg from './package.json';

const sharedManifest: Partial<Manifest.WebExtensionManifest> = {
  content_scripts: [
    {
      js: ['src/entries/contentScript/primary/main.ts'],
      matches: ['*://*/*'],
    },
  ],
  icons: {
    16: 'icons/16.png',
    19: 'icons/19.png',
    32: 'icons/32.png',
    38: 'icons/38.png',
    48: 'icons/48.png',
    64: 'icons/64.png',
    96: 'icons/96.png',
    128: 'icons/128.png',
    256: 'icons/256.png',
    512: 'icons/512.png',
  },
  options_ui: {
    page: 'src/entries/options/index.html',
    open_in_tab: true,
  },
  permissions: ['alarms', 'activeTab', 'storage', 'tabs', 'idle'],
};

const browserAction = {
  default_icon: {
    16: 'icons/16.png',
    19: 'icons/19.png',
    32: 'icons/32.png',
    38: 'icons/38.png',
  },
  default_popup: 'src/entries/popup/index.html',
};

const manifestV2: Partial<Manifest.WebExtensionManifest> = {
  ...sharedManifest,
  background: {
    scripts: ['src/entries/background/script.ts'],
    persistent: false,
  },
  browser_action: browserAction,
  options_ui: {
    ...sharedManifest.options_ui!,
    chrome_style: false,
  },
  permissions: [...sharedManifest.permissions!, '*://*/*'],
};

const manifestV3: Partial<Manifest.WebExtensionManifest> = {
  ...sharedManifest,
  action: browserAction,
  background: {
    service_worker: 'src/entries/background/serviceWorker.ts',
  },
  host_permissions: ['*://*/*'],
};

export function getManifest(manifestVersion: number): Manifest.WebExtensionManifest {
  const manifest: Partial<Manifest.WebExtensionManifest> = {
    author: pkg.author,
    description: pkg.description,
    name: pkg.displayName ?? pkg.name,
    version: pkg.version,
  };

  if (manifestVersion === 2) {
    return {
      ...(manifest as Manifest.WebExtensionManifest),
      ...manifestV2,
      manifest_version: manifestVersion,
    };
  }

  if (manifestVersion === 3) {
    return {
      ...(manifest as Manifest.WebExtensionManifest),
      ...manifestV3,
      manifest_version: manifestVersion,
    };
  }

  throw new Error(`Missing manifest definition for manifestVersion ${manifestVersion}`);
}
