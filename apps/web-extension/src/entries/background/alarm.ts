// create an alarm that will fire every 1 minutes
import * as browser from 'webextension-polyfill';

const alarmName = 'sendTabEvents';
export function setupAlarm() {
  browser.alarms.create(alarmName, { periodInMinutes: 1 });
}
