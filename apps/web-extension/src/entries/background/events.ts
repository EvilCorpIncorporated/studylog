import browser from 'webextension-polyfill';
import {addTabToLocalStore} from './storage';

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
    let queryOptions = { active: true};
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await browser.tabs.query(queryOptions);

    if (tab.status == 'complete') {
      console.log('onActivatedHandler',tab);
      // add tab to localStorage
      addTabToLocalStore(tab);
    }
}

export function onTabUpdatedHandler(
  tabId: number,
  changeInfo: browser.Tabs.OnUpdatedChangeInfoType,
  tab: browser.Tabs.Tab,
) {
  if (changeInfo.status == 'complete' && tab.active) {
    console.log('onUpdatedHandler',tab);
    addTabToLocalStore(tab);
  }
}
