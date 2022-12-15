import { beforeAll, vi } from 'vitest';
import type { Browser } from 'webextension-polyfill';

// declare global {
//   const abrowser: typeof browser;
// }

// const addListenerMock = vi.fn().mockImplementation((_) => { });
// const storageGet = vi.fn().mockImplementation(() => { });
// const storageSet = vi.fn().mockImplementation(() => { });

// const mockBrowser = {
//   tabs: {
//     onUpdated: {
//       addListener: addListenerMock,
//     },
//     onActivated: {
//       addListener: addListenerMock,
//     },
//     onRemoved: {
//       addListener: addListenerMock,
//     },
//     onCreated: {
//       addListener: addListenerMock,
//     },
//   },
//   storage: {
//     get: storageGet,
//     set: storageSet
//   }
// }

beforeAll(() => {
  // (globalThis as any).chrome = { runtime: { id: 'TESTING' } };
  vi.stubGlobal('chrome', { runtime: { id: 'TESTING' } });
  vi.mock('webextension-polyfill', () => {
    const addListenerMock = vi
      .fn()
      .mockImplementation((..._args: unknown[]) => { });
    const tabs = new Proxy(
      {},
      {
        get(target, prop, receiver) {
          const matches = prop.toString().match(/^on([A-Z][A-Za-z]*)$/);
          if (matches == null) {
            return Reflect.get(target, prop, receiver);
          }
          return { addListener: addListenerMock };
        },
      },
    );
    return { tabs } as Browser;
  });
});
