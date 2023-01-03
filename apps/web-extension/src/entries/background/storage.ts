import type { Tabs } from 'webextension-polyfill';
import browser from 'webextension-polyfill';
import { initializeUserIdSingleton } from './main';
import type { TabEvent } from './tabs';

export async function addIdleEventToLocalStore(idleEvent: IdleEvent): Promise<void> {
    const idleEvents = await getStorage('idleEvents');
    idleEvents.push(idleEvent);
    await setStorage({ idleEvents });
}

export async function getIdleEventsFromLocalStore(): Promise<IdleEvent[]> {
    const idleEvents = await getStorage('idleEvents');
    return idleEvents;
}

export async function addTabToLocalStore(tab: TabEvent): Promise<void> { // TODO: change name - input argument is not a tab
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

export async function getTabsFromLocalStore(): Promise<TabEvent[]> {
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
    tabs: TabEvent[];
    filteredTabs: Tabs.Tab[];
    idleEvents: IdleEvent[];
  }
  

  export async function clearTabsState() {
    const defaults: Partial<StorageData> = {
      tabs: [],
    };
    await setStorage(defaults);
  }


export async function getUserId() {
  initializeUserIdSingleton(); // TODO: this is a hack, fix it - this is a hack to ensure that the userId is initialized
  
  const user_id = await getStorage('userId');

  return user_id;

}

export async function clearFilteredTabsState() { // TODO: duplicate code
  const defaults: Partial<StorageData> = {
    filteredTabs: [],
  };

  await setStorage(defaults);
}

export async function clearIdleEventsState() { // TODO: duplicate code
  const defaults: Partial<StorageData> = {
    idleEvents: [],
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

