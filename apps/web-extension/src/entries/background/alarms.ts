import browser from 'webextension-polyfill';
import { sendEvents } from './api';
import type { TabEvent } from './tabs';
import { processEvents } from './tabs';
import type { IdleEvent } from './storage';
import { addIdleEventToLocalStore, getIdleEventsFromLocalStore, getTabsFromLocalStore } from './storage';

// Create a new alarm for heartbeat
const idleThreshHoldSeconds = 60;
function convertSecondsToMilliseconds(seconds: number) {
  return seconds * 1000;
}

async function onAlarmIdle() {
  await recordIdleEvent();
}

const alarmNameConstants = {
  heartbeatAlarm: 'heartbeatAlarm',
  idleAlarm: 'idleAlarm',
};

const alarmHandlerFunctions = {
  [alarmNameConstants.idleAlarm]: onAlarmIdle,
  [alarmNameConstants.heartbeatAlarm]: onAlarmHeartbeat,
};

export function setupAlarms() {
  // setup alarm event handlers
  browser.alarms.create(alarmNameConstants.heartbeatAlarm, {
    periodInMinutes: 2,
  });
  browser.alarms.create(alarmNameConstants.idleAlarm, { periodInMinutes: 1 });

  browser.alarms.onAlarm.addListener(async alarm => {
    console.debug('alarm', alarm);
    await alarmHandlerFunctions[alarm.name]();
  });
}

async function recordIdleEvent() {
  // add an idle event
  const state = await browser.idle.queryState(idleThreshHoldSeconds);
  const endTime = new Date().getTime();
  const startTime = endTime - convertSecondsToMilliseconds(idleThreshHoldSeconds);

  const idleEvent: IdleEvent = {
    state,
    startTime,
    endTime,
  };
  console.debug('idleEvent', idleEvent);
  // add event to local storage
  await addIdleEventToLocalStore(idleEvent);
}

async function onAlarmHeartbeat() {
  console.debug('heartbeat alarm');

  const events = await getEvents();
  const processedEvents = processEvents(events.tabEvents, events.idleEvents);
  await sendEvents(processedEvents);
}

async function getEvents(): Promise<{
  // TODO: move - function doesn't belong here
  tabEvents: TabEvent[];
  idleEvents: IdleEvent[];
}> {
  // get events from local storage
  const tabEvents = await getTabsFromLocalStore();
  const idleEvents = await getIdleEventsFromLocalStore();
  return { tabEvents, idleEvents };
}
