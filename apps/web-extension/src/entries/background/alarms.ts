import browser from 'webextension-polyfill';
import { alarmNames } from './constants/alarmNames';


  // Create a new alarm for heartbeats.

const alarmHandlers = {
  [alarmNames.heartbeatAlarm]: () => {
    console.log('recording a heartbeat - alarm triggered');
    // send heartbeat to server
    sendEvents();
  }
}

export function setupAlarms() {
  // setup alarm event handlers
  browser.alarms.create(alarmNames.heartbeatAlarm, { periodInMinutes: 1});


  browser.alarms.onAlarm.addListener( (alarm) => {
    // TODO: remove this check - this is a violation of the single responsibility principle, and should be handled in a separate function
      alarmHandlers[alarm.name]();
  });

}

function sendEvents() {
throw new Error('Function not implemented.');
}
