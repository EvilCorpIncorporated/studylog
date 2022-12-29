import { TabEvent } from './tabs';
// define events here

import browser from 'webextension-polyfill';
import type { Tabs } from 'webextension-polyfill';
import {addTabToLocalStore} from './storage';


export function setupTabEventHandlers() {
  // setup tab event handlers
  browser.tabs.onActivated.addListener(onTabActivatedHandler);
  browser.tabs.onUpdated.addListener(onTabUpdatedHandler);
}

/**
 * Whenever a active tab is changed it records a heartbeat with that tab url.
 */
export async function onTabActivatedHandler(
  activeInfo: Tabs.OnActivatedActiveInfoType,
) {
  // get the active tab
    const queryOptions = { active: true};
    let [tab] = await browser.tabs.query(queryOptions);

    if (tab.status == 'complete') {
      // add tab to localStorage
      const tabEvent:TabEvent = {
        tab: tab,
        lastAccessed: new Date().getTime(),
      }
      console.log('onTabActivated TabEvent',tabEvent);
      addTabToLocalStore(tabEvent);
    }
}

export function onTabUpdatedHandler(
  tabId: number,
  changeInfo: Tabs.OnUpdatedChangeInfoType,
  tab: Tabs.Tab,
) {
  if (changeInfo.status == 'complete' && tab.active) {
    const tabEvent:TabEvent = {
      tab: tab,
      lastAccessed: new Date().getTime(),
    }
    console.log('onUpdatedHandler TabEvent',tabEvent);

    addTabToLocalStore(tabEvent);
  }
}

