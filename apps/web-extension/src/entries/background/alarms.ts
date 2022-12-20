import browser from 'webextension-polyfill';
import { alarmNames } from './constants/alarmNames';
import { sendEvents } from './api';

  // Create a new alarm for heartbeats.
const alarmHandlers = {
  [alarmNames.heartbeatAlarm]: async () => {
    console.log('recording a heartbeat - alarm triggered');
    // send heartbeat to server
    await sendEvents();
  }
}

export function setupAlarms() {
  // setup alarm event handlers
  browser.alarms.create(alarmNames.heartbeatAlarm, { periodInMinutes: 1 });

  browser.alarms.onAlarm.addListener(async (alarm) => {
    // TODO: remove this check - this is a violation of the single responsibility principle, and should be handled in a separate function
    alarmHandlers[alarm.name]();
  });
}
