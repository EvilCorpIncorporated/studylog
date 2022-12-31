import browser from 'webextension-polyfill';
import { sendEvents } from './api';
import { isAllowedWebsite, processEvents, TabEvent } from './tabs';
import type { IdleEvent } from './storage';
import {
  addIdleEventToLocalStore,
  getIdleEventsFromLocalStore,
  getTabsFromLocalStore,
} from './storage';

// Create a new alarm for heartbeat
const idleThreshHoldSeconds = 60;
function convertSecondsToMilliseconds(seconds: number) {
  return seconds * 1000;
}

async function onAlarmIdle() {
  recordIdleEvent();
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

  browser.alarms.onAlarm.addListener(async (alarm: any) => {
    console.log('alarm', alarm);
    alarmHandlerFunctions[alarm.name]();
  });
}

function recordIdleEvent() {
  // add an idle event
  browser.idle
    .queryState(idleThreshHoldSeconds)
    .then((state: 'idle' | 'active' | 'locked') => {
      const endTime = new Date().getTime();
      const startTime =
        endTime - convertSecondsToMilliseconds(idleThreshHoldSeconds);

      const idleEvent: IdleEvent = {
        state,
        startTime,
        endTime,
      };
      console.log('idleEvent', idleEvent);
      // add event to local storage
      addIdleEventToLocalStore(idleEvent);
    });
}

async function onAlarmHeartbeat() {
  console.log('heartbeat alarm');

  const events = await getEvents();
  const processedEvents = processEvents(events.tabEvents, events.idleEvents);
  sendEvents(processedEvents);
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
