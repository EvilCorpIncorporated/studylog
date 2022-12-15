import { beforeAll, vi } from 'vitest';
import type { Browser, Storage } from 'webextension-polyfill';

beforeAll(() => {
  vi.stubGlobal('chrome', { runtime: { id: 'TESTING' } });
  vi.mock('webextension-polyfill', () => {
    const addListenerMock = vi
      .fn()
      .mockImplementation((..._args: unknown[]) => {});
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
    const storageLocal: Record<string, any> = {};
    const storage = {
      local: {
        get: vi
          .fn()
          .mockImplementation(
            async (keys?: null | string | string[] | Record<string, any>) => {
              if (keys == null) {
                return storageLocal;
              }
              if (typeof keys === 'string') {
                return storageLocal[keys];
              }
              if (Array.isArray(keys)) {
                return Object.entries(storageLocal)
                  .filter(([key]) => keys.includes(key))
                  .map(([, value]) => value);
              }
              return Object.fromEntries(
                Object.entries(keys).map(
                  ([key, value]) => storageLocal[key] ?? value,
                ),
              );
            },
          ),
        set: vi.fn().mockImplementation(async (items: Record<string, any>) => {
          for (const [key, value] of Object.entries(items)) {
            storageLocal[key] = value;
          }
        }),
      },
    } as unknown as Storage.Static;
    return { tabs, storage } as Browser;
  });
});
