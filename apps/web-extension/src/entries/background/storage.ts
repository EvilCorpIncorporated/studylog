import type { Tabs } from 'webextension-polyfill';
import browser from 'webextension-polyfill';

export async function addIdleEventToLocalStore(idleEvent: IdleEvent): Promise<void> {
    let idleEvents = await getStorage('idleEvents');
    idleEvents.push(idleEvent);
    await setStorage({ idleEvents });
}

export async function getIdleEventsFromLocalStore(): Promise<IdleEvent[]> {
    const idleEvents = await getStorage('idleEvents');
    return idleEvents;
}

export async function addTabToLocalStore(tab: Tabs.Tab): Promise<void> {
  const tabs = await getStorage('tabs');
  tabs.push(tab);
  await setStorage({ tabs });
}

export async function getStorage<K extends keyof StorageData>(
  key: K,
): Promise<StorageData[K]> {
  const result = await browser.storage.local.get(key);
  return result[key];
}

export async function getTabsFromLocalStore(): Promise<Tabs.Tab[]> {
  const tabs = await getStorage('tabs');
  return tabs;
}

export interface IdleEvent {
    state: string;
    endTime: number;
    startTime: number;
  }


interface StorageData {
    userId: string;
    tabs: Tabs.Tab[];
    filteredTabs: Tabs.Tab[];
    idleEvents: IdleEvent[];
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

  export async function setStorageDefaults() {
    const defaults: Partial<StorageData> = {
      userId: '',
      tabs: [],
      filteredTabs: [],
      idleEvents: [],
    };
    await setStorage(defaults);
  }
export async function setStorage(data: Partial<StorageData>) {
  await browser.storage.local.set(data);
}

