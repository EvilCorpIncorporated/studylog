export function setupEventHandlers() {
  browser.tabs.onUpdated.addListener(onTabUpdatedHandler);
  browser.tabs.onActivated.addListener(onTabActivatedHandler);
  browser.tabs.onRemoved.addListener(onTabRemovedHandler);
  browser.tabs.onCreated.addListener(onTabCreatedHandler);
}

// TODO: add types to these input arguments
async function onTabCreatedHandler() {}
async function onTabRemovedHandler() {}

async function onTabActivatedHandler() {}

async function onTabUpdatedHandler() {}
