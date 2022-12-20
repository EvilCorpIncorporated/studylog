// define events here

import browser from 'webextension-polyfill';
import type { Tabs } from 'webextension-polyfill'; // onTabActivatedHandler, onTabUpdatedHandler, setupEventHandlers
import { alarmNames } from './constants/alarmNames';

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

  browser.tabs.onActivated.addListener(onTabActivatedHandler);
  browser.tabs.onUpdated.addListener(onTabUpdatedHandler);
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

/**
 * Whenever a active tab is changed it records a heartbeat with that tab url.
 */
browser.tabs.onActivated.addListener(function (activeInfo) {
  browser.tabs.get(activeInfo.tabId).then(function (tab) {
    console.log('recording a heartbeat - active tab changed');

    // record heartbeat here
  });
});

/**
 * Whenever a active window is changed it records a heartbeat with the active tab url.
 */
