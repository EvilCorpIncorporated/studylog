export function setupEventHandlers() {
  browser.tabs.onUpdated.addListener(onTabUpdatedHandler);
  browser.tabs.onActivated.addListener(onTabActivatedHandler);
  browser.tabs.onRemoved.addListener(onTabRemovedHandler);
  browser.tabs.onCreated.addListener(onTabCreatedHandler);
}

// TODO: add types to these input arguments
async function onTabCreatedHandler(tab: browser.Tabs.Tab) {

}
async function onTabRemovedHandler(removeInfo: browser.Tabs.OnRemovedRemoveInfoType) { }

async function onTabActivatedHandler({ tabId }: Tabs.OnActivatedActiveInfoType) {

}

async function onTabUpdatedHandler(
    _tabId: number,
    changeInfo: browser.Tabs.OnUpdatedChangeInfoType,
    _tab: browser.Tabs.Tab,
) { }
