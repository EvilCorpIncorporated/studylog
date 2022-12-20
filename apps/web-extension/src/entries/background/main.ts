import browser from 'webextension-polyfill';
import { setupAlarms } from './alarms';
import { setupTabEventHandlers } from './events';
import { setStorageDefaults } from './storage';

browser.runtime.onInstalled.addListener(() => {
  // eslint-disable-next-line no-console
  console.log('Extension installed');
});

function setupEventHandlers() {
  // setup event handlers
  setupTabEventHandlers();
  setupAlarms();
}

function init() {
  console.log('init');
  setStorageDefaults();
  setupEventHandlers();
}

init();
