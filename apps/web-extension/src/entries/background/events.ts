// define events here

import { Tabs } from 'webextension-polyfill';

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
  // ignore this for now
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  browser.tabs.onActivated.addListener(onTabActivatedHandler);
  // browser.tabs.onUpdated.addListener(onUpdatedHandler);
}

export function onTabActivatedHandler(
  activeInfo: Tabs.OnActivatedActiveInfoType,
) {
  console.log('onActivatedHandler', activeInfo);
}

export function onTabUpdatedHandler(
  tabId: number,
  changeInfo: Tabs.OnUpdatedChangeInfoType,
  tab: Tabs.Tab,
) {
  console.log('onUpdatedHandler', tabId, changeInfo, tab);
}
