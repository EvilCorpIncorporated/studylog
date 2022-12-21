// define events here

import browser from 'webextension-polyfill';
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
export async function onTabActivatedHandler(
  _activeInfo: browser.Tabs.OnActivatedActiveInfoType,
) {
  // get the active tab
  const queryOptions = { active: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  const [tab] = await browser.tabs.query(queryOptions);
  console.debug('onActivatedHandler', tab);
  // add tab to localStorage
  addTabToLocalStore(tab);
}

export function onTabUpdatedHandler(
  tabId: number,
  changeInfo: browser.Tabs.OnUpdatedChangeInfoType,
  tab: browser.Tabs.Tab,
) {
  console.debug('onUpdatedHandler', tab);
  addTabToLocalStore(tab);
}
