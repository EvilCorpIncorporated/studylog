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
    let queryOptions = { active: true};
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await browser.tabs.query(queryOptions);
    console.log('onActivatedHandler',tab);
  // add tab to localStorage
  addTabToLocalStore(tab);
}

export function onTabUpdatedHandler(
  tabId: number,
  changeInfo: Tabs.OnUpdatedChangeInfoType,
  tab: Tabs.Tab,
) {
  console.log('onUpdatedHandler',tab);
  addTabToLocalStore(tab);
}