import browser from 'webextension-polyfill';
import { setupAlarms } from './alarms';
import { setupTabEventHandlers } from './events';
import { getStorage, setStorage, setStorageDefaults } from './storage';

function setupExtensionEvents() {
  // setup browser event handlers
  browser.runtime.onInstalled.addListener(onInstalled);
  browser.runtime.onStartup.addListener(onStartUp);
}

async function onInstalled() {
  await setStorageDefaults();
  await initializeUserIdSingleton();
}

export async function initializeUserIdSingleton() {
  // TODO: consider changing this functionality
  // check if a userId is set
  const userId = await getStorage('userId');
  if (!userId || userId === '') {
    // generate a userId
    const newUserId = generateUserId();
    await setStorage({ userId: newUserId });
  }
}

function generateUserId() {
  return Math.random().toString(36).substring(2, 15);
}

async function onStartUp() {
  // TODO: move this to a different file
  await initializeUserIdSingleton();
}

function setup() {
  // setup event handlers
  setupTabEventHandlers();
  setupAlarms();
  setupExtensionEvents();
}

setup();
