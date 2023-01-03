// define events here

import browser from 'webextension-polyfill';
import type { TabEvent } from './tabs';
import { addTabToLocalStore } from './storage';

// onTabActivatedHandler, onTabUpdatedHandler, setupEventHandlers
export function setupEventHandlers() {
  // setup event handlers
  setupTabEventHandlers();
  // setupAlarmEventHandlers();
  // setupBrowserActionEventHandlers();
  // setupContextMenuEventHandlers();
}

export function setupTabEventHandlers() {
  // setup tab event handlers
  browser.tabs.onActivated.addListener(onTabActivatedHandler);
  browser.tabs.onUpdated.addListener(onTabUpdatedHandler);
}

/**
 * Whenever a active tab is changed it records a heartbeat with that tab url.
 */
export async function onTabActivatedHandler(_activeInfo: browser.Tabs.OnActivatedActiveInfoType) {
  // get the active tab
  const queryOptions = { active: true };
  const [tab] = await browser.tabs.query(queryOptions);

  if (tab.status === 'complete') {
    // add tab to localStorage
    const tabEvent: TabEvent = {
      tab,
      lastAccessed: new Date().getTime(),
    };
    console.debug('onTabActivated TabEvent', tabEvent);
    await addTabToLocalStore(tabEvent);
  }
}

export function onTabUpdatedHandler(
  tabId: number,
  changeInfo: browser.Tabs.OnUpdatedChangeInfoType,
  tab: browser.Tabs.Tab,
) {
  if (changeInfo.status === 'complete' && tab.active) {
    const tabEvent: TabEvent = {
      tab,
      lastAccessed: new Date().getTime(),
    };
    console.debug('onUpdatedHandler TabEvent', tabEvent);

    await addTabToLocalStore(tabEvent);
  }
}
