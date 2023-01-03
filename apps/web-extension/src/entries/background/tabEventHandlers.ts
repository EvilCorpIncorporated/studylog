import browser from 'webextension-polyfill';

export function setupEventHandlers() {
  browser.tabs.onUpdated.addListener(onTabUpdatedHandler);
  browser.tabs.onActivated.addListener(onTabActivatedHandler);
  browser.tabs.onRemoved.addListener(onTabRemovedHandler);
  browser.tabs.onCreated.addListener(onTabCreatedHandler);
}

// TODO: add types to these input arguments
function onTabCreatedHandler(_tab: browser.Tabs.Tab) {}
function onTabRemovedHandler(_tabId: number, _removeInfo: browser.Tabs.OnRemovedRemoveInfoType) {}

function onTabActivatedHandler({ tabId: _tabId }: browser.Tabs.OnActivatedActiveInfoType) {}

function onTabUpdatedHandler(
  _tabId: number,
  _changeInfo: browser.Tabs.OnUpdatedChangeInfoType,
  _tab: browser.Tabs.Tab,
) {}
