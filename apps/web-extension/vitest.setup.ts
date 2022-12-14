import { beforeAll, vi } from 'vitest';
import type { Browser } from 'webextension-polyfill';

declare global {
  const abrowser: typeof browser;
}

const addListenerMock = vi.fn().mockImplementation((_) => { });

const mockBrowser = {
  tabs: {
    onUpdated: {
      addListener: addListenerMock,
    },
    onActivated: {
      addListener: addListenerMock,
    },
    onRemoved: {
      addListener: addListenerMock,
    },
    onCreated: {
      addListener: addListenerMock,
    },
  },
}

beforeAll(() => {
  // (globalThis as any).chrome = { runtime: { id: 'TESTING' } };
  vi.stubGlobal('chrome', { runtime: { id: 'TESTING' } });
  vi.mock('webextension-polyfill', () => mockBrowser);
});

