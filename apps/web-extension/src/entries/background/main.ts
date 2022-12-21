import browser from 'webextension-polyfill';
import { setupAlarms } from './alarms';
import { setupTabEventHandlers } from './events';
import { setStorageDefaults } from './storage';

browser.runtime.onInstalled.addListener(() => {
  console.debug('Extension installed');
});

function setupEventHandlers() {
  // setup event handlers
  setupTabEventHandlers();
  setupAlarms();
}

function init() {
  console.debug('init');
  setStorageDefaults();
  setupEventHandlers();
}

init();
