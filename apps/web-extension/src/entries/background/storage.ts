import type { Tabs } from 'webextension-polyfill';
import browser from 'webextension-polyfill';

export async function addTabToLocalStore(tab: Tabs.Tab): Promise<void> {
    let tabs = await getStorage('tabs');
    tabs.push(tab);
    await setStorage({ tabs });
}


export async function getStorage<K extends keyof StorageData>(key: K): Promise<StorageData[K]> {
    const result = await browser.storage.local.get(key);
    return result[key];
}

export async function getTabsFromLocalStore(): Promise<Tabs.Tab[]> {
    const tabs = await getStorage('tabs');
    return tabs;
}


interface StorageData {
    tabs: Tabs.Tab[];
    filteredTabs: Tabs.Tab[];
  }
  

  export async function clearTabsState() {
    const defaults: Partial<StorageData> = {
      tabs: [],
    };
    await setStorage(defaults);
  }

export async function clearFilteredTabsState() {
    const defaults: Partial<StorageData> = {
        filteredTabs: [],
    };

    await setStorage(defaults);
}


  export async function setStorage(data: Partial<StorageData>) {
    await browser.storage.local.set(data);
  }


  export async function setStorageDefaults() {
    const defaults: Partial<StorageData> = {
      tabs: [],
      filteredTabs: [],
    };
    await setStorage(defaults);
  }
