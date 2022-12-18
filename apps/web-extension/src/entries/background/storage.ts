// import merge from 'lodash.merge';

// import type { FilteredTab, TabWithTimestamp } from '~/logic';

import browser from 'webextension-polyfill';
import type { Tabs } from 'webextension-polyfill';

type Events = any;
interface StorageData {
  tabs: Events[];
  filteredTabs: Events[];
}

// const KEY = 'globalStorage' as const;
const AREA = 'local' as const;

// HACK: the overloads must be declared in this order for key
// intellisense to work in the overload that takes an array of keys.
export async function getStorage(): Promise<StorageData>;
export async function getStorage<Keys extends (keyof StorageData)[]>(
  keys: Keys,
): Promise<{ [K in Keys[number]]: StorageData[K] }>;
export async function getStorage<K extends keyof StorageData>(
  key: K,
): Promise<StorageData[K]>;
export async function getStorage<K extends keyof StorageData>(
  keyOrKeys?: K | K[],
) {
  if (keyOrKeys != null) {
    const result = await browser.storage[AREA].get(keyOrKeys);
    return typeof keyOrKeys === 'string' ? result[keyOrKeys] : result;
  } else {
    const result = await browser.storage[AREA].get();
    return result;
  }
}

export function merge(
  existingData: StorageData,
  data: Partial<StorageData>,
): StorageData {
  const _: StorageData = {
    tabs: data.tabs ? [...existingData.tabs, ...data.tabs] : existingData.tabs,
    filteredTabs: data.filteredTabs
      ? [...existingData.filteredTabs, ...data.filteredTabs]
      : existingData.filteredTabs,
  };
  return _;
}

export async function appendStorage(data: Partial<StorageData>) {
  // add new data to existing data
  const existingData = await getStorage();
  const newData = merge(existingData, data);
  await setStorage(newData);
}

export async function setStorage(data: Partial<StorageData>) {
  await browser.storage[AREA].set(data);
}

export async function setStorageDefaults() {
  const defaults: StorageData = {
    tabs: [],
    filteredTabs: [],
  };
  await setStorage(defaults);
}
