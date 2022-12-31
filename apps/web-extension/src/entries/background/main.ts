import browser from 'webextension-polyfill';
import { setupAlarms } from './alarms';
import { setupTabEventHandlers } from './events';
import { setStorageDefaults } from './storage';

function setupExtensionEvents() {
  // setup browser event handlers
  browser.runtime.onInstalled.addListener(onInstalled);
  browser.runtime.onStartup.addListener(onStartUp);
}

function onInstalled() {
  setStorageDefaults();
}

function initializeUserIdSingleton() {
   // check if a userId is set
   const userId = localStorage.getItem('userId');
   if (!userId) {
       // generate a userId
       const newUserId = generateUserId();
       localStorage.setItem('userId', newUserId);
   }
}



function generateUserId() {
    return Math.random().toString(36).substring(2, 15);
}

function onStartUp() { // TODO: move this to a different file
  initializeUserIdSingleton();
}

function setup() {
  // setup event handlers
  setupTabEventHandlers();
  setupAlarms();
  setupExtensionEvents();
}

setup()
