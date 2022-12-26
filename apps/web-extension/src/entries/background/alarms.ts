import browser from 'webextension-polyfill';
import { addIdleEventToLocalStore, getIdleEventsFromLocalStore, getTabsFromLocalStore, IdleEvent } from './storage';
import { isAllowedWebsite } from './tabs';

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
}

const alarmHandlerFunctions = {
  [alarmNameConstants.idleAlarm]: onAlarmIdle,
  [alarmNameConstants.heartbeatAlarm]: onAlarmHeartbeat,

}

export function setupAlarms() {
  // setup alarm event handlers
  browser.alarms.create(alarmNameConstants.heartbeatAlarm, { periodInMinutes: 2});
  browser.alarms.create(alarmNameConstants.idleAlarm, { periodInMinutes: 1});


  browser.alarms.onAlarm.addListener(async (alarm: any) => {
    console.log('alarm', alarm);
    alarmHandlerFunctions[alarm.name]();
  });

}


function recordIdleEvent() {
  // add an idle event
  browser.idle.queryState(idleThreshHoldSeconds).then((state: any) => {
    const endTime = new Date().getTime();
    const startTime = endTime - convertSecondsToMilliseconds(idleThreshHoldSeconds);

    const idleEvent:IdleEvent = {
      state: state,
      startTime: startTime,
      endTime: endTime,
    }
    console.log('idleEvent', idleEvent);
    // add event to local storage
    addIdleEventToLocalStore(idleEvent);
  });
}

async function onAlarmHeartbeat() {
  console.log('heartbeat alarm');

  let events = await getEvents()
  const processedEvents = processEvents(events.tabEvents, events.idleEvents)
  sendEvents(processedEvents)
}

async function getEvents(): Promise<{
  tabEvents: any[],
  idleEvents: any[],
}> { 
  // get events from local storage
  const tabEvents = await getTabsFromLocalStore();
  const idleEvents = await getIdleEventsFromLocalStore();
  return {tabEvents, idleEvents}
}

function getActiveIdleEvents(idleEvents: any[]) {
  return idleEvents.filter((idleEvent: any) => {
    return idleEvent.state === 'active';
  });
}

function getTabEventsInIdleEventTimeRange(tabEvents: any[], idleEvent: any) {
  return tabEvents.filter((tabEvent: any) => {
    return tabEvent.lastAccessed >= idleEvent.startTime && tabEvent.lastAccessed <= idleEvent.endTime;
  });
}

function getAllowedWebsitesTabEvents(tabEvents: any[]) {
  return tabEvents.filter((tabEvent: any) => {
    return isAllowedWebsite(tabEvent.url);
  })
};
function processEvents(tabEvents: any[], idleEvents: any[]) {
  // process events
  console.log('tabEvents', tabEvents);
  console.log('idleEvents', idleEvents);
  let validTabEvents = [];

  const activeIdleEvents = getActiveIdleEvents(idleEvents);

  activeIdleEvents.forEach((idleEvent: IdleEvent) => {
    // find tabEvents in the idleEvent time range
    const activeTabEvents = getTabEventsInIdleEventTimeRange(tabEvents, idleEvent);
    const allowedWebsitesTabEvents = getAllowedWebsitesTabEvents(activeTabEvents);
    validTabEvents.push(allowedWebsitesTabEvents);
  });

  return validTabEvents;
}

function sendEvents(events: any[]) { // move this to the api file
  console.log('should send events to the server')
}

