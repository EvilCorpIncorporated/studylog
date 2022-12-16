import type { Tabs } from 'webextension-polyfill';

export function setupEventHandlers() {
  browser.tabs.onUpdated.addListener(onTabUpdatedHandler);
  browser.tabs.onActivated.addListener(onTabActivatedHandler);
  browser.tabs.onRemoved.addListener(onTabRemovedHandler);
  browser.tabs.onCreated.addListener(onTabCreatedHandler);
}

// TODO: add types to these input arguments
async function onTabCreatedHandler(_tab: Tabs.Tab) {}
async function onTabRemovedHandler(
  _tabId: number,
  _removeInfo: Tabs.OnRemovedRemoveInfoType,
) {}

async function onTabActivatedHandler({
  tabId: _tabId,
}: Tabs.OnActivatedActiveInfoType) {}

async function onTabUpdatedHandler(
  _tabId: number,
  _changeInfo: Tabs.OnUpdatedChangeInfoType,
  _tab: Tabs.Tab,
) {}
