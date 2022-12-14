import * as browser from 'webextension-polyfill';
export async function setupEventHandlers() {
    await browser.tabs.onUpdated.addListener(onTabUpdatedHandler);
    await browser.tabs.onActivated.addListener(onTabActivatedHandler);
    await browser.tabs.onRemoved.addListener(onTabRemovedHandler);
    await browser.tabs.onCreated.addListener(onTabCreatedHandler);
}

// TODO: add types to these input arguments
async function onTabCreatedHandler() { }
async function onTabRemovedHandler() { }

async function onTabActivatedHandler() { }

async function onTabUpdatedHandler() { }
