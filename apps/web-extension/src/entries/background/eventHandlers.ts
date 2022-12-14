import * as browser from 'webextension-polyfill';
export async function setupEventHandlers() {
    browser.tabs.onUpdated.addListener();
    browser.tabs.onActivated.addListener();
    browser.tabs.onRemoved.addListener();
    browser.tabs.onCreated.addListener();
}
